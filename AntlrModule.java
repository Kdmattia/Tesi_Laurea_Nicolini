package org.exist.antlr;

import java.util.List;
import java.util.Map;
import org.exist.xquery.AbstractInternalModule;
import org.exist.xquery.FunctionDef;

public class AntlrModule extends AbstractInternalModule {

    public static final String NAMESPACE_URI =
        "http://exist-db.org/xquery/ex-antlr4";

    public static final String PREFIX = "antlr4";

    private static final FunctionDef[] functions = {
        new FunctionDef(
            GenerateFunction.signature,
            GenerateFunction.class
        )
    };

    public AntlrModule(Map<String, List<?>> parameters) {
        super(functions, parameters);
    }

    @Override
    public String getNamespaceURI() {
        return NAMESPACE_URI;
    }

    @Override
    public String getDefaultPrefix() {
        return PREFIX;
    }

    @Override
    public String getDescription() {
        return "ANTLR integration module";
    }

    @Override
    public String getReleaseVersion() {
        return "1.0";
    }
}