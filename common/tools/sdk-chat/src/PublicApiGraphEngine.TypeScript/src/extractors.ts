// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    SourceFile,
    ClassDeclaration,
    InterfaceDeclaration,
    FunctionDeclaration,
    TypeAliasDeclaration,
    EnumDeclaration,
    MethodDeclaration,
    PropertyDeclaration,
    ConstructorDeclaration,
    ParameterDeclaration,
    IndexSignatureDeclaration,
    JSDocableNode,
    Node,
    Type,
    TypeNode,
    ts,
} from "ts-morph";
import type {
    MethodInfo,
    PropertyInfo,
    IndexSignatureInfo,
    ConstructorInfo,
    ParameterInfo,
    ClassInfo,
    InterfaceInfo,
    EnumInfo,
    TypeAliasInfo,
    FunctionInfo,
    ModuleInfo,
} from "./models.js";
import type { ExtractionContext } from "./context.js";
import { displayType, stripImportPrefix } from "./formatter.js";

// ============================================================================
// Engine Functions
// ============================================================================

export function getDocString(node: JSDocableNode): string | undefined {
    const jsDocs = node.getJsDocs();
    if (!jsDocs?.length) return undefined;

    const comment = jsDocs[0].getComment();
    if (!comment) return undefined;

    const text =
        typeof comment === "string"
            ? comment
            : comment.filter((c): c is NonNullable<typeof c> => c != null)
                .map((c) => (typeof c === "string" ? c : c.getText()))
                .join("");

    const firstLine = text.split("\n")[0].trim();
    return firstLine.length > 120 ? firstLine.substring(0, 117) + "..." : firstLine;
}

// ============================================================================
// Phase 4: Type-safe node accessors — eliminate `as any` casts
// ============================================================================

/**
 * Safely get the type from a declaration node using ts-morph type guards.
 * Replaces `(decl as any).getType?.()` patterns.
 */
export function getTypeFromDeclaration(decl: Node): Type | undefined {
    if (Node.isParameterDeclaration(decl)) return decl.getType();
    if (Node.isPropertyDeclaration(decl)) return decl.getType();
    if (Node.isPropertySignature(decl)) return decl.getType();
    if (Node.isVariableDeclaration(decl)) return decl.getType();
    if (Node.isTypeAliasDeclaration(decl)) return decl.getType();
    if (Node.isMethodDeclaration(decl)) return decl.getReturnType();
    if (Node.isMethodSignature(decl)) return decl.getReturnType();
    if (Node.isGetAccessorDeclaration(decl)) return decl.getReturnType();
    if (Node.isSetAccessorDeclaration(decl)) return decl.getParameters()[0]?.getType();
    if (Node.isFunctionDeclaration(decl)) return decl.getReturnType();
    if (Node.isClassDeclaration(decl)) return decl.getType();
    if (Node.isInterfaceDeclaration(decl)) return decl.getType();
    if (Node.isEnumDeclaration(decl)) return decl.getType();
    if (Node.isIndexSignatureDeclaration(decl)) return decl.getReturnType();
    return undefined;
}

/**
 * Safely get parameters from a declaration node using ts-morph type guards.
 * Replaces `(decl as any).getParameters?.()` patterns.
 */
export function getParametersFromDeclaration(decl: Node): ParameterDeclaration[] {
    if (Node.isMethodDeclaration(decl)) return decl.getParameters();
    if (Node.isMethodSignature(decl)) return decl.getParameters();
    if (Node.isFunctionDeclaration(decl)) return decl.getParameters();
    if (Node.isConstructorDeclaration(decl)) return decl.getParameters();
    if (Node.isGetAccessorDeclaration(decl)) return decl.getParameters();
    if (Node.isSetAccessorDeclaration(decl)) return decl.getParameters();
    return [];
}

/**
 * Safely get the return type from a declaration node using ts-morph type guards.
 * Replaces `(decl as any).getReturnType?.()` patterns.
 */
