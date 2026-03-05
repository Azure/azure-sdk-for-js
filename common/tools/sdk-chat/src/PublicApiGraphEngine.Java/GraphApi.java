///usr/bin/env jbang "$0" "$@" ; exit $?
//DEPS com.github.javaparser:javaparser-core:3.26.3
//DEPS com.google.code.gson:gson:2.10.1
//DEPS org.ow2.asm:asm:9.7
//DEPS org.ow2.asm:asm-util:9.7
//NATIVE_OPTIONS -O3 --no-fallback --initialize-at-build-time=com.github.javaparser,GraphApi --initialize-at-run-time=

import com.github.javaparser.*;
import com.github.javaparser.ast.*;
import com.github.javaparser.ast.body.*;
import com.github.javaparser.ast.expr.*;
import com.github.javaparser.ast.stmt.*;
import com.github.javaparser.ast.type.*;
import com.github.javaparser.ast.comments.*;
import com.github.javaparser.ast.visitor.*;
import com.github.javaparser.ast.nodeTypes.*;
import com.google.gson.*;
import org.objectweb.asm.AnnotationVisitor;
import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassVisitor;
import org.objectweb.asm.FieldVisitor;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.signature.SignatureReader;
import org.objectweb.asm.signature.SignatureVisitor;
import org.objectweb.asm.util.TraceSignatureVisitor;
import java.io.*;
import java.lang.reflect.Modifier;
import java.net.URI;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class GraphApi {
    private static final Gson gson = new GsonBuilder().disableHtmlEscaping().create();
    private static final Gson prettyGson = new GsonBuilder().disableHtmlEscaping().setPrettyPrinting().create();

    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            System.err.println("Usage: jbang GraphApi.java <path> [--json] [--stub] [--pretty] [--mode <source|compiled>] [--classes-dir <path>]");
            System.err.println("       jbang GraphApi.java --usage <api_json_file> <samples_path>");
            System.exit(1);
        }

        // Handle --usage mode
        if (args[0].equals("--usage")) {
            if (args.length < 3) {
                System.err.println("Usage: jbang GraphApi.java --usage <api_json_file> <samples_path>");
                System.exit(1);
            }
            analyzeUsage(Paths.get(args[1]), Paths.get(args[2]));
            return;
        }

        Path root = Paths.get(args[0]).toAbsolutePath();
        boolean outputJson = Arrays.asList(args).contains("--json");
        boolean outputStub = Arrays.asList(args).contains("--stub") || !outputJson;
        boolean pretty = Arrays.asList(args).contains("--pretty");
        String mode = getArgValue(args, "--mode", "source");
        String classesDirValue = getArgValue(args, "--classes-dir", null);

        Map<String, Object> api;
        if ("compiled".equalsIgnoreCase(mode)) {
            if (classesDirValue == null || classesDirValue.isBlank()) {
                throw new IllegalArgumentException("--mode compiled requires --classes-dir <path>");
            }
            Path classesDir = Paths.get(classesDirValue).toAbsolutePath();
            api = extractPackageFromClasses(root, classesDir);
        } else {
            api = extractPackage(root);
        }

        if (outputJson) {
            System.out.println(pretty ? prettyGson.toJson(api) : gson.toJson(api));
        } else {
            System.out.println(formatStubs(api));
        }
    }

    private static String getArgValue(String[] args, String key, String defaultValue) {
        for (int i = 0; i < args.length - 1; i++) {
            if (args[i].equals(key)) {
                return args[i + 1];
            }
        }
        return defaultValue;
    }

    static Map<String, Object> extractPackageFromClasses(Path root, Path classesDir) throws Exception {
        if (!Files.isDirectory(classesDir)) {
            throw new IllegalArgumentException("Classes directory not found: " + classesDir);
        }

        String packageName = detectPackageName(root);

        Map<String, Map<String, Object>> packageMap = new TreeMap<>();

        List<Path> classFiles;
        try (var stream = Files.walk(classesDir)) {
            classFiles = stream
                .filter(p -> p.toString().endsWith(".class"))
                .filter(p -> !p.getFileName().toString().equals("module-info.class"))
                .collect(Collectors.toList());
        }

        for (Path classFile : classFiles) {
            byte[] bytes;
            try {
                bytes = Files.readAllBytes(classFile);
            } catch (IOException ex) {
                continue;
            }

            CompiledClassInfo clazz = readCompiledClass(bytes);
            if (clazz == null || !clazz.isPublic) {
                continue;
            }

            // Skip anonymous and synthetic inner classes (e.g. Foo$1, Foo$2)
            // whose simple name is purely numeric after stripping outer class prefix.
            if (clazz.simpleName.isEmpty() || Character.isDigit(clazz.simpleName.charAt(0))) {
                continue;
            }

            String pkg = clazz.packageName;
            packageMap.computeIfAbsent(pkg, k -> {
                Map<String, Object> pkgInfo = new LinkedHashMap<>();
                pkgInfo.put("name", k);
                pkgInfo.put("classes", new ArrayList<Map<String, Object>>());
                pkgInfo.put("interfaces", new ArrayList<Map<String, Object>>());
                pkgInfo.put("enums", new ArrayList<Map<String, Object>>());
                pkgInfo.put("annotations", new ArrayList<Map<String, Object>>());
                return pkgInfo;
            });

            Map<String, Object> typeInfo = new LinkedHashMap<>();
            typeInfo.put("name", clazz.simpleName);

            if (clazz.superName != null && !clazz.superName.equals("Object") && clazz.kind == CompiledClassKind.CLASS) {
                typeInfo.put("extends", clazz.superName);
            }

            if (!clazz.interfaces.isEmpty()) {
                typeInfo.put("implements", clazz.interfaces);
            }

            if (!clazz.constructors.isEmpty()) typeInfo.put("constructors", clazz.constructors);
            if (!clazz.methods.isEmpty()) typeInfo.put("methods", clazz.methods);
            if (!clazz.fields.isEmpty()) typeInfo.put("fields", clazz.fields);
            if (clazz.deprecated) typeInfo.put("deprecated", true);

            @SuppressWarnings("unchecked")
            Map<String, Object> pkgInfo = packageMap.get(pkg);

            if (clazz.kind == CompiledClassKind.ANNOTATION) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> list = (List<Map<String, Object>>) pkgInfo.get("annotations");
                list.add(typeInfo);
            } else if (clazz.kind == CompiledClassKind.ENUM) {
                if (!clazz.enumValues.isEmpty()) {
                    typeInfo.put("values", clazz.enumValues);
                }
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> list = (List<Map<String, Object>>) pkgInfo.get("enums");
                list.add(typeInfo);
            } else if (clazz.kind == CompiledClassKind.INTERFACE) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> list = (List<Map<String, Object>>) pkgInfo.get("interfaces");
                list.add(typeInfo);
            } else {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> list = (List<Map<String, Object>>) pkgInfo.get("classes");
                list.add(typeInfo);
            }
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("package", packageName);
        result.put("packages", new ArrayList<>(packageMap.values()));
        return result;
    }

    private enum CompiledClassKind {
        CLASS,
        INTERFACE,
        ENUM,
        ANNOTATION
    }

    private static final class CompiledClassInfo {
        String packageName = "";
        String simpleName = "";
        String superName;
        boolean isPublic;
        boolean deprecated;
        CompiledClassKind kind = CompiledClassKind.CLASS;
        List<String> interfaces = new ArrayList<>();
        List<String> enumValues = new ArrayList<>();
        List<Map<String, Object>> constructors = new ArrayList<>();
        List<Map<String, Object>> methods = new ArrayList<>();
        List<Map<String, Object>> fields = new ArrayList<>();
    }

    private static final class MethodSignatureData {
        List<String> parameterTypes = new ArrayList<>();
        String returnType;
    }

    private static final class ClassSignatureData {
        String superType;
        List<String> interfaces = new ArrayList<>();
    }

    private static CompiledClassInfo readCompiledClass(byte[] bytes) {
        CompiledClassInfo info = new CompiledClassInfo();

        ClassReader reader;
        try {
            reader = new ClassReader(bytes);
        } catch (Exception ex) {
            return null;
        }

        reader.accept(new ClassVisitor(Opcodes.ASM9) {
            @Override
            public void visit(int version, int access, String name, String signature, String superName, String[] interfaces) {
                info.isPublic = (access & Opcodes.ACC_PUBLIC) != 0;
                info.deprecated = (access & Opcodes.ACC_DEPRECATED) != 0;

                String className = internalNameToTypeName(name);
                info.packageName = packageOf(className);
                info.simpleName = simpleNameOf(className);

                if ((access & Opcodes.ACC_ANNOTATION) != 0) {
                    info.kind = CompiledClassKind.ANNOTATION;
                } else if ((access & Opcodes.ACC_ENUM) != 0) {
                    info.kind = CompiledClassKind.ENUM;
                } else if ((access & Opcodes.ACC_INTERFACE) != 0) {
                    info.kind = CompiledClassKind.INTERFACE;
                } else {
                    info.kind = CompiledClassKind.CLASS;
                }

                if (superName != null) {
                    info.superName = internalNameToTypeName(superName);
                }

                if (interfaces != null) {
                    for (String iface : interfaces) {
                        info.interfaces.add(internalNameToTypeName(iface));
                    }
                }

                if (signature != null && !signature.isBlank()) {
                    ClassSignatureData classSig = parseClassSignature(signature);
                    if (classSig != null) {
                        if (classSig.superType != null && !classSig.superType.isBlank()) {
                            info.superName = classSig.superType;
                        }
                        if (!classSig.interfaces.isEmpty()) {
                            info.interfaces = classSig.interfaces;
                        }
                    }
                }
            }

            @Override
            public AnnotationVisitor visitAnnotation(String descriptor, boolean visible) {
                if ("Ljava/lang/Deprecated;".equals(descriptor)) {
                    info.deprecated = true;
                }
                return null;
            }

            @Override
            public FieldVisitor visitField(int access, String name, String descriptor, String signature, Object value) {
                if ((access & Opcodes.ACC_PUBLIC) == 0 || (access & Opcodes.ACC_SYNTHETIC) != 0) {
                    return null;
                }

                if ((access & Opcodes.ACC_ENUM) != 0 && info.kind == CompiledClassKind.ENUM) {
                    info.enumValues.add(name);
                    return null;
                }

                Map<String, Object> fieldInfo = new LinkedHashMap<>();
                fieldInfo.put("name", name);
                String fieldType = signatureToReadableType(signature);
                if (fieldType == null || fieldType.isBlank()) {
                    fieldType = descriptorToTypeName(descriptor);
                }
                fieldInfo.put("type", fieldType);
                if ((access & Opcodes.ACC_STATIC) != 0) {
                    fieldInfo.put("static", true);
                }

                final boolean[] deprecated = new boolean[] { (access & Opcodes.ACC_DEPRECATED) != 0 };
                info.fields.add(fieldInfo);

                return new FieldVisitor(Opcodes.ASM9) {
                    @Override
                    public AnnotationVisitor visitAnnotation(String annotationDescriptor, boolean visible) {
                        if ("Ljava/lang/Deprecated;".equals(annotationDescriptor)) {
                            deprecated[0] = true;
                        }
                        return null;
                    }

                    @Override
                    public void visitEnd() {
                        if (deprecated[0]) {
                            fieldInfo.put("deprecated", true);
                        }
                    }
                };
            }

            @Override
            public MethodVisitor visitMethod(int access, String name, String descriptor, String signature, String[] exceptions) {
                if ((access & Opcodes.ACC_PUBLIC) == 0 || (access & Opcodes.ACC_SYNTHETIC) != 0 || (access & Opcodes.ACC_BRIDGE) != 0) {
                    return null;
                }

                if ("<clinit>".equals(name)) {
                    return null;
                }

                org.objectweb.asm.Type[] descriptorParamTypes = org.objectweb.asm.Type.getArgumentTypes(descriptor);
                List<String> parameterTypeNames = Arrays.stream(descriptorParamTypes)
                    .map(GraphApi::asmTypeToReadable)
                    .collect(Collectors.toList());

                String returnTypeName = asmTypeToReadable(org.objectweb.asm.Type.getReturnType(descriptor));

                if (signature != null && !signature.isBlank()) {
                    MethodSignatureData methodSig = parseMethodSignature(signature);
                    if (methodSig != null) {
                        if (!methodSig.parameterTypes.isEmpty()) {
                            parameterTypeNames = methodSig.parameterTypes;
                        }
                        if (methodSig.returnType != null && !methodSig.returnType.isBlank()) {
                            returnTypeName = methodSig.returnType;
                        }
                    }
                }

                List<Map<String, Object>> parameters = new ArrayList<>();
                for (int i = 0; i < parameterTypeNames.size(); i++) {
                    Map<String, Object> p = new LinkedHashMap<>();
                    p.put("name", "arg" + i);
                    p.put("type", parameterTypeNames.get(i));
                    parameters.add(p);
                }

                String sig = String.join(", ", parameterTypeNames);

                if ("<init>".equals(name)) {
                    Map<String, Object> ctorInfo = new LinkedHashMap<>();
                    ctorInfo.put("name", info.simpleName);
                    ctorInfo.put("sig", sig);
                    if (!parameters.isEmpty()) {
                        ctorInfo.put("params", parameters);
                    }

                    final boolean[] deprecated = new boolean[] { (access & Opcodes.ACC_DEPRECATED) != 0 };
                    info.constructors.add(ctorInfo);

                    return new MethodVisitor(Opcodes.ASM9) {
                        @Override
                        public AnnotationVisitor visitAnnotation(String annotationDescriptor, boolean visible) {
                            if ("Ljava/lang/Deprecated;".equals(annotationDescriptor)) {
                                deprecated[0] = true;
                            }
                            return null;
                        }

                        @Override
                        public void visitEnd() {
                            if (deprecated[0]) {
                                ctorInfo.put("deprecated", true);
                            }
                        }
                    };
                }

                Map<String, Object> methodInfo = new LinkedHashMap<>();
                methodInfo.put("name", name);
                methodInfo.put("sig", sig);
                methodInfo.put("ret", returnTypeName);
                if (!parameters.isEmpty()) {
                    methodInfo.put("params", parameters);
                }
                if ((access & Opcodes.ACC_STATIC) != 0) {
                    methodInfo.put("static", true);
                }

                final boolean[] deprecated = new boolean[] { (access & Opcodes.ACC_DEPRECATED) != 0 };
                info.methods.add(methodInfo);

                return new MethodVisitor(Opcodes.ASM9) {
                    private int parameterIndex = 0;

                    @Override
                    public void visitParameter(String parameterName, int parameterAccess) {
                        if (parameterName != null && parameterIndex < parameters.size()) {
                            parameters.get(parameterIndex).put("name", parameterName);
                        }
                        parameterIndex++;
                    }

                    @Override
                    public AnnotationVisitor visitAnnotation(String annotationDescriptor, boolean visible) {
                        if ("Ljava/lang/Deprecated;".equals(annotationDescriptor)) {
                            deprecated[0] = true;
                        }
                        return null;
                    }

                    @Override
                    public void visitEnd() {
                        if (deprecated[0]) {
                            methodInfo.put("deprecated", true);
                        }
                    }
                };
            }
        }, 0);

        return info;
    }

    private static String descriptorToTypeName(String descriptor) {
        return asmTypeToReadable(org.objectweb.asm.Type.getType(descriptor));
    }

    private static String signatureToReadableType(String signature) {
        if (signature == null || signature.isBlank()) {
            return null;
        }

        try {
            TraceSignatureVisitor visitor = new TraceSignatureVisitor(0);
            new SignatureReader(signature).acceptType(visitor);
            return normalizeSignatureText(visitor.getDeclaration());
        } catch (Exception ex) {
            return null;
        }
    }

    private static MethodSignatureData parseMethodSignature(String signature) {
        if (signature == null || signature.isBlank()) {
            return null;
        }

        try {
            final List<TraceSignatureVisitor> parameterVisitors = new ArrayList<>();
            final TraceSignatureVisitor[] returnVisitor = new TraceSignatureVisitor[1];

            SignatureVisitor collector = new SignatureVisitor(Opcodes.ASM9) {
                @Override
                public SignatureVisitor visitParameterType() {
                    TraceSignatureVisitor visitor = new TraceSignatureVisitor(0);
                    parameterVisitors.add(visitor);
                    return visitor;
                }

                @Override
                public SignatureVisitor visitReturnType() {
                    TraceSignatureVisitor visitor = new TraceSignatureVisitor(0);
                    returnVisitor[0] = visitor;
                    return visitor;
                }
            };

            new SignatureReader(signature).accept(collector);

            MethodSignatureData data = new MethodSignatureData();
            for (TraceSignatureVisitor visitor : parameterVisitors) {
                String type = normalizeSignatureText(visitor.getDeclaration());
                if (type != null && !type.isBlank()) {
                    data.parameterTypes.add(type);
                }
            }

            if (returnVisitor[0] != null) {
                data.returnType = normalizeSignatureText(returnVisitor[0].getDeclaration());
            }

            return data;
        } catch (Exception ex) {
            return null;
        }
    }

    private static ClassSignatureData parseClassSignature(String signature) {
        if (signature == null || signature.isBlank()) {
            return null;
        }

        try {
            final TraceSignatureVisitor[] superVisitor = new TraceSignatureVisitor[1];
            final List<TraceSignatureVisitor> interfaceVisitors = new ArrayList<>();

            SignatureVisitor collector = new SignatureVisitor(Opcodes.ASM9) {
                @Override
                public SignatureVisitor visitSuperclass() {
                    TraceSignatureVisitor visitor = new TraceSignatureVisitor(0);
                    superVisitor[0] = visitor;
                    return visitor;
                }

                @Override
                public SignatureVisitor visitInterface() {
                    TraceSignatureVisitor visitor = new TraceSignatureVisitor(0);
                    interfaceVisitors.add(visitor);
                    return visitor;
                }
            };

            new SignatureReader(signature).accept(collector);

            ClassSignatureData data = new ClassSignatureData();
            if (superVisitor[0] != null) {
                data.superType = normalizeSignatureText(superVisitor[0].getDeclaration());
            }

            for (TraceSignatureVisitor visitor : interfaceVisitors) {
                String iface = normalizeSignatureText(visitor.getDeclaration());
                if (iface != null && !iface.isBlank()) {
                    data.interfaces.add(iface);
                }
            }

            return data;
        } catch (Exception ex) {
            return null;
        }
    }

    private static String normalizeSignatureText(String text) {
        if (text == null) {
            return null;
        }

        String normalized = text.trim();
        if (normalized.isEmpty()) {
            return normalized;
        }

        normalized = normalized.replace("java.lang.", "");
        normalized = normalized.replace('$', '.');
        normalized = normalized.replaceAll("\\s+", " ");
        return normalized;
    }

    private static String asmTypeToReadable(org.objectweb.asm.Type type) {
        switch (type.getSort()) {
            case org.objectweb.asm.Type.VOID:
                return "void";
            case org.objectweb.asm.Type.BOOLEAN:
                return "boolean";
            case org.objectweb.asm.Type.CHAR:
                return "char";
            case org.objectweb.asm.Type.BYTE:
                return "byte";
            case org.objectweb.asm.Type.SHORT:
                return "short";
            case org.objectweb.asm.Type.INT:
                return "int";
            case org.objectweb.asm.Type.FLOAT:
                return "float";
            case org.objectweb.asm.Type.LONG:
                return "long";
            case org.objectweb.asm.Type.DOUBLE:
                return "double";
            case org.objectweb.asm.Type.ARRAY:
                return asmTypeToReadable(type.getElementType()) + "[]".repeat(type.getDimensions());
            case org.objectweb.asm.Type.OBJECT:
                return simplifyClassName(type.getClassName());
            default:
                return type.getClassName();
        }
    }

    private static String internalNameToTypeName(String internalName) {
        return simplifyClassName(internalName.replace('/', '.'));
    }

    private static String simplifyClassName(String className) {
        if (className.startsWith("java.lang.")) {
            return className.substring("java.lang.".length());
        }
        return className;
    }

    private static String packageOf(String typeName) {
        int idx = typeName.lastIndexOf('.');
        if (idx < 0) {
            return "";
        }
        return typeName.substring(0, idx);
    }

    private static String simpleNameOf(String typeName) {
        int dot = typeName.lastIndexOf('.');
        String simple = dot >= 0 ? typeName.substring(dot + 1) : typeName;
        int dollar = simple.lastIndexOf('$');
        if (dollar >= 0 && dollar + 1 < simple.length()) {
            simple = simple.substring(dollar + 1);
        }
        return simple;
    }

    // ===== Usage Analysis Mode =====
    static void analyzeUsage(Path apiJsonFile, Path samplesPath) throws Exception {
        // Load API index (read from stdin when path is "-")
        String apiJson;
        if (apiJsonFile.toString().equals("-")) {
            apiJson = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        } else {
            apiJson = Files.readString(apiJsonFile);
        }
        JsonObject apiIndex = gson.fromJson(apiJson, JsonObject.class);

        // Build map of client + subclient classes -> methods
        Map<String, Set<String>> clientMethods = new HashMap<>();
        JsonArray packages = apiIndex.getAsJsonArray("packages");

        List<JsonObject> concreteClasses = new ArrayList<>();
        List<JsonObject> allClasses = new ArrayList<>();
        Set<String> allTypeNames = new HashSet<>();
        Set<String> interfaceNames = new HashSet<>();

        if (packages != null) {
            for (JsonElement pkgEl : packages) {
                JsonObject pkg = pkgEl.getAsJsonObject();
                JsonArray classes = pkg.getAsJsonArray("classes");
                if (classes != null) {
                    for (JsonElement clsEl : classes) {
                        JsonObject cls = clsEl.getAsJsonObject();
                        concreteClasses.add(cls);
                        allClasses.add(cls);
                        allTypeNames.add(baseTypeName(getString(cls, "name")));
                    }
                }

                JsonArray interfaces = pkg.getAsJsonArray("interfaces");
                if (interfaces != null) {
                    for (JsonElement clsEl : interfaces) {
                        JsonObject cls = clsEl.getAsJsonObject();
                        allClasses.add(cls);
                        String ifaceName = baseTypeName(getString(cls, "name"));
                        allTypeNames.add(ifaceName);
                        interfaceNames.add(ifaceName);
                    }
                }
            }
        }

        Map<String, List<JsonObject>> interfaceImplementers = new HashMap<>();
        for (JsonObject cls : allClasses) {
            JsonArray implementsArr = cls.getAsJsonArray("implements");
            if (implementsArr == null) {
                continue;
            }
            for (JsonElement ifaceEl : implementsArr) {
                String ifaceName = baseTypeName(ifaceEl.getAsString());
                interfaceImplementers.computeIfAbsent(ifaceName, k -> new ArrayList<>()).add(cls);
            }
        }

        Map<String, Set<String>> references = new HashMap<>();
        for (JsonObject cls : allClasses) {
            String name = baseTypeName(getString(cls, "name"));
            references.put(name, getReferencedTypes(cls, allTypeNames));
        }

        Map<String, Integer> referencedBy = new HashMap<>();
        for (Map.Entry<String, Set<String>> entry : references.entrySet()) {
            String sourceName = entry.getKey();
            for (String target : entry.getValue()) {
                // Exclude self-references to avoid inflating reference counts
                if (!target.equals(sourceName)) {
                    referencedBy.put(target, referencedBy.getOrDefault(target, 0) + 1);
                }
            }
        }

        Set<String> operationTypes = new HashSet<>();
        for (JsonObject cls : allClasses) {
            if (hasMethods(cls)) {
                operationTypes.add(baseTypeName(getString(cls, "name")));
            }
        }

        List<JsonObject> rootClasses = new ArrayList<>();
        for (JsonObject cls : concreteClasses) {
            String name = baseTypeName(getString(cls, "name"));
            boolean hasOperations = hasMethods(cls);
            boolean referencesOperations = references.getOrDefault(name, Set.of()).stream().anyMatch(operationTypes::contains);
            boolean isReferenced = referencedBy.containsKey(name);
            // Root classes: entry points (from package exports) with methods, or unreferenced types with operations
            boolean isEntryPoint = getBoolean(cls, "entryPoint");
            if ((isEntryPoint && hasOperations) || (!isReferenced && (hasOperations || referencesOperations))) {
                rootClasses.add(cls);
            }
        }

        if (rootClasses.isEmpty()) {
            for (JsonObject cls : concreteClasses) {
                String name = baseTypeName(getString(cls, "name"));
                boolean hasOperations = hasMethods(cls);
                boolean referencesOperations = references.getOrDefault(name, Set.of()).stream().anyMatch(operationTypes::contains);
                if (hasOperations || referencesOperations) {
                    rootClasses.add(cls);
                }
            }
        }

        Set<String> reachable = new HashSet<>();
        Deque<String> queue = new ArrayDeque<>();

        for (JsonObject cls : rootClasses) {
            String name = baseTypeName(getString(cls, "name"));
            if (reachable.add(name)) {
                queue.add(name);
            }
        }

        while (!queue.isEmpty()) {
            String current = queue.removeFirst();
            for (String ref : references.getOrDefault(current, Set.of())) {
                if (reachable.add(ref)) {
                    queue.add(ref);
                }
            }

            if (interfaceNames.contains(current)) {
                for (JsonObject impl : interfaceImplementers.getOrDefault(current, List.of())) {
                    String implName = baseTypeName(getString(impl, "name"));
                    if (reachable.add(implName)) {
                        queue.add(implName);
                    }
                }
            }
        }

        List<JsonObject> usageClasses = new ArrayList<>();
        for (JsonObject cls : allClasses) {
            String className = baseTypeName(getString(cls, "name"));
            if (reachable.contains(className) && hasMethods(cls)) {
                usageClasses.add(cls);
            }
        }

        for (JsonObject cls : usageClasses) {
            String className = getString(cls, "name");
            Set<String> methods = new HashSet<>();
            JsonArray methodsArr = cls.getAsJsonArray("methods");
            if (methodsArr != null) {
                for (JsonElement mEl : methodsArr) {
                    methods.add(mEl.getAsJsonObject().get("name").getAsString());
                }
            }
            if (!methods.isEmpty()) {
                clientMethods.putIfAbsent(className, methods);
            }
        }

        if (clientMethods.isEmpty()) {
            System.out.println(gson.toJson(Map.of("fileCount", 0, "covered", List.of(), "uncovered", List.of(), "patterns", List.of())));
            return;
        }

        // Build set of known client type names for local type inference
        Set<String> clientNames = new HashSet<>(clientMethods.keySet());

        // Build method and function return type maps from API data for precise factory/getter resolution
        Map<String, String> methodReturnTypeMap = buildMethodReturnTypeMap(usageClasses, clientNames);
        Map<String, String> fieldTypeMap = buildFieldTypeMap(usageClasses, clientNames);

        // Find sample files
        List<Path> javaFiles;
        try (var stream = Files.walk(samplesPath)) {
            javaFiles = stream
                .filter(p -> p.toString().endsWith(".java"))
                .filter(p -> !p.toString().contains("/target/") && !p.toString().contains("\\target\\"))
                .collect(Collectors.toList());
        }

        List<Map<String, Object>> covered = new ArrayList<>();
        Set<String> seenOps = new HashSet<>();
        Set<String> patterns = new HashSet<>();

        ParserConfiguration config = new ParserConfiguration();
        // Use RAW language level to disable validators that use reflection (fails in GraalVM native-image)
        config.setLanguageLevel(ParserConfiguration.LanguageLevel.RAW);
        JavaParser parser = new JavaParser(config);

        for (Path file : javaFiles) {
            try {
                ParseResult<CompilationUnit> result = parser.parse(file);
                if (!result.isSuccessful()) continue;

                CompilationUnit cu = result.getResult().orElse(null);
                if (cu == null) continue;

                String relPath = samplesPath.relativize(file).toString().replace('\\', '/');

                // Build variable -> client type map for this file
                Map<String, String> varTypes = buildVarTypeMap(cu, clientNames, methodReturnTypeMap, fieldTypeMap);

                // Find method calls using AST - resolve receiver type via var tracking first
                cu.walk(com.github.javaparser.ast.expr.MethodCallExpr.class, call -> {
                    String methodName = call.getNameAsString();

                    // Strategy 1: Resolve receiver type from local variable tracking
                    String resolvedClient = null;
                    if (call.getScope().isPresent()) {
                        Expression scope = call.getScope().get();

                        if (scope instanceof NameExpr) {
                            String varName = ((NameExpr) scope).getNameAsString();
                            String varType = varTypes.get(varName);
                            if (varType != null && clientMethods.containsKey(varType) && clientMethods.get(varType).contains(methodName)) {
                                resolvedClient = varType;
                            }
                        }

                        // Strategy 1b: Chained call -- receiver.getSubClient().method()
                        if (resolvedClient == null && scope instanceof MethodCallExpr) {
                            MethodCallExpr innerCall = (MethodCallExpr) scope;
                            String innerMethodName = innerCall.getNameAsString();

                            if (innerCall.getScope().isPresent() && innerCall.getScope().get() instanceof NameExpr) {
                                String innerVarName = ((NameExpr) innerCall.getScope().get()).getNameAsString();

                                // Static factory: ClientType.create().method()
                                if (clientNames.contains(innerVarName)) {
                                    String staticKey = innerVarName + "." + innerMethodName;
                                    String retType = methodReturnTypeMap.get(staticKey);
                                    if (retType != null && clientMethods.containsKey(retType) && clientMethods.get(retType).contains(methodName)) {
                                        resolvedClient = retType;
                                    }
                                }

                                // Instance method: service.getSubClient().method()
                                if (resolvedClient == null) {
                                    String receiverType = varTypes.get(innerVarName);
                                    if (receiverType != null) {
                                        String methodKey = receiverType + "." + innerMethodName;
                                        String retType = methodReturnTypeMap.get(methodKey);
                                        if (retType != null && clientMethods.containsKey(retType) && clientMethods.get(retType).contains(methodName)) {
                                            resolvedClient = retType;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (resolvedClient != null) {
                        String key = resolvedClient + "." + methodName;
                        if (seenOps.add(key)) {
                            int line = call.getBegin().map(p -> p.line).orElse(0);
                            covered.add(Map.of("client", resolvedClient, "method", methodName, "file", relPath, "line", line));
                        }
                    }
                });

                // Detect patterns using purely structural AST analysis -- no keyword matching
                cu.walk(Node.class, node -> {
                    if (node instanceof com.github.javaparser.ast.stmt.TryStmt) patterns.add("error-handling");
                    if (node instanceof com.github.javaparser.ast.expr.LambdaExpr) patterns.add("async-callback");
                });

            } catch (Exception e) {
                // Skip problematic files
            }
        }

        // Build bidirectional interface <-> implementation mapping for coverage cross-referencing
        Map<String, List<String>> ifaceToImplNames = new HashMap<>();
        Map<String, List<String>> implToIfaceNames = new HashMap<>();
        for (JsonObject cls : allClasses) {
            String clsName = getString(cls, "name");
            JsonArray implementsArr = cls.getAsJsonArray("implements");
            if (implementsArr != null) {
                for (JsonElement ifaceEl : implementsArr) {
                    String ifaceName = baseTypeName(ifaceEl.getAsString());
                    ifaceToImplNames.computeIfAbsent(ifaceName, k -> new ArrayList<>()).add(clsName);
                    implToIfaceNames.computeIfAbsent(clsName, k -> new ArrayList<>()).add(ifaceName);
                }
            }
        }

        // Build uncovered list with interface/implementation cross-referencing
        List<Map<String, Object>> uncovered = new ArrayList<>();
        for (Map.Entry<String, Set<String>> entry : clientMethods.entrySet()) {
            String clientName = entry.getKey();
            for (String method : entry.getValue()) {
                String key = clientName + "." + method;
                if (seenOps.contains(key)) {
                    continue;
                }

                // Check if covered through an interface/implementation relationship
                boolean coveredViaRelated = false;

                // If this is an implementation, check if any of its interfaces has the method covered
                List<String> implementedIfaces = implToIfaceNames.getOrDefault(clientName, List.of());
                for (String iface : implementedIfaces) {
                    if (seenOps.contains(iface + "." + method)) {
                        coveredViaRelated = true;
                        break;
                    }
                }

                // If this is an interface, check if any implementation has the method covered
                if (!coveredViaRelated) {
                    List<String> implementations = ifaceToImplNames.getOrDefault(clientName, List.of());
                    for (String impl : implementations) {
                        if (seenOps.contains(impl + "." + method)) {
                            coveredViaRelated = true;
                            break;
                        }
                    }
                }

                if (!coveredViaRelated) {
                    uncovered.add(Map.of("client", clientName, "method", method, "sig", method + "(...)"));
                }
            }
        }

        Map<String, Object> result = Map.of(
            "fileCount", javaFiles.size(),
            "covered", covered,
            "uncovered", uncovered,
            "patterns", new ArrayList<>(patterns)
        );
        System.out.println(gson.toJson(result));
    }

    // =========================================================================
    // Variable Tracking -- API-data-driven type resolution
    // =========================================================================

    /**
     * Unwrap Java async/wrapper return types.
     * E.g., "CompletableFuture&lt;BlobClient&gt;" -> "BlobClient", "Mono&lt;BlobClient&gt;" -> "BlobClient"
     */
    private static String unwrapJavaReturnType(String ret) {
        if (ret == null || ret.isEmpty()) return "";
        String[] wrappers = {"CompletableFuture", "CompletionStage", "Future", "Mono", "Flux",
                             "Single", "Observable", "Maybe", "Flow.Publisher", "Publisher",
                             "Optional", "PagedIterable", "PagedFlux", "Response"};
        for (String wrapper : wrappers) {
            if (ret.startsWith(wrapper + "<") && ret.endsWith(">")) {
                return ret.substring(wrapper.length() + 1, ret.length() - 1).trim();
            }
        }
        return ret;
    }

    /**
     * Build a map of "OwnerType.MethodName" -> return type from API method data,
     * only for methods that return a known client type.
     */
    private static Map<String, String> buildMethodReturnTypeMap(List<JsonObject> usageClasses, Set<String> clientNames) {
        Map<String, String> map = new HashMap<>();
        for (JsonObject cls : usageClasses) {
            String className = baseTypeName(getString(cls, "name"));
            JsonArray methods = cls.getAsJsonArray("methods");
            if (methods == null) continue;
            for (JsonElement mEl : methods) {
                JsonObject m = mEl.getAsJsonObject();
                String ret = getString(m, "ret");
                if (!ret.isEmpty()) {
                    String retType = baseTypeName(unwrapJavaReturnType(ret));
                    if (clientNames.contains(retType)) {
                        map.put(className + "." + getString(m, "name"), retType);
                    }
                }
            }
            // Also check constructors -- they return the class type itself
            JsonArray constructors = cls.getAsJsonArray("constructors");
            if (constructors != null) {
                for (JsonElement cEl : constructors) {
                    JsonObject c = cEl.getAsJsonObject();
                    // Constructor name equals class name
                    if (clientNames.contains(className)) {
                        map.put(className + "." + getString(c, "name"), className);
                    }
                }
            }
        }
        return map;
    }

    /**
     * Build a map of "OwnerType.FieldName" -> client type from API field data,
     * for fields whose type is a known client type.
     */
    private static Map<String, String> buildFieldTypeMap(List<JsonObject> usageClasses, Set<String> clientNames) {
        Map<String, String> map = new HashMap<>();
        for (JsonObject cls : usageClasses) {
            String className = baseTypeName(getString(cls, "name"));
            JsonArray fields = cls.getAsJsonArray("fields");
            if (fields == null) continue;
            for (JsonElement fEl : fields) {
                JsonObject f = fEl.getAsJsonObject();
                String fieldType = baseTypeName(getString(f, "type"));
                if (clientNames.contains(fieldType)) {
                    map.put(className + "." + getString(f, "name"), fieldType);
                }
            }
        }
        return map;
    }

    /**
     * Build a variable -> client type map for a compilation unit.
     *
     * Tracks patterns:
     *   - BlobClient client = new BlobClient(...)    -> client maps to BlobClient
     *   - var client = new BlobClient(...)            -> client maps to BlobClient
     *   - BlobClient client = svc.getBlobClient(...)  -> client maps to BlobClient (via method return type map)
     *   - BlobClient client = BlobClientBuilder.build() -> client maps to BlobClient
     *
     * All type resolution is driven by API index data -- no name-based heuristics.
     */
    @SuppressWarnings("unchecked")
    private static Map<String, String> buildVarTypeMap(CompilationUnit cu, Set<String> clientNames,
                                                        Map<String, String> methodReturnTypeMap,
                                                        Map<String, String> fieldTypeMap) {
        Map<String, String> varTypes = new HashMap<>();

        // Walk all variable declarations
        cu.walk(VariableDeclarator.class, vd -> {
            String varName = vd.getNameAsString();

            // Check type annotation first: BlobClient client = ...
            String declType = baseTypeName(vd.getType().asString());
            if (clientNames.contains(declType)) {
                varTypes.put(varName, declType);
                return;
            }

            // Check initializer
            if (vd.getInitializer().isPresent()) {
                Expression init = vd.getInitializer().get();
                String resolved = resolveExprType(init, clientNames, varTypes, methodReturnTypeMap, fieldTypeMap);
                if (resolved != null) {
                    varTypes.put(varName, resolved);
                }
            }
        });

        // Also track assignments: client = new BlobClient(...)
        cu.walk(AssignExpr.class, assign -> {
            Expression target = assign.getTarget();
            if (target instanceof NameExpr) {
                String varName = ((NameExpr) target).getNameAsString();
                String resolved = resolveExprType(assign.getValue(), clientNames, varTypes, methodReturnTypeMap, fieldTypeMap);
                if (resolved != null) {
                    varTypes.put(varName, resolved);
                }
            }
        });

        return varTypes;
    }

    /**
     * Resolve the client type of an expression using API data.
     */
    private static String resolveExprType(Expression expr, Set<String> clientNames,
                                           Map<String, String> varTypes,
                                           Map<String, String> methodReturnTypeMap,
                                           Map<String, String> fieldTypeMap) {
        // new BlobClient(...)
        if (expr instanceof ObjectCreationExpr) {
            String typeName = baseTypeName(((ObjectCreationExpr) expr).getType().asString());
            if (clientNames.contains(typeName)) {
                return typeName;
            }
        }

        // Method call: svc.getBlobClient(...) or BlobClientBuilder.build()
        if (expr instanceof MethodCallExpr) {
            MethodCallExpr call = (MethodCallExpr) expr;
            String calledMethod = call.getNameAsString();

            if (call.getScope().isPresent() && call.getScope().get() instanceof NameExpr) {
                String scopeName = ((NameExpr) call.getScope().get()).getNameAsString();

                // Static factory: ClientType.create(...)
                if (clientNames.contains(scopeName)) {
                    String staticKey = scopeName + "." + calledMethod;
                    String retType = methodReturnTypeMap.get(staticKey);
                    if (retType != null) return retType;
                }

                // Instance method: service.getSubClient(...)
                String receiverType = varTypes.get(scopeName);
                if (receiverType != null) {
                    String methodKey = receiverType + "." + calledMethod;
                    String retType = methodReturnTypeMap.get(methodKey);
                    if (retType != null) return retType;
                }
            }
        }

        // Cast expression: (BlobClient) expr
        if (expr instanceof CastExpr) {
            String castType = baseTypeName(((CastExpr) expr).getType().asString());
            if (clientNames.contains(castType)) {
                return castType;
            }
        }

        // Field access: svc.blobField
        if (expr instanceof FieldAccessExpr) {
            FieldAccessExpr fieldAccess = (FieldAccessExpr) expr;
            Expression scope = fieldAccess.getScope();
            if (scope instanceof NameExpr) {
                String scopeName = ((NameExpr) scope).getNameAsString();
                String receiverType = varTypes.get(scopeName);
                if (receiverType != null) {
                    String fieldKey = receiverType + "." + fieldAccess.getNameAsString();
                    String fieldType = fieldTypeMap.get(fieldKey);
                    if (fieldType != null) return fieldType;
                }
            }
        }

        return null;
    }

        private static String getString(JsonObject obj, String prop) {
            if (obj == null || !obj.has(prop) || obj.get(prop).isJsonNull()) {
                return "";
            }
            return obj.get(prop).getAsString();
        }

        private static boolean getBoolean(JsonObject obj, String prop) {
            if (obj == null || !obj.has(prop) || obj.get(prop).isJsonNull()) {
                return false;
            }
            return obj.get(prop).getAsBoolean();
        }

        private static boolean hasMethods(JsonObject cls) {
            JsonArray methods = cls.getAsJsonArray("methods");
            return methods != null && methods.size() > 0;
        }

        /**
         * Mark all types in a package info map under the given key as entry points.
         */
        @SuppressWarnings("unchecked")
        private static void markEntryPoints(Map<String, Object> pkgInfo, String key) {
            List<Map<String, Object>> types = (List<Map<String, Object>>) pkgInfo.get(key);
            if (types != null) {
                for (Map<String, Object> type : types) {
                    type.put("entryPoint", true);
                }
            }
        }

        private static String baseTypeName(String name) {
            if (name == null) {
                return "";
            }
            int idx = name.indexOf('<');
            return idx >= 0 ? name.substring(0, idx) : name;
        }

        private static Set<String> getReferencedTypes(JsonObject cls, Set<String> allTypeNames) {
            Set<String> refs = new HashSet<>();

            String ext = getString(cls, "extends");
            if (!ext.isEmpty()) {
                String base = baseTypeName(ext);
                if (allTypeNames.contains(base)) {
                    refs.add(base);
                }
            }

            JsonArray impls = cls.getAsJsonArray("implements");
            if (impls != null) {
                for (JsonElement el : impls) {
                    String iface = baseTypeName(el.getAsString());
                    if (allTypeNames.contains(iface)) {
                        refs.add(iface);
                    }
                }
            }

            // Use token-boundary matching to avoid substring false positives
            // (e.g., "Policy" matching inside "PolicyList")
            JsonArray methods = cls.getAsJsonArray("methods");
            if (methods != null) {
                for (JsonElement mEl : methods) {
                    JsonObject m = mEl.getAsJsonObject();
                    Set<String> tokens = tokenizeIdentifiers(getString(m, "sig"));
                    tokens.addAll(tokenizeIdentifiers(getString(m, "ret")));
                    for (String token : tokens) {
                        if (allTypeNames.contains(token)) {
                            refs.add(token);
                        }
                    }
                }
            }

            JsonArray fields = cls.getAsJsonArray("fields");
            if (fields != null) {
                for (JsonElement fEl : fields) {
                    JsonObject f = fEl.getAsJsonObject();
                    Set<String> tokens = tokenizeIdentifiers(getString(f, "type"));
                    for (String token : tokens) {
                        if (allTypeNames.contains(token)) {
                            refs.add(token);
                        }
                    }
                }
            }

            return refs;
        }

        /**
         * Tokenizes a signature string into individual identifier tokens.
         * Splits on non-identifier characters (anything that isn't a letter, digit, or underscore).
         * This prevents substring false positives like "Policy" matching inside "PolicyList".
         */
        private static Set<String> tokenizeIdentifiers(String text) {
            Set<String> tokens = new HashSet<>();
            if (text == null || text.isEmpty()) return tokens;
            int start = -1;
            for (int i = 0; i <= text.length(); i++) {
                boolean isIdChar = i < text.length() && (Character.isLetterOrDigit(text.charAt(i)) || text.charAt(i) == '_');
                if (isIdChar) {
                    if (start < 0) start = i;
                } else {
                    if (start >= 0) {
                        tokens.add(text.substring(start, i));
                        start = -1;
                    }
                }
            }
            return tokens;
        }

    static Map<String, Object> extractPackage(Path root) throws Exception {
        // Reset the type collector and import map for this engine run
        typeCollector.clear();
        importMap.clear();
        wildcardPackages.clear();

        String packageName = detectPackageName(root);
        List<Map<String, Object>> packages = new ArrayList<>();
        Map<String, Map<String, Object>> packageMap = new TreeMap<>();

        // Get root for relative path calculations
        String rootStr = root.toString().replace('\\', '/');
        if (!rootStr.endsWith("/")) rootStr += "/";
        final String finalRootStr = rootStr;

        List<Path> javaFiles;
        try (var stream = Files.walk(root)) {
            javaFiles = stream
                .filter(p -> p.toString().endsWith(".java"))
                .filter(p -> {
                    // Get path relative to root for filtering
                    String pathStr = p.toString().replace('\\', '/');
                    String relativePath = pathStr.startsWith(finalRootStr)
                        ? pathStr.substring(finalRootStr.length())
                        : pathStr;
                    // Skip test directories, build artifacts, and generated code
                    if (relativePath.startsWith("src/test/") || relativePath.contains("/src/test/")) return false;
                    if (relativePath.contains("/target/") || relativePath.startsWith("target/")) return false;
                    if (relativePath.contains("/build/") || relativePath.startsWith("build/")) return false;
                    if (relativePath.contains("/.gradle/") || relativePath.startsWith(".gradle/")) return false;
                    if (relativePath.contains("/bin/") || relativePath.startsWith("bin/")) return false;
                    if (relativePath.contains("/out/") || relativePath.startsWith("out/")) return false;
                    return true;
                })
                .filter(p -> !p.getFileName().toString().startsWith("package-info"))
                .sorted()
                .collect(Collectors.toList());
        }

        ParserConfiguration config = new ParserConfiguration();
        // Use RAW language level to disable validators that use reflection (fails in GraalVM native-image)
        config.setLanguageLevel(ParserConfiguration.LanguageLevel.RAW);
        JavaParser parser = new JavaParser(config);

        for (Path file : javaFiles) {
            try {
                ParseResult<CompilationUnit> result = parser.parse(file);
                if (!result.isSuccessful()) {
                    // Log parse failures to stderr for debugging
                    System.err.println("Parse failed: " + file + " - " +
                        result.getProblems().stream()
                            .map(p -> p.getMessage())
                            .collect(Collectors.joining("; ")));
                    continue;
                }

                CompilationUnit cu = result.getResult().orElse(null);
                if (cu == null) continue;

                // Collect import statements for type-to-package resolution
                collectImports(cu);

                String pkg = cu.getPackageDeclaration()
                    .map(pd -> pd.getNameAsString())
                    .orElse("");

                // Skip implementation packages
                if (pkg.contains(".implementation") || pkg.contains(".internal")) continue;

                packageMap.putIfAbsent(pkg, new LinkedHashMap<>());
                Map<String, Object> pkgInfo = packageMap.get(pkg);
                pkgInfo.put("name", pkg);

                for (TypeDeclaration<?> type : cu.getTypes()) {
                    extractType(type, pkgInfo);
                }
            } catch (Exception e) {
                // Log parse exceptions to stderr for debugging
                System.err.println("Exception parsing " + file + ": " + e.getMessage());
            }
        }

        packages.addAll(packageMap.values());

        // Mark entry points: types in the shallowest (root) package are primary entry points.
        // The root package is the one with the fewest dots (most top-level), matching how Java
        // users import the SDK. Sub-packages (e.g., .models, .options) are supporting types.
        if (!packageMap.isEmpty()) {
            int minDepth = Integer.MAX_VALUE;
            String rootPkg = "";
            for (String pkg : packageMap.keySet()) {
                int depth = pkg.isEmpty() ? 0 : (int) pkg.chars().filter(c -> c == '.').count();
                if (depth < minDepth) {
                    minDepth = depth;
                    rootPkg = pkg;
                }
            }
            Map<String, Object> rootPkgInfo = packageMap.get(rootPkg);
            if (rootPkgInfo != null) {
                markEntryPoints(rootPkgInfo, "classes");
                markEntryPoints(rootPkgInfo, "interfaces");
            }
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("package", packageName);
        result.put("packages", packages);

        // Resolve transitive dependencies
        List<Map<String, Object>> dependencies = resolveTransitiveDependencies(packages);
        if (!dependencies.isEmpty()) {
            result.put("dependencies", dependencies);
        }

        return result;
    }

    // ===== Transitive Dependency Resolution =====

    // =========================================================================
    // Builtin Type Detection (dynamic, version-aware)
    // =========================================================================

    // Java primitive types (language-level, never change)
    private static final Set<String> JAVA_PRIMITIVES = Set.of(
        "boolean", "byte", "char", "short", "int", "long", "float", "double", "void"
    );

    // System packages discovered from ModuleLayer.boot() — precise and version-aware.
    // Covers java.*, javax.*, jdk.*, sun.*, com.sun.*, etc. automatically.
    private static final Set<String> JAVA_SYSTEM_PACKAGES;

    // Simple class names from system modules, discovered via JRT filesystem.
    // Used for short-name builtin checks (e.g., "String", "List", "Map").
    private static final Set<String> JAVA_SYSTEM_SIMPLE_NAMES;

    static {
        // 1. Discover all system packages from the module layer
        Set<String> pkgs = new HashSet<>();
        try {
            ModuleLayer.boot().modules().forEach(m -> pkgs.addAll(m.getPackages()));
        } catch (Exception e) {
            // Shouldn't happen on Java 9+
        }
        JAVA_SYSTEM_PACKAGES = Collections.unmodifiableSet(pkgs);

        // 2. Discover all system class simple names from JRT filesystem
        Set<String> names = new HashSet<>(JAVA_PRIMITIVES);
        try {
            FileSystem jrt = FileSystems.getFileSystem(URI.create("jrt:/"));
            try (var stream = Files.walk(jrt.getPath("/modules"))) {
                stream.filter(p -> p.toString().endsWith(".class"))
                    .forEach(p -> {
                        String fileName = p.getFileName().toString();
                        String simpleName = fileName.substring(0, fileName.length() - 6);
                        if (!simpleName.contains("$") &&
                            !simpleName.equals("package-info") &&
                            !simpleName.equals("module-info")) {
                            names.add(simpleName);
                        }
                    });
            }
        } catch (Exception e) {
            // JRT not available (e.g., unusual runtime) — names will have primitives only,
            // which is still correct for the most critical cases.
        }
        JAVA_SYSTEM_SIMPLE_NAMES = Collections.unmodifiableSet(names);
    }

    // java.lang types are auto-imported (like Go's universe types) — these are true builtins.
    // Types from java.util, java.io, java.net, etc. need explicit imports and should be tracked.
    private static final Set<String> JAVA_LANG_NAMES;
    static {
        Set<String> langNames = new HashSet<>(JAVA_PRIMITIVES);
        try {
            FileSystem jrt = FileSystems.getFileSystem(URI.create("jrt:/"));
            Path javaLang = jrt.getPath("/modules/java.base/java/lang");
            if (Files.exists(javaLang)) {
                try (var stream = Files.list(javaLang)) {
                    stream.filter(p -> p.toString().endsWith(".class"))
                        .forEach(p -> {
                            String fileName = p.getFileName().toString();
                            String simpleName = fileName.substring(0, fileName.length() - 6);
                            if (!simpleName.contains("$") &&
                                !simpleName.equals("package-info") &&
                                !simpleName.equals("module-info")) {
                                langNames.add(simpleName);
                            }
                        });
                }
            }
        } catch (Exception e) {
            // JRT not available — langNames will have primitives only.
            // With --initialize-at-build-time=GraphApi, this never triggers
            // in native-image (JRT is available during the build).
        }
        JAVA_LANG_NAMES = Collections.unmodifiableSet(langNames);
    }

    private static boolean isBuiltinType(String typeName) {
        if (typeName == null || typeName.isEmpty()) return true;
        String baseName = typeName.contains("<") ? typeName.substring(0, typeName.indexOf('<')) : typeName;
        baseName = baseName.contains(".") ? baseName.substring(baseName.lastIndexOf('.') + 1) : baseName;
        return JAVA_LANG_NAMES.contains(baseName);
    }

    private static boolean isStdlibPackage(String pkgName) {
        if (pkgName == null || pkgName.isEmpty()) return true;
        return JAVA_SYSTEM_PACKAGES.contains(pkgName);
    }

    // =========================================================================
    // AST-Based Type Reference Collection
    // =========================================================================

    /**
     * Collector for type references during engine run using proper AST traversal.
     * Tracks which context a reference appeared in to enable classification
     * (e.g., types seen only in {@code implements} clauses are interfaces).
     */
    private static class TypeReferenceCollector {
        private final Set<String> refs = new HashSet<>();
        private final Set<String> definedTypes = new HashSet<>();
        /** Types seen in {@code implements} clauses (definitely interfaces). */
        private final Set<String> implementsRefs = new HashSet<>();
        /** Types seen in {@code extends} clauses (definitely superclasses). */
        private final Set<String> extendsRefs = new HashSet<>();

        void addDefinedType(String name) {
            if (name != null) {
                String baseName = name.contains("<") ? name.substring(0, name.indexOf('<')) : name;
                definedTypes.add(baseName);
            }
        }

        /**
         * Record a type reference that appeared in an {@code implements} clause.
         * Such types are definitionally interfaces in Java.
         */
        void addImplementsRef(Type type) {
            if (type == null) return;
            if (type.isClassOrInterfaceType()) {
                String name = type.asClassOrInterfaceType().getNameAsString();
                if (!isBuiltinType(name)) {
                    implementsRefs.add(normalizeReferenceName(name));
                    if (type.asClassOrInterfaceType().getScope().isPresent()) {
                        String qualified = type.asClassOrInterfaceType().getScope().get() + "." + name;
                        implementsRefs.add(normalizeReferenceName(qualified));
                    }
                }
            }
            collectFromType(type);
        }

        /**
         * Record a type reference that appeared in an {@code extends} clause
         * for a class (not an interface). Such types are definitionally
         * superclasses in Java.
         */
        void addExtendsRef(Type type) {
            if (type == null) return;
            if (type.isClassOrInterfaceType()) {
                String name = type.asClassOrInterfaceType().getNameAsString();
                if (!isBuiltinType(name)) {
                    extendsRefs.add(normalizeReferenceName(name));
                    if (type.asClassOrInterfaceType().getScope().isPresent()) {
                        String qualified = type.asClassOrInterfaceType().getScope().get() + "." + name;
                        extendsRefs.add(normalizeReferenceName(qualified));
                    }
                }
            }
            collectFromType(type);
        }

        /**
         * Collect type references from a JavaParser Type node.
         * Walks the AST properly handling:
         * - ClassOrInterfaceType: MyClass, pkg.MyClass
         * - ArrayType: int[], String[]
         * - PrimitiveType: int, boolean
         * - VoidType: void
         * - WildcardType: ? extends X
         * - TypeParameter: T, E
         */
        void collectFromType(Type type) {
            if (type == null) return;

            if (type.isClassOrInterfaceType()) {
                ClassOrInterfaceType cit = type.asClassOrInterfaceType();
                // Get the simple name (ignoring scope/package)
                String name = cit.getNameAsString();
                if (!isBuiltinType(name)) {
                    // Get fully qualified if there's a scope
                    if (cit.getScope().isPresent()) {
                        String fullName = cit.getScope().get().toString() + "." + name;
                        refs.add(fullName);
                    } else {
                        refs.add(name);
                    }
                }
                // Recursively collect from generic type arguments
                cit.getTypeArguments().ifPresent(args -> {
                    for (Type arg : args) {
                        collectFromType(arg);
                    }
                });
            } else if (type.isArrayType()) {
                // Array type like String[]
                collectFromType(type.asArrayType().getComponentType());
            } else if (type.isWildcardType()) {
                // Wildcard like ? extends X or ? super Y
                WildcardType wt = type.asWildcardType();
                wt.getExtendedType().ifPresent(this::collectFromType);
                wt.getSuperType().ifPresent(this::collectFromType);
            } else if (type.isUnionType()) {
                // Union type in catch clauses
                for (ReferenceType rt : type.asUnionType().getElements()) {
                    collectFromType(rt);
                }
            } else if (type.isIntersectionType()) {
                // Intersection type
                for (ReferenceType rt : type.asIntersectionType().getElements()) {
                    collectFromType(rt);
                }
            }
            // PrimitiveType and VoidType are skipped (they're builtins)
        }

        /**
         * Collect type references from a list of parameters.
         */
        void collectFromParameters(List<Parameter> params) {
            if (params == null) return;
            for (Parameter param : params) {
                collectFromType(param.getType());
            }
        }

        /**
         * Get external type references (not locally defined, not builtins).
         */
        Set<String> getExternalRefs() {
            Set<String> result = new HashSet<>();
            for (String typeName : refs) {
                String baseName = typeName.contains("<") ? typeName.substring(0, typeName.indexOf('<')) : typeName;
                baseName = baseName.contains(".") ? baseName.substring(baseName.lastIndexOf('.') + 1) : baseName;
                if (!definedTypes.contains(baseName) && !isBuiltinType(typeName)) {
                    result.add(typeName);
                }
            }
            return result;
        }

        /**
         * Check if a base type name was seen in an {@code implements} clause,
         * meaning it is definitionally an interface.
         * Checks both the qualified and simple-name forms.
         */
        boolean isKnownInterface(String baseName) {
            return implementsRefs.contains(normalizeReferenceName(baseName))
                || implementsRefs.contains(toSimpleName(baseName));
        }

        /**
         * Check if a base type name was seen in an {@code extends} clause
         * of a class, meaning it is definitionally a superclass (class, not interface).
         * Checks both the qualified and simple-name forms.
         */
        boolean isKnownSuperclass(String baseName) {
            return extendsRefs.contains(normalizeReferenceName(baseName))
                || extendsRefs.contains(toSimpleName(baseName));
        }

        /**
         * Strip generics and array brackets from a type name, preserving
         * any package/scope qualifier (e.g. {@code java.util.List<String> → java.util.List}).
         */
        private String normalizeReferenceName(String typeName) {
            if (typeName == null) {
                return "";
            }

            String normalized = typeName;
            int genericStart = normalized.indexOf('<');
            if (genericStart >= 0) {
                normalized = normalized.substring(0, genericStart);
            }

            normalized = normalized.replace("[]", "").trim();
            return normalized;
        }

        /**
         * Strip generics, array brackets, <em>and</em> package qualifier to
         * produce a simple name (e.g. {@code java.util.List<String> → List}).
         */
        private String toSimpleName(String typeName) {
            String normalized = normalizeReferenceName(typeName);
            if (normalized.contains(".")) {
                normalized = normalized.substring(normalized.lastIndexOf('.') + 1);
            }
            return normalized;
        }

        void clear() {
            refs.clear();
            definedTypes.clear();
            implementsRefs.clear();
            extendsRefs.clear();
        }
    }

    // Global collector (reset per engine run)
    private static final TypeReferenceCollector typeCollector = new TypeReferenceCollector();

    private static final class RuntimeTypeMetadata {
        final boolean isInterface;
        final String kind;
        final List<String> modifiers;

        RuntimeTypeMetadata(boolean isInterface, String kind, List<String> modifiers) {
            this.isInterface = isInterface;
            this.kind = kind;
            this.modifiers = modifiers;
        }
    }

    // Maps simple type names to their fully qualified package from import statements
    // This enables rigorous resolution instead of heuristic guessing
    private static final Map<String, String> importMap = new HashMap<>();

    // Wildcard import packages (e.g., "com.example.core" from "import com.example.core.*")
    // Used as fallback when a type isn't found in the explicit import map
    private static final Set<String> wildcardPackages = new LinkedHashSet<>();

    @SuppressWarnings("unchecked")
    private static List<Map<String, Object>> resolveTransitiveDependencies(List<Map<String, Object>> packages) {
        // Get externally referenced types from the AST collector
        Set<String> externalTypes = typeCollector.getExternalRefs();

        if (externalTypes.isEmpty()) {
            return List.of();
        }

        // Group by resolved package using import mappings
        Map<String, List<String>> byPackage = new TreeMap<>();
        for (String typeName : externalTypes) {
            String pkg = resolvePackageFromImports(typeName);
            if (pkg != null) {
                byPackage.computeIfAbsent(pkg, k -> new ArrayList<>()).add(typeName);
            }
        }

        // Convert to dependency list, classifying types as classes or interfaces
        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, List<String>> entry : byPackage.entrySet()) {
            Map<String, Object> depInfo = new LinkedHashMap<>();
            depInfo.put("package", entry.getKey());
            depInfo.put("isStdlib", isStdlibPackage(entry.getKey()));

            List<Map<String, Object>> classes = new ArrayList<>();
            List<Map<String, Object>> interfaces = new ArrayList<>();
            List<Map<String, Object>> types = new ArrayList<>();
            for (String typeName : entry.getValue().stream().distinct().sorted().collect(Collectors.toList())) {
                Map<String, Object> typeEntry = new LinkedHashMap<>();
                String baseName = typeName.contains(".") ? typeName.substring(typeName.lastIndexOf('.') + 1) : typeName;
                typeEntry.put("name", baseName);

                String fqcn = typeName.contains(".") ? typeName : (entry.getKey() + "." + baseName);
                RuntimeTypeMetadata runtimeMetadata = tryResolveRuntimeTypeMetadata(fqcn);

                if (runtimeMetadata != null) {
                    if (runtimeMetadata.kind != null) {
                        typeEntry.put("kind", runtimeMetadata.kind);
                    }
                    if (!runtimeMetadata.modifiers.isEmpty()) {
                        typeEntry.put("modifiers", runtimeMetadata.modifiers);
                    }

                    if (runtimeMetadata.isInterface) {
                        interfaces.add(typeEntry);
                    } else {
                        classes.add(typeEntry);
                    }
                } else if (typeCollector.isKnownInterface(typeName)) {
                    interfaces.add(typeEntry);
                } else if (typeCollector.isKnownSuperclass(typeName)) {
                    classes.add(typeEntry);
                } else {
                    // Type appears only in parameter/return positions —
                    // cannot classify from source alone
                    types.add(typeEntry);
                }
            }
            if (!classes.isEmpty()) {
                depInfo.put("classes", classes);
            }
            if (!interfaces.isEmpty()) {
                depInfo.put("interfaces", interfaces);
            }
            if (!types.isEmpty()) {
                depInfo.put("types", types);
            }

            result.add(depInfo);
        }

        return result;
    }

    /**
     * Attempts to resolve type metadata (interface vs class, modifiers) by loading
     * the class at runtime using {@code Class.forName}.
     *
     * <p><b>Limitation:</b> This only succeeds for types on the JBang/JDK classpath
     * (e.g. {@code java.*}, {@code javax.*}, {@code jakarta.*}). Third-party SDK
     * dependency classes will not be resolvable and will return {@code null}, falling
     * back to heuristic classification via {@code TypeReferenceCollector}.</p>
     *
     * @param fqcn Fully-qualified class name to look up.
     * @return Metadata if the class is loadable, otherwise {@code null}.
     */
    private static RuntimeTypeMetadata tryResolveRuntimeTypeMetadata(String fqcn) {
        if (fqcn == null || fqcn.isBlank()) {
            return null;
        }

        try {
            Class<?> cls = Class.forName(fqcn, false, Thread.currentThread().getContextClassLoader());
            int mods = cls.getModifiers();

            List<String> modifierList = new ArrayList<>();
            String modifierText = Modifier.toString(mods);
            if (modifierText != null && !modifierText.isBlank()) {
                modifierList.addAll(Arrays.asList(modifierText.split("\\s+")));
            }

            if (cls.isInterface()) {
                return new RuntimeTypeMetadata(true, "interface", modifierList);
            }

            String kind = "class";
            if (Modifier.isAbstract(mods)) {
                kind = "abstract";
            } else if (Modifier.isFinal(mods)) {
                kind = "final";
            }

            return new RuntimeTypeMetadata(false, kind, modifierList);
        } catch (ClassNotFoundException | LinkageError ex) {
            return null;
        }
    }

    /**
     * Resolve a type name to its package using collected import statements.
     * This is rigorous - it only returns a package if we found an explicit import.
     */
    private static String resolvePackageFromImports(String typeName) {
        // If it already has a package prefix, use it
        if (typeName.contains(".")) {
            int lastDot = typeName.lastIndexOf('.');
            return typeName.substring(0, lastDot);
        }

        // Look up in import map (collected from source files)
        String resolved = importMap.get(typeName);
        if (resolved != null) {
            return resolved;
        }

        // Fall back to wildcard packages — if there's exactly one, use it.
        // If multiple wildcard packages exist, we can't determine which one
        // the type belongs to without compiled analysis, so we skip.
        if (wildcardPackages.size() == 1) {
            return wildcardPackages.iterator().next();
        }

        return null;
    }

    /**
     * Collect import statements from a compilation unit.
     * Maps simple type names to their fully qualified packages.
     */
    private static void collectImports(CompilationUnit cu) {
        for (ImportDeclaration imp : cu.getImports()) {
            if (imp.isStatic()) continue; // Skip static imports

            String importName = imp.getNameAsString();
            if (imp.isAsterisk()) {
                // Wildcard import like "import com.example.core.*"
                // Record the package for fallback resolution
                wildcardPackages.add(importName);
                continue;
            }

            // Regular import like "import com.example.core.ClientOptions"
            // Map the simple name to the package
            int lastDot = importName.lastIndexOf('.');
            if (lastDot > 0) {
                String simpleName = importName.substring(lastDot + 1);
                String packageName = importName.substring(0, lastDot);
                importMap.put(simpleName, packageName);
            }
        }
    }

    static void extractType(TypeDeclaration<?> type, Map<String, Object> pkgInfo) {
        if (!isPublic(type)) return;

        if (type instanceof ClassOrInterfaceDeclaration) {
            ClassOrInterfaceDeclaration cid = (ClassOrInterfaceDeclaration) type;
            Map<String, Object> info = extractClassOrInterface(cid);

            String key = cid.isInterface() ? "interfaces" : "classes";
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> list = (List<Map<String, Object>>)
                pkgInfo.computeIfAbsent(key, k -> new ArrayList<>());
            list.add(info);
        } else if (type instanceof RecordDeclaration) {
            RecordDeclaration rd = (RecordDeclaration) type;
            Map<String, Object> info = extractRecord(rd);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> list = (List<Map<String, Object>>)
                pkgInfo.computeIfAbsent("classes", k -> new ArrayList<>());
            list.add(info);
        } else if (type instanceof AnnotationDeclaration) {
            AnnotationDeclaration ad = (AnnotationDeclaration) type;
            Map<String, Object> info = extractAnnotationType(ad);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> list = (List<Map<String, Object>>)
                pkgInfo.computeIfAbsent("annotations", k -> new ArrayList<>());
            list.add(info);
        } else if (type instanceof EnumDeclaration) {
            Map<String, Object> info = extractEnum((EnumDeclaration) type);
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> list = (List<Map<String, Object>>)
                pkgInfo.computeIfAbsent("enums", k -> new ArrayList<>());
            list.add(info);
        }

        // Recurse into nested/inner type declarations (e.g., Builder inner classes)
        for (BodyDeclaration<?> member : type.getMembers()) {
            if (member instanceof TypeDeclaration<?>) {
                extractType((TypeDeclaration<?>) member, pkgInfo);
            }
        }
    }

    static Map<String, Object> extractClassOrInterface(ClassOrInterfaceDeclaration cid) {
        Map<String, Object> info = new LinkedHashMap<>();
        String typeName = cid.getNameAsString();
        info.put("name", typeName);
        boolean isInterface = cid.isInterface();
        addDeprecation(cid, info);

        // Register this type as defined
        typeCollector.addDefinedType(typeName);

        List<String> mods = getModifiers(cid);
        if (!mods.isEmpty()) info.put("modifiers", mods);

        if (!cid.getTypeParameters().isEmpty()) {
            info.put("typeParams", cid.getTypeParameters().stream()
                .map(tp -> tp.toString())
                .collect(Collectors.joining(", ")));
            // Collect type parameter bounds
            for (var tp : cid.getTypeParameters()) {
                for (var bound : tp.getTypeBound()) {
                    typeCollector.collectFromType(bound);
                }
            }
        }

        if (!cid.getExtendedTypes().isEmpty()) {
            ClassOrInterfaceType extType = cid.getExtendedTypes().get(0);
            info.put("extends", extType.toString());
            // When an interface extends another type, that target is also an interface
            if (isInterface) {
                typeCollector.addImplementsRef(extType);
            } else {
                // Class extends — the target is a superclass (class, not interface)
                typeCollector.addExtendsRef(extType);
            }
        }

        if (!cid.getImplementedTypes().isEmpty()) {
            info.put("implements", cid.getImplementedTypes().stream()
                .map(t -> t.toString())
                .collect(Collectors.toList()));
            for (ClassOrInterfaceType implType : cid.getImplementedTypes()) {
                typeCollector.addImplementsRef(implType);
            }
        }

        getDocString(cid).ifPresent(doc -> info.put("doc", doc));

        // Constructors (not applicable for interfaces)
        if (!isInterface) {
            List<Map<String, Object>> constructors = new ArrayList<>();
            for (ConstructorDeclaration cd : cid.getConstructors()) {
                if (!isPublicOrProtected(cd)) continue;
                constructors.add(extractMethod(cd));
            }
            if (!constructors.isEmpty()) info.put("constructors", constructors);
        }

        // Methods - for interfaces, all methods are implicitly public
        List<Map<String, Object>> methods = new ArrayList<>();
        for (MethodDeclaration md : cid.getMethods()) {
            // Interface methods are implicitly public
            if (!isInterface && !isPublicOrProtected(md)) continue;
            methods.add(extractMethod(md));
        }
        if (!methods.isEmpty()) info.put("methods", methods);

        // Fields
        List<Map<String, Object>> fields = new ArrayList<>();
        for (FieldDeclaration fd : cid.getFields()) {
            if (!isPublicOrProtected(fd)) continue;
            for (VariableDeclarator vd : fd.getVariables()) {
                fields.add(extractField(fd, vd));
            }
        }
        if (!fields.isEmpty()) info.put("fields", fields);

        return info;
    }

    static Map<String, Object> extractEnum(EnumDeclaration ed) {
        Map<String, Object> info = new LinkedHashMap<>();
        String enumName = ed.getNameAsString();
        info.put("name", enumName);
        addDeprecation(ed, info);

        // Register this enum as a defined type
        typeCollector.addDefinedType(enumName);

        getDocString(ed).ifPresent(doc -> info.put("doc", doc));

        List<String> values = ed.getEntries().stream()
            .map(e -> e.getNameAsString())
            .collect(Collectors.toList());
        if (!values.isEmpty()) info.put("values", values);

        List<Map<String, Object>> methods = new ArrayList<>();
        for (MethodDeclaration md : ed.getMethods()) {
            if (!isPublicOrProtected(md)) continue;
            methods.add(extractMethod(md));
        }
        if (!methods.isEmpty()) info.put("methods", methods);

        return info;
    }

    static Map<String, Object> extractRecord(RecordDeclaration rd) {
        Map<String, Object> info = new LinkedHashMap<>();
        String typeName = rd.getNameAsString();
        info.put("name", typeName);
        info.put("kind", "record");
        addDeprecation(rd, info);

        // Register this type as defined
        typeCollector.addDefinedType(typeName);

        List<String> mods = getModifiers(rd);
        if (!mods.isEmpty()) info.put("modifiers", mods);

        if (!rd.getTypeParameters().isEmpty()) {
            info.put("typeParams", rd.getTypeParameters().stream()
                .map(tp -> tp.toString())
                .collect(Collectors.joining(", ")));
            for (var tp : rd.getTypeParameters()) {
                for (var bound : tp.getTypeBound()) {
                    typeCollector.collectFromType(bound);
                }
            }
        }

        if (!rd.getImplementedTypes().isEmpty()) {
            info.put("implements", rd.getImplementedTypes().stream()
                .map(t -> t.toString())
                .collect(Collectors.toList()));
            for (ClassOrInterfaceType implType : rd.getImplementedTypes()) {
                typeCollector.addImplementsRef(implType);
            }
        }

        getDocString(rd).ifPresent(doc -> info.put("doc", doc));

        // Record components (parameters)
        List<Map<String, Object>> components = new ArrayList<>();
        for (Parameter param : rd.getParameters()) {
            Map<String, Object> comp = new LinkedHashMap<>();
            comp.put("name", param.getNameAsString());
            comp.put("type", param.getTypeAsString());
            typeCollector.collectFromType(param.getType());
            components.add(comp);
        }
        if (!components.isEmpty()) info.put("components", components);

        // Explicit methods (beyond auto-generated accessors)
        List<Map<String, Object>> methods = new ArrayList<>();
        for (MethodDeclaration md : rd.getMethods()) {
            if (!isPublicOrProtected(md)) continue;
            methods.add(extractMethod(md));
        }
        if (!methods.isEmpty()) info.put("methods", methods);

        // Constructors (compact constructors and custom constructors)
        List<Map<String, Object>> constructors = new ArrayList<>();
        for (ConstructorDeclaration cd : rd.getConstructors()) {
            if (!isPublicOrProtected(cd)) continue;
            constructors.add(extractMethod(cd));
        }
        if (!constructors.isEmpty()) info.put("constructors", constructors);

        return info;
    }

    static Map<String, Object> extractAnnotationType(AnnotationDeclaration ad) {
        Map<String, Object> info = new LinkedHashMap<>();
        String typeName = ad.getNameAsString();
        info.put("name", typeName);
        info.put("kind", "annotation");
        addDeprecation(ad, info);

        // Register this type as defined
        typeCollector.addDefinedType(typeName);

        getDocString(ad).ifPresent(doc -> info.put("doc", doc));

        // Annotation members (elements)
        List<Map<String, Object>> members = new ArrayList<>();
        for (BodyDeclaration<?> member : ad.getMembers()) {
            if (member instanceof AnnotationMemberDeclaration amd) {
                Map<String, Object> m = new LinkedHashMap<>();
                m.put("name", amd.getNameAsString());
                m.put("type", amd.getTypeAsString());
                typeCollector.collectFromType(amd.getType());
                if (amd.getDefaultValue().isPresent()) {
                    m.put("default", amd.getDefaultValue().get().toString());
                }
                members.add(m);
            }
        }
        if (!members.isEmpty()) info.put("members", members);

        return info;
    }

    static Map<String, Object> extractMethod(CallableDeclaration<?> cd) {
        Map<String, Object> info = new LinkedHashMap<>();
        info.put("name", cd.getNameAsString());
        addDeprecation(cd, info);

        List<String> mods = getModifiers(cd);
        if (!mods.isEmpty()) info.put("modifiers", mods);

        if (!cd.getTypeParameters().isEmpty()) {
            info.put("typeParams", cd.getTypeParameters().stream()
                .map(tp -> tp.toString())
                .collect(Collectors.joining(", ")));
            // Collect type parameter bounds
            for (var tp : cd.getTypeParameters()) {
                for (var bound : tp.getTypeBound()) {
                    typeCollector.collectFromType(bound);
                }
            }
        }

        // Collect parameter types via AST
        List<Map<String, Object>> paramInfos = new ArrayList<>();
        for (var param : cd.getParameters()) {
            typeCollector.collectFromType(param.getType());
            Map<String, Object> paramInfo = new LinkedHashMap<>();
            paramInfo.put("name", param.getNameAsString());
            paramInfo.put("type", param.getTypeAsString());
            if (param.isVarArgs()) {
                paramInfo.put("varargs", true);
            }
            paramInfos.add(paramInfo);
        }
        if (!paramInfos.isEmpty()) {
            info.put("params", paramInfos);
        }

        String sig = cd.getParameters().stream()
            .map(p -> p.getType().toString() + " " + p.getNameAsString())
            .collect(Collectors.joining(", "));
        info.put("sig", sig);

        if (cd instanceof MethodDeclaration) {
            com.github.javaparser.ast.type.Type retType = ((MethodDeclaration) cd).getType();
            info.put("ret", retType.toString());
            typeCollector.collectFromType(retType);
        }

        if (!cd.getThrownExceptions().isEmpty()) {
            info.put("throws", cd.getThrownExceptions().stream()
                .map(t -> t.toString())
                .collect(Collectors.toList()));
            // Collect thrown exception types
            for (var thrown : cd.getThrownExceptions()) {
                typeCollector.collectFromType(thrown);
            }
        }

        getDocString(cd).ifPresent(doc -> info.put("doc", doc));

        return info;
    }

    static Map<String, Object> extractField(FieldDeclaration fd, VariableDeclarator vd) {
        Map<String, Object> info = new LinkedHashMap<>();
        info.put("name", vd.getNameAsString());
        addDeprecation(fd, info);

        com.github.javaparser.ast.type.Type fieldType = vd.getType();
        info.put("type", fieldType.toString());
        typeCollector.collectFromType(fieldType);

        List<String> mods = getModifiers(fd);
        if (!mods.isEmpty()) info.put("modifiers", mods);

        if (fd.isFinal() && vd.getInitializer().isPresent()) {
            String val = vd.getInitializer().get().toString();
            if (val.length() < 100) info.put("value", val);
        }

        getDocString(fd).ifPresent(doc -> info.put("doc", doc));

        return info;
    }

    static List<String> getModifiers(NodeWithModifiers<?> node) {
        List<String> mods = new ArrayList<>();
        if (node.hasModifier(com.github.javaparser.ast.Modifier.Keyword.PUBLIC)) mods.add("public");
        if (node.hasModifier(com.github.javaparser.ast.Modifier.Keyword.PROTECTED)) mods.add("protected");
        if (node.hasModifier(com.github.javaparser.ast.Modifier.Keyword.STATIC)) mods.add("static");
        if (node.hasModifier(com.github.javaparser.ast.Modifier.Keyword.FINAL)) mods.add("final");
        if (node.hasModifier(com.github.javaparser.ast.Modifier.Keyword.ABSTRACT)) mods.add("abstract");
        return mods;
    }

    static boolean isPublic(TypeDeclaration<?> type) {
        return type.isPublic();
    }

    static boolean isPublicOrProtected(CallableDeclaration<?> cd) {
        return cd.isPublic() || cd.isProtected();
    }

    static boolean isPublicOrProtected(FieldDeclaration fd) {
        return fd.isPublic() || fd.isProtected();
    }

    static Optional<String> getDocString(NodeWithJavadoc<?> node) {
        return node.getJavadoc().map(jd -> {
            String desc = jd.getDescription().toText().trim();
            String firstLine = desc.split("\n")[0].trim();
            if (firstLine.length() > 120) firstLine = firstLine.substring(0, 117) + "...";
            return firstLine.isEmpty() ? null : firstLine;
        });
    }

    static void addDeprecation(NodeWithAnnotations<?> node, Map<String, Object> info) {
        if (node.isAnnotationPresent("Deprecated")) {
            info.put("deprecated", true);
        }
    }

    static String detectPackageName(Path root) throws Exception {
        // Check pom.xml using XML parser for robust parsing
        Path pom = root.resolve("pom.xml");
        if (Files.exists(pom)) {
            try {
                javax.xml.parsers.DocumentBuilderFactory factory =
                    javax.xml.parsers.DocumentBuilderFactory.newInstance();
                // Disable external entities for security
                factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
                javax.xml.parsers.DocumentBuilder builder = factory.newDocumentBuilder();
                org.w3c.dom.Document doc = builder.parse(pom.toFile());
                doc.getDocumentElement().normalize();

                // Find the project-level <artifactId> (not inside <parent>)
                org.w3c.dom.NodeList nodes = doc.getDocumentElement().getChildNodes();
                for (int i = 0; i < nodes.getLength(); i++) {
                    org.w3c.dom.Node node = nodes.item(i);
                    if (node.getNodeType() == org.w3c.dom.Node.ELEMENT_NODE
                        && "artifactId".equals(node.getNodeName())) {
                        String artifactId = node.getTextContent().trim();
                        if (!artifactId.isEmpty()) {
                            return artifactId;
                        }
                    }
                }
            } catch (Exception e) {
                // Fall through to directory name
            }
        }
        return root.getFileName().toString();
    }

    static String formatStubs(Map<String, Object> api) {
        StringBuilder sb = new StringBuilder();
        sb.append("// ").append(api.get("package")).append(" - Public API Surface\n");
        sb.append("// Graphed by PublicApiGraphEngine.Java\n\n");

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> packages = (List<Map<String, Object>>) api.get("packages");

        for (Map<String, Object> pkg : packages) {
            sb.append("package ").append(pkg.get("name")).append(";\n\n");

            formatTypes(sb, pkg, "interfaces", "interface");
            formatTypes(sb, pkg, "classes", "class");
            formatEnums(sb, pkg);
        }

        return sb.toString();
    }

    @SuppressWarnings("unchecked")
    static void formatTypes(StringBuilder sb, Map<String, Object> pkg, String key, String keyword) {
        List<Map<String, Object>> types = (List<Map<String, Object>>) pkg.get(key);
        if (types == null) return;

        for (Map<String, Object> type : types) {
            // Doc
            if (type.get("doc") != null) {
                sb.append("/** ").append(type.get("doc")).append(" */\n");
            }

            // Declaration
            List<String> mods = (List<String>) type.get("modifiers");
            if (mods != null) sb.append(String.join(" ", mods)).append(" ");
            sb.append(keyword).append(" ").append(type.get("name"));
            if (type.get("typeParams") != null) sb.append("<").append(type.get("typeParams")).append(">");
            if (type.get("extends") != null) sb.append(" extends ").append(type.get("extends"));
            List<String> impl = (List<String>) type.get("implements");
            if (impl != null) sb.append(" implements ").append(String.join(", ", impl));
            sb.append(" {\n");

            // Fields
            List<Map<String, Object>> fields = (List<Map<String, Object>>) type.get("fields");
            if (fields != null) {
                for (Map<String, Object> f : fields) {
                    sb.append("    ");
                    List<String> fm = (List<String>) f.get("modifiers");
                    if (fm != null) sb.append(String.join(" ", fm)).append(" ");
                    sb.append(f.get("type")).append(" ").append(f.get("name"));
                    if (f.get("value") != null) sb.append(" = ").append(f.get("value"));
                    sb.append(";\n");
                }
            }

            // Constructors
            List<Map<String, Object>> ctors = (List<Map<String, Object>>) type.get("constructors");
            if (ctors != null) {
                for (Map<String, Object> c : ctors) {
                    formatMethod(sb, type.get("name").toString(), c, true);
                }
            }

            // Methods
            List<Map<String, Object>> methods = (List<Map<String, Object>>) type.get("methods");
            if (methods != null) {
                for (Map<String, Object> m : methods) {
                    formatMethod(sb, m.get("name").toString(), m, false);
                }
            }

            sb.append("}\n\n");
        }
    }

    @SuppressWarnings("unchecked")
    static void formatEnums(StringBuilder sb, Map<String, Object> pkg) {
        List<Map<String, Object>> enums = (List<Map<String, Object>>) pkg.get("enums");
        if (enums == null) return;

        for (Map<String, Object> e : enums) {
            if (e.get("doc") != null) {
                sb.append("/** ").append(e.get("doc")).append(" */\n");
            }
            sb.append("public enum ").append(e.get("name")).append(" {\n");

            List<String> values = (List<String>) e.get("values");
            if (values != null) {
                sb.append("    ").append(String.join(", ", values)).append(";\n");
            }

            List<Map<String, Object>> methods = (List<Map<String, Object>>) e.get("methods");
            if (methods != null) {
                for (Map<String, Object> m : methods) {
                    formatMethod(sb, m.get("name").toString(), m, false);
                }
            }

            sb.append("}\n\n");
        }
    }

    @SuppressWarnings("unchecked")
    static void formatMethod(StringBuilder sb, String name, Map<String, Object> m, boolean isCtor) {
        if (m.get("doc") != null) {
            sb.append("    /** ").append(m.get("doc")).append(" */\n");
        }
        sb.append("    ");
        List<String> mods = (List<String>) m.get("modifiers");
        if (mods != null) sb.append(String.join(" ", mods)).append(" ");
        if (m.get("typeParams") != null) sb.append("<").append(m.get("typeParams")).append("> ");
        if (!isCtor && m.get("ret") != null) sb.append(m.get("ret")).append(" ");
        sb.append(name).append("(").append(m.get("sig")).append(")");
        List<String> thr = (List<String>) m.get("throws");
        if (thr != null) sb.append(" throws ").append(String.join(", ", thr));
        sb.append(";\n");
    }
}
