package org.exist.antlr;

import org.exist.xquery.BasicFunction;
import org.exist.xquery.Cardinality;
import org.exist.xquery.FunctionSignature;
import org.exist.xquery.XPathException;
import org.exist.xquery.XQueryContext;
import org.exist.xquery.value.FunctionParameterSequenceType;
import org.exist.xquery.value.FunctionReturnSequenceType;
import org.exist.xquery.value.Sequence;
import org.exist.xquery.value.SequenceType;
import org.exist.xquery.value.StringValue;
import org.exist.dom.QName;

import org.antlr.v4.*;

import org.exist.storage.BrokerPool;
import org.exist.storage.DBBroker;
import org.exist.storage.txn.Txn;
import org.exist.xmldb.XmldbURI;
import org.exist.collections.Collection;

import java.io.File;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;
import java.nio.file.Path;

public class GenerateFunction extends BasicFunction {

    public static final FunctionSignature signature =
        new FunctionSignature(
            new QName("generate", AntlrModule.NAMESPACE_URI, AntlrModule.PREFIX),
            "Generate JS parser and store in eXist collection",
            new SequenceType[] {
                new FunctionParameterSequenceType("grammar",
                    org.exist.xquery.value.Type.STRING,
                    Cardinality.EXACTLY_ONE,
                    "Grammar content"),
                new FunctionParameterSequenceType("dslId",
                    org.exist.xquery.value.Type.STRING,
                    Cardinality.EXACTLY_ONE,
                    "DSL ID")
            },
            new FunctionReturnSequenceType(
                org.exist.xquery.value.Type.STRING,
                Cardinality.EXACTLY_ONE,
                "Result")
        );

    public GenerateFunction(XQueryContext context) {
        super(context, signature);
    }

    @Override
    public Sequence eval(Sequence[] args, Sequence contextSequence)
            throws XPathException {

        String grammarContent = args[0].getStringValue();
        String dslId = args[1].getStringValue();

        try {

            // Create temp directory
            File tempDir = Files.createTempDirectory("antlr_gen").toFile();

            // Extract grammar name dynamically
            String grammarName = extractGrammarName(grammarContent);

            File grammarFile = new File(tempDir, grammarName + ".g4");

            Files.write(grammarFile.toPath(),
                    grammarContent.getBytes(StandardCharsets.UTF_8));

            // Run ANTLR via external process
            String antlrJarPath = "/usr/lib/locale/antlr-4.9.3-complete.jar";

            ProcessBuilder pb = new ProcessBuilder(
                    "java",
                    "-jar",
                    antlrJarPath,
                    grammarFile.getAbsolutePath(),
                    "-Dlanguage=JavaScript",
                    "-listener",
                    "-visitor",
                    "-o",
                    tempDir.getAbsolutePath()
            );

            pb.redirectErrorStream(true);
            Process process = pb.start();

            String output;
            try (BufferedReader reader =
                     new BufferedReader(
                         new InputStreamReader(process.getInputStream()))) {

                output = reader.lines()
                        .collect(Collectors.joining("\n"));
            }

            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new XPathException(this,
                        "ANTLR failed:\n" + output);
            }

            // Store ALL generated JS files recursively
            BrokerPool pool = BrokerPool.getInstance();

            try (DBBroker broker = pool.getBroker();
                 Txn txn = pool.getTransactionManager().beginTransaction()) {

                XmldbURI collectionUri =
                        XmldbURI.create(
                            "/db/apps/tei-publisher/generated/" + dslId);

                Collection collection =
                        broker.getOrCreateCollection(txn, collectionUri);

                broker.saveCollection(txn, collection);

                Files.walk(tempDir.toPath())
                    .filter(path -> path.toString().endsWith(".js"))
                    .forEach(path -> {
                        try {
                            byte[] data = Files.readAllBytes(path);

                            XmldbURI fileUri =
                                XmldbURI.create(path.getFileName().toString());

                            collection.addBinaryResource(
                                    txn,
                                    broker,
                                    fileUri,
                                    data,
                                    "application/javascript"
                            );
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    });

                txn.commit();
            }

            return new StringValue("Generation successful");

        } catch (Exception e) {
            throw new XPathException(this, e);
        }
    }

    // Extract grammar name from grammar declaration
    private String extractGrammarName(String grammarContent) throws Exception {
        String[] lines = grammarContent.split("\\R");
        for (String line : lines) {
            line = line.trim();
            if (line.startsWith("grammar ")) {
                String name = line.substring(8).replace(";", "").trim();
                if (!name.isEmpty()) {
                    return name;
                }
            }
        }
        throw new Exception("No valid grammar declaration found.");
    }
}