export function getReturnTypeFromDeclaration(decl: Node): Type | undefined {
    if (Node.isMethodDeclaration(decl)) return decl.getReturnType();
    if (Node.isMethodSignature(decl)) return decl.getReturnType();
    if (Node.isFunctionDeclaration(decl)) return decl.getReturnType();
    if (Node.isConstructorDeclaration(decl)) return decl.getReturnType();
    if (Node.isGetAccessorDeclaration(decl)) return decl.getReturnType();
    if (Node.isIndexSignatureDeclaration(decl)) return decl.getReturnType();
    return undefined;
}

/**
 * Checks if a node has @internal or @hidden JSDoc tags, indicating it should be excluded
 * from the public API surface.
 */
export function hasInternalOrHiddenTag(node: JSDocableNode): boolean {
    const jsDocs = node.getJsDocs();
    if (!jsDocs?.length) return false;

    for (const jsDoc of jsDocs) {
        for (const tag of jsDoc.getTags()) {
            const tagName = tag.getTagName();
            if (tagName === "internal" || tagName === "hidden") {
                return true;
            }
        }
    }
    return false;
}

export function formatParameter(p: ParameterDeclaration, ctx: ExtractionContext): string {
    let sig = p.getName();
    if (p.isOptional()) sig += "?";
    const type = p.getType();
    const typeNode = p.getTypeNode();
    const typeText = displayType(typeNode, type, p, ctx.namespaceAliases);
    if (typeText && typeText !== "any") {
        sig += `: ${typeText}`;
        // Collect type reference for dependency tracking
        ctx.typeRefs.collectFromType(type);
        // Also collect from TypeNode to catch simple type aliases resolved away by TS
        if (typeNode) ctx.typeRefs.collectFromTypeNode(typeNode);
    } else {
        sig += ": any";
    }
    return sig;
}

export function extractParameterInfo(p: ParameterDeclaration, namespaceAliases?: Set<string>): ParameterInfo {
    const type = displayType(p.getTypeNode(), p.getType(), p, namespaceAliases) || "any";

    const info: ParameterInfo = {
        name: p.getName(),
        type,
    };

    if (p.getInitializer()) info.default = p.getInitializer()!.getText();
    if (p.isOptional()) info.optional = true;
    if (p.isRestParameter()) info.rest = true;

    return info;
}

export function getDeprecatedInfo(node: Node | JSDocableNode): { deprecated?: boolean; deprecatedMsg?: string } {
    if (!("getJsDocs" in node)) return {};
    const jsDocs = node.getJsDocs();
    if (!jsDocs?.length) return {};

    for (const jsDoc of jsDocs) {
        for (const tag of jsDoc.getTags()) {
            if (tag.getTagName() !== "deprecated") continue;
            const comment = tag.getCommentText();
            return {
                deprecated: true,
                deprecatedMsg: typeof comment === "string" && comment.trim().length > 0 ? comment.trim() : undefined,
            };
        }
    }

    return {};
}

export function extractMethod(method: MethodDeclaration, ctx: ExtractionContext): MethodInfo {
    const paramInfos = method.getParameters().map(p => extractParameterInfo(p, ctx.namespaceAliases));
    const params = method.getParameters().map(p => formatParameter(p, ctx)).join(", ");
    const returnType = method.getReturnType();
    const returnTypeNode = method.getReturnTypeNode();
    const ret = displayType(returnTypeNode, returnType, method, ctx.namespaceAliases);

    // Collect return type reference
    if (returnType) {
        ctx.typeRefs.collectFromType(returnType);
    }
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);

    const typeParams = method.getTypeParameters().map(t => t.getText()).join(", ");

    const result: MethodInfo = {
        name: method.getName(),
        sig: params,
    };

    if (typeParams) result.typeParams = typeParams;

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(method);
    if (doc) result.doc = doc;

    if (method.isAsync()) result.async = true;
    if (method.isStatic()) result.static = true;

    const deprecated = getDeprecatedInfo(method);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

