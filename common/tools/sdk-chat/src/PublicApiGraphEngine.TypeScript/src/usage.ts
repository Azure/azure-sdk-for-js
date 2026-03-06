// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    Project,
    SourceFile,
    Node,
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import type {
    ApiIndex,
    ClassInfo,
    InterfaceInfo,
    MethodInfo,
    PropertyInfo,
    FunctionInfo,
} from "./models.js";
import { baseTypeName, stripImportPrefix } from "./formatter.js";

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
 * Build a variable → client type map for a source file.
 *
 * Tracks patterns:
 *   - const client = new BlobClient(...)           → client maps to BlobClient
 *   - const client: BlobClient = ...               → client maps to BlobClient
 *   - let client: BlobClient                       → client maps to BlobClient
 *   - const client = createBlobClient(...)          → client maps to BlobClient (via function return type map)
 *   - const client = service.getBlobClient(...)     → client maps to BlobClient (via method return type map)
 *   - const blob = storage.blobs                   → client maps to BlobClient (via property type map)
 *
 * All type resolution is driven by API index data — no name-based heuristics.
 */
export function buildVarTypeMap(
    sourceFile: SourceFile,
    clientNames: Set<string>,
    propertyTypeMap: Map<string, string>,
    methodReturnTypeMap: Map<string, string>,
    functionReturnTypeMap: Map<string, string>
): Map<string, string> {
    const varTypes = new Map<string, string>();

    sourceFile.forEachDescendant((node) => {
        // Variable declarations: const client = new BlobClient() / const client: BlobClient = ...
        if (Node.isVariableDeclaration(node)) {
            const nameNode = node.getNameNode();
            if (!Node.isIdentifier(nameNode)) return;
            const varName = nameNode.getText();

            // Check type annotation first: const client: BlobClient
            const typeNode = node.getTypeNode();
            if (typeNode) {
                const typeName = baseTypeName(typeNode.getText());
                if (clientNames.has(typeName)) {
                    varTypes.set(varName, typeName);
                    return;
                }
            }

            // Check initializer
            const initializer = node.getInitializer();
            if (initializer) {
                // new BlobClient(...)
                if (Node.isNewExpression(initializer)) {
                    const exprNode = initializer.getExpression();
                    if (Node.isIdentifier(exprNode)) {
                        const name = exprNode.getText();
                        if (clientNames.has(name)) {
                            varTypes.set(varName, name);
                            return;
                        }
                    }
                    if (Node.isPropertyAccessExpression(exprNode)) {
                        const name = exprNode.getName();
                        if (clientNames.has(name)) {
                            varTypes.set(varName, name);
                            return;
                        }
                    }
                }

                // Call expression: createBlobClient() or service.getBlobClient()
                if (Node.isCallExpression(initializer)) {
                    const callExpr = initializer.getExpression();

                    // Standalone function: createBlobClient(...)
                    if (Node.isIdentifier(callExpr)) {
                        const retType = functionReturnTypeMap.get(callExpr.getText());
                        if (retType) {
                            varTypes.set(varName, retType);
                            return;
                        }
                    }

                    // Method call: service.getBlobClient(...) or BlobClient.create(...)
                    if (Node.isPropertyAccessExpression(callExpr)) {
                        const objExpr = callExpr.getExpression();
                        const calledMethodName = callExpr.getName();

                        // Static factory: BlobClient.create(...)
                        if (Node.isIdentifier(objExpr) && clientNames.has(objExpr.getText())) {
                            const staticKey = `${objExpr.getText()}.${calledMethodName}`;
                            const staticRet = methodReturnTypeMap.get(staticKey);
                            varTypes.set(varName, staticRet ?? objExpr.getText());
                            return;
                        }

                        // Instance method: service.getBlobClient(...)
                        if (Node.isIdentifier(objExpr)) {
                            const receiverType = varTypes.get(objExpr.getText());
                            if (receiverType) {
                                const methodKey = `${baseTypeName(receiverType)}.${calledMethodName}`;
                                const retType = methodReturnTypeMap.get(methodKey);
                                if (retType) {
                                    varTypes.set(varName, retType);
                                    return;
                                }
                            }
                        }
                    }
                }

                // Type assertion: expr as BlobClient
                if (Node.isAsExpression(initializer)) {
                    const asTypeNode = initializer.getTypeNode();
                    if (asTypeNode) {
                        const typeName = baseTypeName(asTypeNode.getText());
                        if (clientNames.has(typeName)) {
                            varTypes.set(varName, typeName);
                            return;
                        }
                    }
                }

                // Property access: const blob = storage.blobs → infer from property type map
                if (Node.isPropertyAccessExpression(initializer)) {
                    const objExpr = initializer.getExpression();
                    if (Node.isIdentifier(objExpr)) {
                        const sourceVar = objExpr.getText();
                        const sourceType = varTypes.get(sourceVar);
                        if (sourceType) {
                            const propName = initializer.getName();
                            const propKey = `${baseTypeName(sourceType)}.${propName}`;
                            const propType = propertyTypeMap.get(propKey);
                            if (propType) {
                                varTypes.set(varName, propType);
                                return;
                            }
                        }
                    }
                }
            }
        }

        // Property/field assignments: this.client = new BlobClient(...)
        if (Node.isPropertyDeclaration(node)) {
            const nameNode = node.getNameNode();
            if (Node.isIdentifier(nameNode)) {
                const propName = nameNode.getText();
                const typeNode = node.getTypeNode();
                if (typeNode) {
                    const typeName = baseTypeName(typeNode.getText());
                    if (clientNames.has(typeName)) {
                        varTypes.set(propName, typeName);
                        return;
                    }
                }
                const declInit = node.getInitializer();
                if (declInit && Node.isNewExpression(declInit)) {
                    const exprNode = declInit.getExpression();
                    if (Node.isIdentifier(exprNode)) {
                        const name = exprNode.getText();
                        if (clientNames.has(name)) {
                            varTypes.set(propName, name);
                        }
                    }
                }
            }
        }
    });

    return varTypes;
}

