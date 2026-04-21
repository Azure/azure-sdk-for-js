// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    Project,
    SourceFile,
    Node,
    ts,
} from "ts-morph";
import type { Type } from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import type {
    ApiIndex,
    ClassInfo,
    InterfaceInfo,
} from "./models.js";
import { baseTypeName } from "./formatter.js";
import { emitDiagnostic } from "./diagnostics.js";

export interface UsageResult {
    file_count: number;
    covered: CoveredOp[];
    uncovered: UncoveredOp[];
    patterns: string[];
}

export interface CoveredOp {
    client: string;
    method: string;
    file: string;
    line: number;
}

export interface UncoveredOp {
    client: string;
    method: string;
    sig: string;
}

/**
 * Extract the canonical type name from a ts-morph Type.
 * Unwraps Promise/async wrappers and returns the symbol name.
 */
export function getCanonicalTypeName(type: Type): string | undefined {
    const unwrapped = unwrapPromiseType(type);
    const symbol = unwrapped.getSymbol() ?? unwrapped.getAliasSymbol();
    if (symbol) {
        const name = symbol.getName();
        // Skip anonymous/internal type names
        if (name && name !== "__type" && name !== "default") {
            return name;
        }
    }
    return undefined;
}

/**
 * Unwrap async wrapper types (Promise, PromiseLike, etc.) from a ts-morph Type.
 * E.g., Promise<BlobClient> → BlobClient.
 */
export function unwrapPromiseType(type: Type): Type {
    const symbol = type.getSymbol();
    const name = symbol?.getName();
    const asyncWrappers = ["Promise", "PromiseLike", "AsyncIterable", "AsyncIterableIterator"];
    if (name && asyncWrappers.includes(name)) {
        const typeArgs = type.getTypeArguments();
        if (typeArgs.length >= 1) {
            return typeArgs[0];
        }
    }
    return type;
}

/**
 * Extract the class name from a `new X()` expression's AST.
 * Returns e.g. "DataClient" for `new DataClient()`.
 */
function extractNewExprClassName(node: Node): string | undefined {
    if (!Node.isVariableDeclaration(node)) return undefined;
    const init = node.getInitializer();
    if (!init || !Node.isNewExpression(init)) return undefined;
    const expr = init.getExpression();
    if (Node.isIdentifier(expr)) return expr.getText();
    return undefined;
}

/**
 * Extract the property access receiver variable and property name from
 * a variable initializer like `const x = y.prop`.
 */
function extractPropertyAccess(node: Node): { receiverName: string; propName: string } | undefined {
    if (!Node.isVariableDeclaration(node)) return undefined;
    const init = node.getInitializer();
    if (!init || !Node.isPropertyAccessExpression(init)) return undefined;
    const receiver = init.getExpression();
    if (!Node.isIdentifier(receiver)) return undefined;
    return { receiverName: receiver.getText(), propName: init.getName() };
}

/**
 * Extract the function name from a bare call expression initializer like `const x = foo()`.
 */
function extractCallExprFuncName(node: Node): string | undefined {
    if (!Node.isVariableDeclaration(node)) return undefined;
    const init = node.getInitializer();
    // Handle `await foo()` — unwrap the await expression
    let callExpr = init;
    if (callExpr && Node.isAwaitExpression(callExpr)) {
        callExpr = callExpr.getExpression();
    }
    if (!callExpr || !Node.isCallExpression(callExpr)) return undefined;
    const expr = callExpr.getExpression();
    if (Node.isIdentifier(expr)) return expr.getText();
    return undefined;
}

export interface ApiTypeContext {
    /** Known type names from the API index (class & interface names) */
    allTypeNames: Set<string>;
    /** typeName → (propertyName → propertyTypeName) */
    propertyTypes: Map<string, Map<string, string>>;
    /** functionName → returnTypeName */
    functionReturnTypes: Map<string, string>;
}

/**
 * Build a variable → type name map for a source file using the TypeScript type checker,
 * with AST-based fallback for cases where the type checker can't resolve types
 * (e.g., when sample files reference types not available in node_modules).
 *
 * The type checker handles all inference patterns automatically when types are available:
 *   - new X(), type annotations, factory returns, property chains
 *   - destructuring, callbacks, closures, generic inference
 *   - as-assertions, import aliases, optional chaining
 *
 * Fallback patterns (AST-based, used when type checker returns undefined):
 *   - `new X()` → variable type is X (if X is a known API type)
 *   - `y.prop` → variable type from API property definitions
 *   - `func()` → variable type from API function return types
 */