export function extractProperty(prop: PropertyDeclaration, ctx: ExtractionContext): PropertyInfo {
    const type = prop.getType();
    const typeNode = prop.getTypeNode();

    // Collect type reference for dependency tracking
    ctx.typeRefs.collectFromType(type);
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (typeNode) ctx.typeRefs.collectFromTypeNode(typeNode);

    const result: PropertyInfo = {
        name: prop.getName(),
        type: displayType(typeNode, type, prop, ctx.namespaceAliases),
    };

    if (prop.isReadonly()) result.readonly = true;
    if (prop.hasQuestionToken()) result.optional = true;

    const doc = getDocString(prop);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(prop);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

export function extractConstructor(ctor: ConstructorDeclaration, ctx: ExtractionContext): ConstructorInfo {
    const paramInfos = ctor.getParameters().map(p => extractParameterInfo(p, ctx.namespaceAliases));
    const result: ConstructorInfo = {
        sig: ctor.getParameters().map(p => formatParameter(p, ctx)).join(", "),
    };

    if (paramInfos.length) result.params = paramInfos;

    const deprecated = getDeprecatedInfo(ctor);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

export function extractClass(cls: ClassDeclaration, ctx: ExtractionContext): ClassInfo {
    const name = cls.getName();
    if (!name) throw new Error("Class must have a name");

    ctx.typeRefs.pushContext(name);

    const result: ClassInfo = { name };

    const deprecated = getDeprecatedInfo(cls);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    // Base class - collect type reference
    const ext = cls.getExtends();
    if (ext) {
        result.extends = stripImportPrefix(ext.getText(), false, ctx.namespaceAliases);
        // Collect base class type
        const baseType = ext.getType();
        ctx.typeRefs.collectFromType(baseType);
        ctx.typeRefs.collectFromTypeNode(ext);
    }

    // Interfaces - collect type references
    const implExprs = cls.getImplements();
    const impl = implExprs.map((i) => stripImportPrefix(i.getText(), false, ctx.namespaceAliases));
    if (impl.length) {
        result.implements = impl;
        // Collect interface types
        for (const implExpr of implExprs) {
            const implType = implExpr.getType();
            ctx.typeRefs.collectFromType(implType);
            ctx.typeRefs.collectFromTypeNode(implExpr);
        }
    }

    // Type parameters
    const typeParams = cls.getTypeParameters().map((t) => t.getText());
    if (typeParams.length) result.typeParams = typeParams.join(", ");

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of cls.getTypeParameters()) {
        const constraint = tp.getConstraint();
        if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
        const defaultType = tp.getDefault();
        if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
    }

    const doc = getDocString(cls);
    if (doc) result.doc = doc;

    // Constructors — extract overload signatures when present, skip implementation.
    // Exclude private and protected constructors — they are not part of the public API.
    const ctors = cls
        .getConstructors()
        .filter((c) => c.getScope() !== "private" && c.getScope() !== "protected")
        .filter((c) => c.isOverload() || c.getOverloads().length === 0)
        .map(c => extractConstructor(c, ctx));
    if (ctors.length) result.constructors = ctors;

    // Methods — extract overload signatures when present, skip implementation.
    // Exclude private and protected methods — they are not part of the public API.
    const methods = cls
        .getMethods()
        .filter((m) => m.getScope() !== "private" && m.getScope() !== "protected" && !hasInternalOrHiddenTag(m))
        .filter((m) => m.isOverload() || m.getOverloads().length === 0)
        .map(m => extractMethod(m, ctx));
    if (methods.length) result.methods = methods;

    // Properties — exclude private, protected, and ES private (#field) members.
    // Protected members are implementation details whose types should not
    // leak into the public API type reference graph.
    // ES private fields (#field) use ECMAScript private name syntax rather
    // than TypeScript's `private` keyword, so getScope() returns undefined
    // for them — we must also check the field name prefix.
    const props = cls
        .getProperties()
        .filter((p) => p.getScope() !== "private" && p.getScope() !== "protected"
            && !p.getName().startsWith("#") && !hasInternalOrHiddenTag(p))
        .map(p => extractProperty(p, ctx));

    // Get/Set Accessors — extract as properties with correct readonly flag.
    // Exclude private and protected accessors — they are not part of the public API.
    const setAccessorNames = new Set(
        cls.getSetAccessors()
            .filter((a) => a.getScope() !== "private" && a.getScope() !== "protected")
            .map((a) => a.getName())
    );
    const accessorProps: PropertyInfo[] = cls
        .getGetAccessors()
        .filter((a) => a.getScope() !== "private" && a.getScope() !== "protected" && !hasInternalOrHiddenTag(a))
        .map((getter) => {
            const returnType = getter.getReturnType();
            const typeText = displayType(getter.getReturnTypeNode(), returnType, getter, ctx.namespaceAliases);
            if (returnType) {
                ctx.typeRefs.collectFromType(returnType);
            }
            const accessorResult: PropertyInfo = {
                name: getter.getName(),
                type: typeText,
            };
            if (!setAccessorNames.has(getter.getName())) {
                accessorResult.readonly = true;
            }
            const doc = getDocString(getter);
            if (doc) accessorResult.doc = doc;
            const deprecated = getDeprecatedInfo(getter);
            if (deprecated.deprecated) accessorResult.deprecated = true;
            if (deprecated.deprecatedMsg) accessorResult.deprecatedMsg = deprecated.deprecatedMsg;
            return accessorResult;
        });

    const allProps = [...props, ...accessorProps];
    if (allProps.length) result.properties = allProps;

    // Index signatures — e.g., [key: string]: unknown
    // ClassDeclaration doesn't have getIndexSignatures(), so filter getMembers() by kind.
    const classIndexSigNodes: IndexSignatureDeclaration[] = cls
        .getMembers()
        .filter((m) => Node.isIndexSignatureDeclaration(m)) as IndexSignatureDeclaration[];
    const classIndexSigs: IndexSignatureInfo[] = classIndexSigNodes
        .map((sig) => {
            const keyParam = sig.getKeyName();
            const keyType = sig.getKeyType().getText();
            const valueType = displayType(sig.getReturnTypeNode(), sig.getReturnType(), sig, ctx.namespaceAliases);
            ctx.typeRefs.collectFromType(sig.getReturnType());
            const indexSig: IndexSignatureInfo = { keyName: keyParam, keyType, valueType };
            if (sig.isReadonly()) indexSig.readonly = true;
            return indexSig;
        });
    if (classIndexSigs.length) result.indexSignatures = classIndexSigs;

    ctx.typeRefs.popContext();
    return result;
}

export function extractInterfaceMethod(method: Node, ctx: ExtractionContext): MethodInfo | undefined {
    if (!Node.isMethodSignature(method)) return undefined;

    const paramInfos = method.getParameters().map(p => extractParameterInfo(p, ctx.namespaceAliases));
    const params = method.getParameters().map(p => formatParameter(p, ctx)).join(", ");
    const returnType = method.getReturnType();
    const returnTypeNode = method.getReturnTypeNode();
    const ret = displayType(returnTypeNode, returnType, method, ctx.namespaceAliases);

    // Collect return type reference
    if (returnType) {
        ctx.typeRefs.collectFromType(returnType);
    }
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);

    const typeParams = method.getTypeParameters().map(t => t.getText()).join(", ");

    const result: MethodInfo = {
        name: method.getName(),
        sig: params,
    };

    if (typeParams) result.typeParams = typeParams;

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(method);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(method);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

export function extractInterfaceCallableProperty(prop: Node, ctx: ExtractionContext): MethodInfo | undefined {
    if (!Node.isPropertySignature(prop)) return undefined;

    const typeNode = prop.getTypeNode();
    if (!typeNode || !Node.isFunctionTypeNode(typeNode)) return undefined;

    const paramInfos = typeNode.getParameters().map(p => extractParameterInfo(p, ctx.namespaceAliases));
    const params = typeNode.getParameters().map(p => formatParameter(p, ctx)).join(", ");
    const returnType = typeNode.getReturnType();
    const returnTypeNode = typeNode.getReturnTypeNode();
    const ret = displayType(returnTypeNode, returnType, prop, ctx.namespaceAliases);

    // Collect return type reference
    if (returnType) {
        ctx.typeRefs.collectFromType(returnType);
    }
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);

    const result: MethodInfo = {
        name: prop.getName(),
        sig: params,
    };

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(prop);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(prop);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

export function extractInterfaceProperty(prop: Node, ctx: ExtractionContext): PropertyInfo | undefined {
    if (!Node.isPropertySignature(prop)) return undefined;

    const typeNode = prop.getTypeNode();
    const typeText = displayType(typeNode, prop.getType(), prop, ctx.namespaceAliases);

    // Collect type reference for dependency tracking
    ctx.typeRefs.collectFromType(prop.getType());
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (typeNode) ctx.typeRefs.collectFromTypeNode(typeNode);

    const result: PropertyInfo = {
        name: prop.getName(),
        type: typeText,
    };

    if (prop.isReadonly()) result.readonly = true;
    if (prop.hasQuestionToken()) result.optional = true;

    const doc = getDocString(prop);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(prop);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

export function extractInterface(iface: InterfaceDeclaration, ctx: ExtractionContext): InterfaceInfo {
    const name = iface.getName();
    ctx.typeRefs.pushContext(name);

    const result: InterfaceInfo = { name };

    // Extends — collect type references for dependency tracking
    const extExprs = iface.getExtends();
    const ext = extExprs.map((e) => stripImportPrefix(e.getText(), false, ctx.namespaceAliases));
    if (ext.length) result.extends = ext;
    for (const extExpr of extExprs) {
        ctx.typeRefs.collectFromType(extExpr.getType());
        ctx.typeRefs.collectFromTypeNode(extExpr);
    }

    // Type parameters
    const typeParams = iface.getTypeParameters().map((t) => t.getText());
    if (typeParams.length) result.typeParams = typeParams.join(", ");

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of iface.getTypeParameters()) {
        const constraint = tp.getConstraint();
        if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
        const defaultType = tp.getDefault();
        if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
    }

    const doc = getDocString(iface);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(iface);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    // Methods
    const methods: MethodInfo[] = [];
    methods.push(
        ...iface
            .getMethods()
            .filter((m) => !hasInternalOrHiddenTag(m))
            .map((m) => extractInterfaceMethod(m, ctx))
            .filter((m): m is MethodInfo => m !== undefined),
    );

    // Properties
    const props: PropertyInfo[] = [];
    for (const prop of iface.getProperties()) {
        if (Node.isPropertySignature(prop) && hasInternalOrHiddenTag(prop)) continue;
        const callable = extractInterfaceCallableProperty(prop, ctx);
        if (callable) {
            methods.push(callable);
            continue;
        }
        const graphed = extractInterfaceProperty(prop, ctx);
        if (graphed) props.push(graphed);
    }

    if (methods.length) result.methods = methods;
    if (props.length) result.properties = props;

    // Index signatures — e.g., [key: string]: unknown
    const indexSigs: IndexSignatureInfo[] = iface
        .getIndexSignatures()
        .map((sig) => {
            const keyParam = sig.getKeyName();
            const keyType = sig.getKeyType().getText();
            const valueType = displayType(sig.getReturnTypeNode(), sig.getReturnType(), sig, ctx.namespaceAliases);
            ctx.typeRefs.collectFromType(sig.getReturnType());
            const indexSig: IndexSignatureInfo = { keyName: keyParam, keyType, valueType };
            if (sig.isReadonly()) indexSig.readonly = true;
            return indexSig;
        });
    if (indexSigs.length) result.indexSignatures = indexSigs;

    ctx.typeRefs.popContext();
    return result;
}

export function extractEnum(en: EnumDeclaration, ctx: ExtractionContext): EnumInfo {
    ctx.typeRefs.pushContext(en.getName());
    const result: EnumInfo = {
        name: en.getName(),
        doc: getDocString(en),
        values: en.getMembers().map((m) => m.getName()),
    };

    const deprecated = getDeprecatedInfo(en);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    ctx.typeRefs.popContext();
    return result;
}

export function extractTypeAlias(alias: TypeAliasDeclaration, ctx: ExtractionContext): TypeAliasInfo {
    const name = alias.getName();
    ctx.typeRefs.pushContext(name);
    const type = alias.getType();

    // Collect type reference for dependency tracking.
    // Both the resolved-type traversal AND the type-node traversal are needed:
    // collectFromType follows the compiler-resolved types (catches transitive deps),
    // collectFromTypeNode follows the TypeNode AST (catches import alias patterns
    // like `import { X as Y }` via the ImportSpecifier handler).
    ctx.typeRefs.collectFromType(type);

    // Use the type node text (original source) rather than Type.getText()
    // which can resolve to the alias name itself for complex types.
    // However, for indexed access types (e.g., AppSettings["database"]),
    // prefer the compiler-resolved type since it gives the concrete type name.
    const typeNode = alias.getTypeNode();
    if (typeNode) ctx.typeRefs.collectFromTypeNode(typeNode);
    let typeText: string;
    if (typeNode && typeNode.getKind() === ts.SyntaxKind.IndexedAccessType) {
        // Indexed access type — use compiler-resolved type for the concrete name.
        typeText = displayType(undefined, type, alias, ctx.namespaceAliases);
    } else {
        typeText = displayType(typeNode, type, alias, ctx.namespaceAliases);
    }

    const result: TypeAliasInfo = {
        name,
        type: typeText,
        doc: getDocString(alias),
    };

    // Capture type parameters (e.g., <T> on type aliases)
    const typeParams = alias.getTypeParameters().map(tp => tp.getText());
    if (typeParams.length > 0) result.typeParams = typeParams.join(", ");

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of alias.getTypeParameters()) {
        const constraint = tp.getConstraint();
        if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
        const defaultType = tp.getDefault();
        if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
    }

    const deprecated = getDeprecatedInfo(alias);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    ctx.typeRefs.popContext();
    return result;
}

