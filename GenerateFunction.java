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

// Shaded ANTLR import — matches the relocation in pom.xml
import org.antlr.v4.Tool;

import org.exist.storage.BrokerPool;
import org.exist.storage.DBBroker;
import org.exist.storage.txn.Txn;
import org.exist.xmldb.XmldbURI;
import org.exist.collections.Collection;

import java.io.File;
import java.nio.file.Files;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;

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
        String dslId          = args[1].getStringValue();

        try {

            // Step 1: Write grammar to a temp directory
            File tempDir     = Files.createTempDirectory("antlr_gen").toFile();
            String grammarName = extractGrammarName(grammarContent);
            File grammarFile   = new File(tempDir, grammarName + ".g4");

            Files.write(
                grammarFile.toPath(),
                grammarContent.getBytes(StandardCharsets.UTF_8)
            );

            // Step 2: Invoke ANTLR via the Java API — no subprocess, no hardcoded paths
            String[] antlrArgs = {
                "-Dlanguage=JavaScript",
                "-listener",
                "-visitor",
                "-o", tempDir.getAbsolutePath(),
                grammarFile.getAbsolutePath()
            };

            Tool antlrTool = new Tool(antlrArgs);
            antlrTool.processGrammarsOnCommandLine();

            if (antlrTool.getNumErrors() > 0) {
                throw new XPathException(this,
                    "ANTLR generation failed with "
                    + antlrTool.getNumErrors() + " error(s)");
            }

            // Step 3: Store all generated .js files in eXist-db
            BrokerPool pool = BrokerPool.getInstance();

            try (DBBroker broker = pool.getBroker();
                 Txn txn = pool.getTransactionManager().beginTransaction()) {

                XmldbURI collectionUri = XmldbURI.create(
                    "/db/apps/tei-publisher/generated/" + dslId
                );

                Collection collection =
                    broker.getOrCreateCollection(txn, collectionUri);

                broker.saveCollection(txn, collection);

                Files.walk(tempDir.toPath())
                    .filter(path -> path.toString().endsWith(".js"))
                    .forEach(path -> {
                        try {
                            byte[] data = Files.readAllBytes(path);

                            collection.addBinaryResource(
                                txn,
                                broker,
                                XmldbURI.create(path.getFileName().toString()),
                                data,
                                "application/javascript"
                            );
                        } catch (Exception e) {
                            throw new RuntimeException(
                                "Failed to store file: "
                                + path.getFileName(), e
                            );
                        }
                    });

                txn.commit();
            }

            // Step 4: Clean up temp directory
            Files.walk(tempDir.toPath())
                .sorted(Comparator.reverseOrder())
                .map(java.nio.file.Path::toFile)
                .forEach(File::delete);

            return new StringValue("Generation successful for DSL: " + dslId);

        } catch (XPathException e) {
            throw e;
        } catch (Exception e) {
            throw new XPathException(this,
                "Generation failed: " + e.getMessage(), e);
        }
    }

    private String extractGrammarName(String grammarContent) throws Exception {
        for (String line : grammarContent.split("\\R")) {
            line = line.trim();
            if (line.startsWith("grammar ")) {
                String name = line.substring(8).replace(";", "").trim();
                if (!name.isEmpty()) return name;
            }
        }
        throw new Exception("No valid grammar declaration found.");
    }
}