/**
 * Unwrap async wrapper types from a TypeScript return type string.
 * E.g., "Promise<BlobClient>" → "BlobClient", "Promise<Map<K, V>>" → "Map<K, V>".
 * Uses bracket-depth matching to correctly handle nested generics.
 */
export function unwrapAsyncReturnType(returnType: string): string {
    const wrappers = ["Promise", "PromiseLike", "AsyncIterable", "AsyncIterableIterator"];
    for (const wrapper of wrappers) {
        if (returnType.startsWith(wrapper + "<")) {
            // Find the matching closing bracket using depth tracking
            let depth = 0;
            for (let i = wrapper.length; i < returnType.length; i++) {
                if (returnType[i] === "<") depth++;
                else if (returnType[i] === ">") {
                    depth--;
                    if (depth === 0) {
                        // Only unwrap if the closing bracket is at the end
                        if (i === returnType.length - 1) {
                            return returnType.slice(wrapper.length + 1, i);
                        }
                        break;
                    }
                }
            }
        }
    }
    return returnType;
}

/**
 * Build a map of (OwnerType.methodName) → return type from API method data.
 * Uses actual method return types from the API index for precise resolution.
 */
export function buildMethodReturnTypeMap(
    usageClasses: ClassInfo[],
    usageInterfaces: InterfaceInfo[],
    clientMethods: Map<string, Set<string>>
): Map<string, string> {
    const map = new Map<string, string>();
    for (const cls of usageClasses) {
        for (const method of cls.methods || []) {
            if (method.ret) {
                const returnType = baseTypeName(unwrapAsyncReturnType(method.ret));
                if (clientMethods.has(returnType)) {
                    map.set(`${cls.name}.${method.name}`, returnType);
                }
            }
        }
    }
    for (const iface of usageInterfaces) {
        for (const method of iface.methods || []) {
            if (method.ret) {
                const returnType = baseTypeName(unwrapAsyncReturnType(method.ret));
                if (clientMethods.has(returnType)) {
                    map.set(`${iface.name}.${method.name}`, returnType);
                }
            }
        }
    }
    return map;
}