export function extractFunction(fn: FunctionDeclaration, ctx: ExtractionContext): FunctionInfo | undefined {
    const name = fn.getName();
    if (!name) return undefined;

    ctx.typeRefs.pushContext(name);

    const paramInfos = fn.getParameters().map(p => extractParameterInfo(p, ctx.namespaceAliases));
    const params = fn.getParameters().map(p => formatParameter(p, ctx)).join(", ");
    const returnType = fn.getReturnType();
    const ret = displayType(fn.getReturnTypeNode(), returnType, fn, ctx.namespaceAliases);

    // Collect return type reference
    if (returnType) {
        ctx.typeRefs.collectFromType(returnType);
    }

    const typeParams = fn.getTypeParameters().map(t => t.getText()).join(", ");

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of fn.getTypeParameters()) {
        const constraint = tp.getConstraint();
        if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
        const defaultType = tp.getDefault();
        if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
    }

    const result: FunctionInfo = {
        name,
        sig: params,
    };

    if (typeParams) result.typeParams = typeParams;

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(fn);
    if (doc) result.doc = doc;

    if (fn.isAsync()) result.async = true;

    const deprecated = getDeprecatedInfo(fn);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    ctx.typeRefs.popContext();
    return result;
}

export function extractModule(sourceFile: SourceFile, moduleName: string, ctx: ExtractionContext): ModuleInfo | null {
    const result: ModuleInfo = { name: moduleName };

    // Get exported declarations, filtering out @internal/@hidden tagged items
    const classes = sourceFile
        .getClasses()
        .filter((c) => c.isExported() && c.getName() && !hasInternalOrHiddenTag(c))
        .map(c => extractClass(c, ctx));
    if (classes.length) result.classes = classes;

    const interfaces = sourceFile
        .getInterfaces()
        .filter((i) => i.isExported() && !hasInternalOrHiddenTag(i))
        .map(i => extractInterface(i, ctx));
    if (interfaces.length) result.interfaces = interfaces;

    const enums = sourceFile
        .getEnums()
        .filter((e) => e.isExported() && !hasInternalOrHiddenTag(e))
        .map(e => extractEnum(e, ctx));
    if (enums.length) result.enums = enums;

    const typeAliases = sourceFile
        .getTypeAliases()
        .filter((t) => t.isExported() && !hasInternalOrHiddenTag(t))
        .map(t => extractTypeAlias(t, ctx));
    if (typeAliases.length) result.types = typeAliases;

    const functions = sourceFile
        .getFunctions()
        .filter((f) => f.isExported() && !hasInternalOrHiddenTag(f))
        .filter((f) => f.isOverload() || f.getOverloads().length === 0)
        .map(f => extractFunction(f, ctx))
        .filter((f): f is FunctionInfo => f !== undefined);
    if (functions.length) result.functions = functions;

    // Check if anything was graphed
    if (
        !result.classes &&
        !result.interfaces &&
        !result.enums &&
        !result.types &&
        !result.functions
    ) {
        return null;
    }

    return result;
}