export function buildVarTypeMap(sourceFile: SourceFile, apiContext?: ApiTypeContext): Map<string, string> {
    const varTypes = new Map<string, string>();

    sourceFile.forEachDescendant((node) => {
        if (Node.isVariableDeclaration(node) || Node.isParameterDeclaration(node)) {
            const name = node.getName();
            if (name) {
                // Try the type checker first
                try {
                    const type = node.getType();
                    const typeName = getCanonicalTypeName(type);
                    if (typeName && (!apiContext || apiContext.allTypeNames.has(typeName))) {
                        varTypes.set(name, typeName);
                        return;
                    }
                } catch (err: unknown) {
                    emitDiagnostic({
                        code: "TYPE_RESOLVE_SKIP",
                        message: `Type resolution failed for variable "${name}": ${err instanceof Error ? err.message : String(err)}`,
                        severity: "warning",
                        target: name,
                    });
                }

                // AST fallback: `new X()` pattern
                if (apiContext && Node.isVariableDeclaration(node)) {
                    const className = extractNewExprClassName(node);
                    if (className && apiContext.allTypeNames.has(className)) {
                        varTypes.set(name, className);
                        return;
                    }

                    // AST fallback: `func()` pattern — check function return types
                    const funcName = extractCallExprFuncName(node);
                    if (funcName) {
                        const retType = apiContext.functionReturnTypes.get(funcName);
                        if (retType && apiContext.allTypeNames.has(retType)) {
                            varTypes.set(name, retType);
                            return;
                        }
                    }
                }
            }
        }

        if (Node.isPropertyDeclaration(node)) {
            const nameNode = node.getNameNode();
            if (Node.isIdentifier(nameNode)) {
                try {
                    const type = node.getType();
                    const typeName = getCanonicalTypeName(type);
                    if (typeName) varTypes.set(nameNode.getText(), typeName);
                } catch (err: unknown) {
                    emitDiagnostic({
                        code: "TYPE_RESOLVE_SKIP",
                        message: `Type resolution failed for property "${nameNode.getText()}": ${err instanceof Error ? err.message : String(err)}`,
                        severity: "warning",
                        target: nameNode.getText(),
                    });
                }
            }
        }
    });

    // Second pass: resolve property access patterns using already-resolved variable types
    // e.g., `const blob = storage.blobs` where storage → StorageClient and blobs → BlobClient
    if (apiContext) {
        sourceFile.forEachDescendant((node) => {
            if (Node.isVariableDeclaration(node)) {
                const name = node.getName();
                if (name && !varTypes.has(name)) {
                    const propAccess = extractPropertyAccess(node);
                    if (propAccess) {
                        const receiverType = varTypes.get(propAccess.receiverName);
                        if (receiverType) {
                            const props = apiContext.propertyTypes.get(receiverType);
                            if (props) {
                                const propType = props.get(propAccess.propName);
                                if (propType && apiContext.allTypeNames.has(propType)) {
                                    varTypes.set(name, propType);
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    return varTypes;
}

export function analyzeUsage(samplesPath: string, api: ApiIndex): UsageResult {
    const allClasses: ClassInfo[] = [];
    const allInterfaces: InterfaceInfo[] = [];
    const allTypeNames = new Set<string>();
    const interfaceNames = new Set<string>();

    for (const mod of api.modules) {
        for (const cls of mod.classes || []) {
            allClasses.push(cls);
            allTypeNames.add(cls.name);
        }
        for (const iface of mod.interfaces || []) {
            allInterfaces.push(iface);
            interfaceNames.add(iface.name);
            allTypeNames.add(iface.name);
        }
    }

    const interfaceImplementers = new Map<string, ClassInfo[]>();
    for (const cls of allClasses) {
        for (const iface of cls.implements || []) {
            const ifaceName = baseTypeName(iface);
            const list = interfaceImplementers.get(ifaceName) ?? [];
            list.push(cls);
            interfaceImplementers.set(ifaceName, list);
        }
    }

    const interfacesByName = new Map<string, InterfaceInfo>();
    for (const iface of allInterfaces) {
        if (!interfacesByName.has(iface.name)) {
            interfacesByName.set(iface.name, iface);
        }
    }

    const references = new Map<string, Set<string>>();
    for (const cls of allClasses) {
        references.set(cls.name, getReferencedTypes(cls, allTypeNames));
    }
    for (const iface of allInterfaces) {
        references.set(iface.name, getReferencedTypesForInterface(iface, allTypeNames));
    }

    const referencedBy = new Map<string, number>();
    for (const [typeName, refs] of references) {
        for (const target of refs) {
            if (target !== typeName) { // Skip self-references
                referencedBy.set(target, (referencedBy.get(target) ?? 0) + 1);
            }
        }
    }

    const operationTypes = new Set<string>();
    for (const cls of allClasses) {
        if ((cls.methods?.length ?? 0) > 0) {
            operationTypes.add(cls.name);
        }
    }
    for (const iface of allInterfaces) {
        if ((iface.methods?.length ?? 0) > 0) {
            operationTypes.add(iface.name);
        }
    }

    // Root classes: entry points (from package exports) with methods, or unreferenced types with operations
    let rootClasses = allClasses.filter((cls) => {
        const hasOperations = (cls.methods?.length ?? 0) > 0;
        const refs = references.get(cls.name);
        const referencesOperations = refs ? Array.from(refs).some((r) => operationTypes.has(r)) : false;
        return (cls.entryPoint && hasOperations) || (!referencedBy.has(cls.name) && (hasOperations || referencesOperations));
    });

    if (rootClasses.length === 0) {
        rootClasses = allClasses.filter((cls) => {
            const hasOperations = (cls.methods?.length ?? 0) > 0;
            const refs = references.get(cls.name);
            const referencesOperations = refs ? Array.from(refs).some((r) => operationTypes.has(r)) : false;
            return hasOperations || referencesOperations;
        });
    }

    const reachable = new Set<string>();
    const queue: string[] = [];

    for (const cls of rootClasses) {
        if (!reachable.has(cls.name)) {
            reachable.add(cls.name);
            queue.push(cls.name);
        }
    }

    let qi = 0;
    while (qi < queue.length) {
        const current = queue[qi++];
        const refs = references.get(current);
        if (refs) {
            for (const ref of refs) {
                if (!reachable.has(ref)) {
                    reachable.add(ref);
                    queue.push(ref);
                }
            }
        }

        if (interfaceNames.has(current)) {
            for (const impl of interfaceImplementers.get(current) ?? []) {
                if (!reachable.has(impl.name)) {
                    reachable.add(impl.name);
                    queue.push(impl.name);
                }
            }
        }
    }

    const usageClasses = allClasses.filter(
        (cls) => reachable.has(cls.name) && (cls.methods?.length ?? 0) > 0
    );

    const usageInterfaces = allInterfaces.filter(
        (iface) => reachable.has(iface.name) && (iface.methods?.length ?? 0) > 0
    );

    // Build map of client methods from API
    const clientMethods: Map<string, Set<string>> = new Map();

    for (const cls of usageClasses) {
        const methods = new Set<string>();
        for (const method of cls.methods || []) {
            methods.add(method.name);
        }
        if (methods.size > 0) {
            if (!clientMethods.has(cls.name)) {
                clientMethods.set(cls.name, methods);
            }
        }
    }

    for (const iface of usageInterfaces) {
        const methods = new Set<string>();
        for (const method of iface.methods || []) {
            methods.add(method.name);
        }
        if (methods.size > 0) {
            if (!clientMethods.has(iface.name)) {
                clientMethods.set(iface.name, methods);
            }
        }
    }

    if (clientMethods.size === 0) {
        return { file_count: 0, covered: [], uncovered: [], patterns: [] };
    }

    // Build API type context for AST-based fallback inference
    const propertyTypes = new Map<string, Map<string, string>>();
    for (const cls of allClasses) {
        if (cls.properties && cls.properties.length > 0) {
            const props = new Map<string, string>();
            for (const prop of cls.properties) {
                props.set(prop.name, baseTypeName(prop.type));
            }
            propertyTypes.set(cls.name, props);
        }
    }
    for (const iface of allInterfaces) {
        if (iface.properties && iface.properties.length > 0) {
            const props = new Map<string, string>();
            for (const prop of iface.properties) {
                props.set(prop.name, baseTypeName(prop.type));
            }
            if (!propertyTypes.has(iface.name)) {
                propertyTypes.set(iface.name, props);
            }
        }
    }

    const functionReturnTypes = new Map<string, string>();
    for (const mod of api.modules) {
        for (const func of mod.functions || []) {
            if (func.ret) {
                functionReturnTypes.set(func.name, baseTypeName(func.ret));
            }
        }
        for (const ns of mod.namespaces || []) {
            for (const func of ns.functions || []) {
                if (func.ret) {
                    functionReturnTypes.set(func.name, baseTypeName(func.ret));
                }
            }
        }
    }

    const apiContext: ApiTypeContext = {
        allTypeNames,
        propertyTypes,
        functionReturnTypes,
    };

    const covered: CoveredOp[] = [];
    const seenOps: Set<string> = new Set();
    const patterns: Set<string> = new Set();
    let fileCount = 0;

    // Create a project for parsing samples — no skipFileDependencyResolution
    // so the type checker can resolve imported types via node_modules.
    const project = new Project({
        compilerOptions: {
            allowJs: true,
            noEmit: true,
            strict: false,
            skipLibCheck: true,
            target: ts.ScriptTarget.ES2022,
            module: ts.ModuleKind.NodeNext,
            moduleResolution: ts.ModuleResolutionKind.NodeNext,
        },
    });

    // Find all TS/JS files in samples
    const files = findFiles(samplesPath, [".ts", ".js", ".mjs", ".tsx", ".jsx"])
        .filter(f => !f.includes("node_modules") && !f.includes("/dist/") && !f.endsWith(".d.ts"));

    for (const filePath of files) {
        fileCount++;

        let sourceFile: ReturnType<typeof project.addSourceFileAtPath> | undefined;
        try {
            sourceFile = project.addSourceFileAtPath(filePath);
            const relPath = path.relative(samplesPath, filePath);

            // Build variable → type map using the type checker with AST fallback
            const varTypes = buildVarTypeMap(sourceFile, apiContext);

            // Use ts-morph to find all call expressions
            sourceFile.forEachDescendant((node) => {
                if (Node.isCallExpression(node)) {
                    const expr = node.getExpression();
                    if (Node.isPropertyAccessExpression(expr)) {
                        const methodName = expr.getName();
                        const line = node.getStartLineNumber();

                        let resolvedClient: string | undefined;

                        // Use the type checker to resolve the receiver type
                        const receiver = expr.getExpression();
                        try {
                            const receiverType = receiver.getType();
                            const typeName = getCanonicalTypeName(receiverType);
                            if (typeName && clientMethods.has(typeName)) {
                                const methods = clientMethods.get(typeName)!;
                                if (methods.has(methodName)) {
                                    resolvedClient = typeName;
                                }
                            }
                        } catch (err: unknown) {
                            emitDiagnostic({
                                code: "TYPE_RESOLVE_SKIP",
                                message: `Type resolution failed for receiver of "${methodName}": ${err instanceof Error ? err.message : String(err)}`,
                                severity: "warning",
                                target: methodName,
                            });
                        }

                        // Fallback: check varTypes map for identifier receivers
                        if (!resolvedClient && Node.isIdentifier(receiver)) {
                            const varType = varTypes.get(receiver.getText());
                            if (varType && clientMethods.has(varType)) {
                                const methods = clientMethods.get(varType)!;
                                if (methods.has(methodName)) {
                                    resolvedClient = varType;
                                }
                            }
                        }

                        // Fallback: direct property chain like `client.widgets.listWidgets()`
                        if (!resolvedClient && Node.isPropertyAccessExpression(receiver)) {
                            const chainPropName = receiver.getName();
                            const chainReceiver = receiver.getExpression();
                            if (Node.isIdentifier(chainReceiver)) {
                                const chainReceiverType = varTypes.get(chainReceiver.getText());
                                if (chainReceiverType) {
                                    const props = propertyTypes.get(chainReceiverType);
                                    if (props) {
                                        const propType = props.get(chainPropName);
                                        if (propType && clientMethods.has(propType)) {
                                            const methods = clientMethods.get(propType)!;
                                            if (methods.has(methodName)) {
                                                resolvedClient = propType;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (resolvedClient) {
                            const key = `${resolvedClient}.${methodName}`;
                            if (!seenOps.has(key)) {
                                seenOps.add(key);
                                covered.push({ client: resolvedClient, method: methodName, file: relPath, line });
                            }
                        }
                    }
                }
            });

            // Detect patterns
            detectPatterns(sourceFile, patterns);
        } catch (err: unknown) {
            const relPath = path.relative(samplesPath, filePath);
            emitDiagnostic({
                code: "USAGE_ANALYSIS_SKIP",
                message: `Failed to analyse file: ${err instanceof Error ? err.message : String(err)}`,
                severity: "warning",
                target: relPath,
            });
        } finally {
            if (sourceFile) {
                project.removeSourceFile(sourceFile);
            }
        }
    }

    // Build bidirectional interface ↔ implementation mapping for coverage cross-referencing
    const ifaceToImplNames = new Map<string, string[]>();
    const implToIfaceNames = new Map<string, string[]>();
    for (const cls of allClasses) {
        for (const iface of cls.implements || []) {
            const ifaceName = baseTypeName(iface);
            const impls = ifaceToImplNames.get(ifaceName) ?? [];
            impls.push(cls.name);
            ifaceToImplNames.set(ifaceName, impls);

            const ifaces = implToIfaceNames.get(cls.name) ?? [];
            ifaces.push(ifaceName);
            implToIfaceNames.set(cls.name, ifaces);
        }
    }

    // Build uncovered list with interface/implementation cross-referencing
    const uncovered: UncoveredOp[] = [];
    for (const [clientName, methods] of clientMethods) {
        for (const method of methods) {
            const key = `${clientName}.${method}`;
            if (seenOps.has(key)) {
                continue;
            }

            // Check if covered through an interface/implementation relationship
            let coveredViaRelated = false;

            // If this is an implementation, check if any of its interfaces has the method covered
            const implementedIfaces = implToIfaceNames.get(clientName);
            if (implementedIfaces) {
                coveredViaRelated = implementedIfaces.some(
                    (iface) => seenOps.has(`${iface}.${method}`),
                );
            }

            // If this is an interface, check if any implementation has the method covered
            if (!coveredViaRelated) {
                const implementations = ifaceToImplNames.get(clientName);
                if (implementations) {
                    coveredViaRelated = implementations.some(
                        (impl) => seenOps.has(`${impl}.${method}`),
                    );
                }
            }

            if (!coveredViaRelated) {
                uncovered.push({
                    client: clientName,
                    method,
                    sig: `${method}(...)`,
                });
            }
        }
    }

    return {
        file_count: fileCount,
        covered,
        uncovered,
        patterns: Array.from(patterns).sort(),
    };
}

export function getReferencedTypes(cls: ClassInfo, allTypeNames: Set<string>): Set<string> {
    return new Set((cls.referencedTypes ?? []).filter(t => allTypeNames.has(t)));
}

export function getReferencedTypesForInterface(iface: InterfaceInfo, allTypeNames: Set<string>): Set<string> {
    return new Set((iface.referencedTypes ?? []).filter(t => allTypeNames.has(t)));
}

export function detectPatterns(sourceFile: SourceFile, patterns: Set<string>): void {
    // Detect patterns using purely structural AST analysis — no keyword matching
    sourceFile.forEachDescendant((node) => {
        if (Node.isAwaitExpression(node)) {
            patterns.add("async");
        }
        if (Node.isTryStatement(node)) {
            patterns.add("error-handling");
        }
        if (Node.isForOfStatement(node) && node.isAwaited()) {
            patterns.add("streaming");
        }
    });
}

export function findFiles(dir: string, extensions: string[]): string[] {
    const results: string[] = [];

    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findFiles(fullPath, extensions));
        } else if (extensions.some(ext => entry.name.endsWith(ext))) {
            results.push(fullPath);
        }
    }
    return results;
}