/**
 * Build a map of functionName → return type from API function data.
 * For module-level functions that return client types.
 */
export function buildFunctionReturnTypeMap(
    api: ApiIndex,
    clientMethods: Map<string, Set<string>>
): Map<string, string> {
    const map = new Map<string, string>();
    for (const mod of api.modules) {
        for (const func of mod.functions || []) {
            if (func.ret) {
                const returnType = baseTypeName(unwrapAsyncReturnType(func.ret));
                if (clientMethods.has(returnType)) {
                    map.set(func.name, returnType);
                }
            }
        }
    }
    return map;
}

/**
 * Build a map of (OwnerType.propertyName) → client type name from API property data.
 * Uses actual property return types from the API index for precise resolution.
 */
export function buildPropertyTypeMap(
    usageClasses: ClassInfo[],
    usageInterfaces: InterfaceInfo[],
    clientMethods: Map<string, Set<string>>
): Map<string, string> {
    const map = new Map<string, string>();
    for (const cls of usageClasses) {
        for (const prop of cls.properties || []) {
            const returnType = baseTypeName(prop.type);
            if (clientMethods.has(returnType)) {
                map.set(`${cls.name}.${prop.name}`, returnType);
            }
        }
    }
    for (const iface of usageInterfaces) {
        for (const prop of iface.properties || []) {
            const returnType = baseTypeName(prop.type);
            if (clientMethods.has(returnType)) {
                map.set(`${iface.name}.${prop.name}`, returnType);
            }
        }
    }
    return map;
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

    const covered: CoveredOp[] = [];
    const seenOps: Set<string> = new Set();
    const patterns: Set<string> = new Set();
    let fileCount = 0;

    // Build set of known client type names for local type inference
    const clientNames = new Set(clientMethods.keys());

    // Expand clientNames to include container types — reachable classes that
    // have properties pointing to client types (e.g., EmptyClient with widgets: WidgetClient)
    const allReachableClasses = allClasses.filter(cls => reachable.has(cls.name));
    for (const cls of allReachableClasses) {
        if (clientNames.has(cls.name)) continue;
        for (const prop of cls.properties || []) {
            const propType = baseTypeName(prop.type);
            if (clientMethods.has(propType)) {
                clientNames.add(cls.name);
                break;
            }
        }
    }

    // Build property type map from API data for precise subclient resolution
    // Use all reachable classes (not just usageClasses) so container types are included
    const propertyTypeMap = buildPropertyTypeMap(allReachableClasses, usageInterfaces, clientMethods);

    // Build method and function return type maps from API data for precise factory/getter resolution
    const methodReturnTypeMap = buildMethodReturnTypeMap(usageClasses, usageInterfaces, clientMethods);
    const functionReturnTypeMap = buildFunctionReturnTypeMap(api, clientMethods);

    // Create a project for parsing samples
    const project = new Project({
        compilerOptions: { allowJs: true, noEmit: true },
        skipFileDependencyResolution: true,
    });

    // Find all TS/JS files in samples
    const files = findFiles(samplesPath, [".ts", ".js", ".mjs", ".tsx", ".jsx"])
        .filter(f => !f.includes("node_modules") && !f.includes("/dist/") && !f.endsWith(".d.ts"));

    for (const filePath of files) {
        fileCount++;

        try {
            const sourceFile = project.addSourceFileAtPath(filePath);
            const relPath = path.relative(samplesPath, filePath);

            // Build variable → client type map for this file
            const varTypes = buildVarTypeMap(sourceFile, clientNames, propertyTypeMap, methodReturnTypeMap, functionReturnTypeMap);

            // Use ts-morph to find all call expressions
            sourceFile.forEachDescendant((node) => {
                if (Node.isCallExpression(node)) {
                    const expr = node.getExpression();
                    if (Node.isPropertyAccessExpression(expr)) {
                        const methodName = expr.getName();
                        const line = node.getStartLineNumber();

                        // Strategy 1: Resolve receiver type from local variable tracking
                        let resolvedClient: string | undefined;
                        const receiver = expr.getExpression();
                        if (Node.isIdentifier(receiver)) {
                            const varType = varTypes.get(receiver.getText());
                            if (varType && clientMethods.has(varType)) {
                                const methods = clientMethods.get(varType)!;
                                if (methods.has(methodName)) {
                                    resolvedClient = varType;
                                }
                            }
                        } else if (Node.isPropertyAccessExpression(receiver)) {
                            // Strategy 1c: Field access — obj.field.method()
                            const propName = receiver.getName();
                            const propExpr = receiver.getExpression();
                            if (Node.isIdentifier(propExpr)) {
                                const objType = varTypes.get(propExpr.getText());
                                if (objType) {
                                    const propKey = `${baseTypeName(objType)}.${propName}`;
                                    const fieldType = propertyTypeMap.get(propKey);
                                    if (fieldType && clientMethods.has(fieldType)) {
                                        const methods = clientMethods.get(fieldType)!;
                                        if (methods.has(methodName)) {
                                            resolvedClient = fieldType;
                                        }
                                    }
                                }
                            }
                            // Fallback: check varTypes for the property name directly
                            if (!resolvedClient) {
                                const varType = varTypes.get(propName);
                                if (varType && clientMethods.has(varType)) {
                                    const methods = clientMethods.get(varType)!;
                                    if (methods.has(methodName)) {
                                        resolvedClient = varType;
                                    }
                                }
                            }
                        } else if (Node.isCallExpression(receiver)) {
                            // getClient().method() - resolve return type from API data
                            const innerExpr = receiver.getExpression();

                            if (Node.isIdentifier(innerExpr)) {
                                // Standalone function: createClient().method()
                                const retType = functionReturnTypeMap.get(innerExpr.getText());
                                if (retType && clientMethods.has(retType)) {
                                    const methods = clientMethods.get(retType)!;
                                    if (methods.has(methodName)) {
                                        resolvedClient = retType;
                                    }
                                }
                            } else if (Node.isPropertyAccessExpression(innerExpr)) {
                                // Instance method: service.getClient().method()
                                const chainedObj = innerExpr.getExpression();
                                const chainedMethodName = innerExpr.getName();

                                // Static factory: ClientType.create().method()
                                if (Node.isIdentifier(chainedObj) && clientNames.has(chainedObj.getText())) {
                                    const staticKey = `${chainedObj.getText()}.${chainedMethodName}`;
                                    const retType = methodReturnTypeMap.get(staticKey) ?? chainedObj.getText();
                                    if (clientMethods.has(retType)) {
                                        const methods = clientMethods.get(retType)!;
                                        if (methods.has(methodName)) {
                                            resolvedClient = retType;
                                        }
                                    }
                                } else if (Node.isIdentifier(chainedObj)) {
                                    // service.getClient().method()
                                    const receiverType = varTypes.get(chainedObj.getText());
                                    if (receiverType) {
                                        const methodKey = `${baseTypeName(receiverType)}.${chainedMethodName}`;
                                        const retType = methodReturnTypeMap.get(methodKey);
                                        if (retType && clientMethods.has(retType)) {
                                            const methods = clientMethods.get(retType)!;
                                            if (methods.has(methodName)) {
                                                resolvedClient = retType;
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

            project.removeSourceFile(sourceFile);
        } catch {
            // Skip files that can't be parsed
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


