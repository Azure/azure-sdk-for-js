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
    ModuleDeclaration,
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
    NamespaceInfo,
    CallSignatureInfo,
    ConstructSignatureInfo,
} from "./models.js";
import type { ExtractionContext } from "./context.js";
import { displayType, stripImportPrefix } from "./formatter.js";
import { collectCompanionNamespaceAliases } from "./dependencies.js";

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
    let sig = p.isRestParameter() ? `...${p.getName()}` : p.getName();
    // Rest parameters cannot be optional in TypeScript
    if (p.isOptional() && !p.isRestParameter()) sig += "?";
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
    // Rest parameters cannot be optional in TypeScript
    if (p.isOptional() && !p.isRestParameter()) info.optional = true;
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

    const rawTypeParams = method.getTypeParameters();
    const typeParams = rawTypeParams.map(t => stripImportPrefix(t.getText(), false, ctx.namespaceAliases)).join(", ");

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of rawTypeParams) {
        const constraint = tp.getConstraint();
        if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
        const defaultType = tp.getDefault();
        if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
    }

    const result: MethodInfo = {
        name: method.getName(),
        sig: params,
    };

    if (typeParams) {
        result.typeParams = typeParams;
        result.declaredTypeParamNames = rawTypeParams.map(tp => tp.getName());
    }

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(method);
    if (doc) result.doc = doc;

    if (method.isAsync()) result.async = true;
    if (method.isStatic()) result.static = true;
    if (method.isAbstract()) result.abstract = true;

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
    if (prop.isStatic()) result.static = true;

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

    // Collect namespace import aliases from the class's source file so that
    // displayType can strip qualified names during member extraction.
    const clsSf = cls.getSourceFile();
    for (const imp of clsSf.getImportDeclarations()) {
        const nsImport = imp.getNamespaceImport();
        if (nsImport) ctx.namespaceAliases.add(nsImport.getText());
    }

    ctx.typeRefs.pushContext(name);

    const result: ClassInfo = { name };

    if (cls.isAbstract()) result.abstract = true;

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
    const rawTypeParams = cls.getTypeParameters();
    const typeParams = rawTypeParams.map((t) => stripImportPrefix(t.getText(), false, ctx.namespaceAliases));
    if (typeParams.length) {
        result.typeParams = typeParams.join(", ");
        result.declaredTypeParamNames = rawTypeParams.map(tp => tp.getName());
    }

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of rawTypeParams) {
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

    // Constructor parameter properties — parameters with public modifier become class properties.
    // Only include public ones (not protected/private — those aren't public API).
    const paramProps: PropertyInfo[] = [];
    for (const ctor of cls.getConstructors()) {
        if (ctor.getScope() === "private" || ctor.getScope() === "protected") continue;
        for (const p of ctor.getParameters()) {
            const scope = p.getScope();
            // Skip private and protected parameter properties
            if (scope === "private" || scope === "protected") continue;
            // Only include parameters with explicit `public` scope or readonly modifier (both create properties)
            if (scope !== "public" && !p.isReadonly()) continue;
            // This is a public parameter property
            const paramType = p.getType();
            const paramTypeNode = p.getTypeNode();
            const typeText = displayType(paramTypeNode, paramType, p, ctx.namespaceAliases);
            ctx.typeRefs.collectFromType(paramType);
            if (paramTypeNode) ctx.typeRefs.collectFromTypeNode(paramTypeNode);
            const paramProp: PropertyInfo = {
                name: p.getName(),
                type: typeText || "any",
            };
            if (p.isReadonly()) paramProp.readonly = true;
            if (p.hasQuestionToken()) paramProp.optional = true;
            paramProps.push(paramProp);
        }
    }

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

    const allProps = [...props, ...accessorProps, ...paramProps];
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

    const rawTypeParams = method.getTypeParameters();
    const typeParams = rawTypeParams.map(t => stripImportPrefix(t.getText(), false, ctx.namespaceAliases)).join(", ");

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of rawTypeParams) {
        const constraint = tp.getConstraint();
        if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
        const defaultType = tp.getDefault();
        if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
    }

    const result: MethodInfo = {
        name: method.getName(),
        sig: params,
    };

    if (typeParams) {
        result.typeParams = typeParams;
        result.declaredTypeParamNames = rawTypeParams.map(tp => tp.getName());
    }

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(method);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(method);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

export function extractInterfaceCallableProperty(prop: Node, ctx: ExtractionContext): MethodInfo | PropertyInfo | undefined {
    if (!Node.isPropertySignature(prop)) return undefined;

    const typeNode = prop.getTypeNode();
    if (!typeNode || !Node.isFunctionTypeNode(typeNode)) return undefined;

    // If the property is optional or readonly, keep it as a PropertyInfo
    // since method syntax is not equivalent for optional/readonly callable properties.
    if (prop.hasQuestionToken() || prop.isReadonly()) {
        return extractInterfaceProperty(prop, ctx);
    }

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

    // Extract type parameters from the function type (e.g., <T extends Foo>)
    const rawTypeParams = typeNode.getTypeParameters();
    const typeParams = rawTypeParams.map(t => stripImportPrefix(t.getText(), false, ctx.namespaceAliases)).join(", ");

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of rawTypeParams) {
        const constraint = tp.getConstraint();
        if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
        const defaultType = tp.getDefault();
        if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
    }

    const result: MethodInfo = {
        name: prop.getName(),
        sig: params,
    };

    if (typeParams) {
        result.typeParams = typeParams;
        result.declaredTypeParamNames = rawTypeParams.map(tp => tp.getName());
    }

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
    const rawTypeParams = iface.getTypeParameters();
    const typeParams = rawTypeParams.map((t) => stripImportPrefix(t.getText(), false, ctx.namespaceAliases));
    if (typeParams.length) {
        result.typeParams = typeParams.join(", ");
        result.declaredTypeParamNames = rawTypeParams.map(tp => tp.getName());
    }

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of rawTypeParams) {
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
            // callable may be a MethodInfo (required, non-readonly) or PropertyInfo (optional/readonly)
            if ("sig" in callable) {
                methods.push(callable as MethodInfo);
            } else {
                props.push(callable as PropertyInfo);
            }
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

    // Call signatures — e.g., (x: string): number
    const callSigs: CallSignatureInfo[] = iface
        .getCallSignatures()
        .map((sig) => {
            const params = sig.getParameters().map(p => formatParameter(p, ctx)).join(", ");
            const returnType = sig.getReturnType();
            const returnTypeNode = sig.getReturnTypeNode();
            const ret = displayType(returnTypeNode, returnType, sig, ctx.namespaceAliases);
            if (returnType) ctx.typeRefs.collectFromType(returnType);
            if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);
            const rawTypeParams = sig.getTypeParameters();
            const typeParams = rawTypeParams.map(t => stripImportPrefix(t.getText(), false, ctx.namespaceAliases)).join(", ");
            for (const tp of rawTypeParams) {
                const constraint = tp.getConstraint();
                if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
                const defaultType = tp.getDefault();
                if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
            }
            const callSig: CallSignatureInfo = { sig: params };
            if (typeParams) callSig.typeParams = typeParams;
            if (ret && ret !== "void") callSig.ret = ret;
            return callSig;
        });
    if (callSigs.length) result.callSignatures = callSigs;

    // Construct signatures — e.g., new(): Foo
    const constructSigs: ConstructSignatureInfo[] = iface
        .getConstructSignatures()
        .map((sig) => {
            const params = sig.getParameters().map(p => formatParameter(p, ctx)).join(", ");
            const returnType = sig.getReturnType();
            const returnTypeNode = sig.getReturnTypeNode();
            const ret = displayType(returnTypeNode, returnType, sig, ctx.namespaceAliases);
            if (returnType) ctx.typeRefs.collectFromType(returnType);
            if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);
            const rawTypeParams = sig.getTypeParameters();
            const typeParams = rawTypeParams.map(t => stripImportPrefix(t.getText(), false, ctx.namespaceAliases)).join(", ");
            for (const tp of rawTypeParams) {
                const constraint = tp.getConstraint();
                if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
                const defaultType = tp.getDefault();
                if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
            }
            const constructSig: ConstructSignatureInfo = { sig: params };
            if (typeParams) constructSig.typeParams = typeParams;
            if (ret && ret !== "void") constructSig.ret = ret;
            return constructSig;
        });
    if (constructSigs.length) result.constructSignatures = constructSigs;

    ctx.typeRefs.popContext();
    return result;
}

export function extractEnum(en: EnumDeclaration, ctx: ExtractionContext): EnumInfo {
    ctx.typeRefs.pushContext(en.getName());
    const members = en.getMembers();

    // Emit each member faithfully: "Name" if auto-valued, "Name = init" if explicit.
    const values = members.map((m) => {
        const init = m.getInitializer();
        return init ? `${m.getName()} = ${init.getText()}` : m.getName();
    });

    const result: EnumInfo = {
        name: en.getName(),
        doc: getDocString(en),
        values,
    };

    if (en.isConstEnum()) result.isConst = true;

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
    const rawTypeParams = alias.getTypeParameters();
    const typeParams = rawTypeParams.map(tp => stripImportPrefix(tp.getText(), false, ctx.namespaceAliases));
    if (typeParams.length > 0) {
        result.typeParams = typeParams.join(", ");
        result.declaredTypeParamNames = rawTypeParams.map(tp => tp.getName());
    }

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of rawTypeParams) {
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
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    const returnTypeNode = fn.getReturnTypeNode();
    if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);

    const rawTypeParams = fn.getTypeParameters();
    const typeParams = rawTypeParams.map(t => stripImportPrefix(t.getText(), false, ctx.namespaceAliases)).join(", ");

    // Traverse type parameter constraints and defaults for dependency tracking
    for (const tp of rawTypeParams) {
        const constraint = tp.getConstraint();
        if (constraint) ctx.typeRefs.collectFromType(constraint.getType());
        const defaultType = tp.getDefault();
        if (defaultType) ctx.typeRefs.collectFromType(defaultType.getType());
    }

    const result: FunctionInfo = {
        name,
        sig: params,
    };

    if (typeParams) {
        result.typeParams = typeParams;
        result.declaredTypeParamNames = rawTypeParams.map(tp => tp.getName());
    }

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

export function extractNamespace(mod: ModuleDeclaration, ctx: ExtractionContext): NamespaceInfo | null {
    const name = mod.getName();
    if (!name) return null;

    // Eagerly collect namespace import aliases from the module's source file
    // so that displayType / stripImportPrefix can strip qualified names during
    // member extraction (e.g., TranscriptionSessionsAPI.X → X).
    const sf = mod.getSourceFile();
    for (const imp of sf.getImportDeclarations()) {
        const nsImport = imp.getNamespaceImport();
        if (nsImport) {
            ctx.namespaceAliases.add(nsImport.getText());
        }
        // Also detect named imports with companion namespaces
        // (e.g., `import { Runs } from "..."` where Runs is a class+namespace)
        collectCompanionNamespaceAliases(imp, ctx);
    }

    const result: NamespaceInfo = { name };

    // Push namespace context so type refs are keyed by qualified path (e.g. "NS.Client")
    ctx.typeRefs.pushContext(name);

    // In ambient/declare namespace blocks (common in .d.ts files), members
    // are implicitly exported even without an explicit `export` keyword.
    // Use isAmbient() to detect this and skip the isExported() check.
    const isAmbient = mod.isAmbient();
    const isVisible = (node: { isExported(): boolean }): boolean =>
        isAmbient || node.isExported();

    const classes = mod.getClasses()
        .filter(c => isVisible(c) && c.getName() && !hasInternalOrHiddenTag(c))
        .map(c => extractClass(c, ctx));
    if (classes.length) result.classes = classes;

    const interfaces = mod.getInterfaces()
        .filter(i => isVisible(i) && !hasInternalOrHiddenTag(i))
        .map(i => extractInterface(i, ctx));
    if (interfaces.length) result.interfaces = mergeInterfaces(interfaces);

    const enums = mod.getEnums()
        .filter(e => isVisible(e) && !hasInternalOrHiddenTag(e))
        .map(e => extractEnum(e, ctx));
    if (enums.length) result.enums = enums;

    const typeAliases = mod.getTypeAliases()
        .filter(t => isVisible(t) && !hasInternalOrHiddenTag(t))
        .map(t => extractTypeAlias(t, ctx));
    if (typeAliases.length) result.types = typeAliases;

    const functions = mod.getFunctions()
        .filter(f => isVisible(f) && !hasInternalOrHiddenTag(f))
        .filter(f => f.isOverload() || f.getOverloads().length === 0)
        .map(f => extractFunction(f, ctx))
        .filter((f): f is FunctionInfo => f !== undefined);
    if (functions.length) result.functions = functions;

    const nested = mod.getModules()
        .map(m => extractNamespace(m, ctx))
        .filter((ns): ns is NamespaceInfo => ns !== null);
    if (nested.length) result.namespaces = mergeNamespaces(nested);

    // Fallback for re-export-only namespaces (e.g., `export { type X as X }`)
    // where getClasses/getInterfaces/etc. return nothing because the namespace
    // has no direct declarations. Use getExportedDeclarations() to resolve
    // the re-exported types.
    if (!result.classes && !result.interfaces && !result.enums &&
        !result.types && !result.functions && !result.namespaces) {
        const seen = new Set<string>();
        for (const [exportName, decls] of mod.getExportedDeclarations()) {
            if (seen.has(exportName)) continue;
            seen.add(exportName);
            for (const decl of decls) {
                if (Node.isInterfaceDeclaration(decl) && !hasInternalOrHiddenTag(decl)) {
                    (result.interfaces ??= []).push(extractInterface(decl, ctx));
                } else if (Node.isClassDeclaration(decl) && decl.getName() && !hasInternalOrHiddenTag(decl)) {
                    (result.classes ??= []).push(extractClass(decl, ctx));
                } else if (Node.isEnumDeclaration(decl) && !hasInternalOrHiddenTag(decl)) {
                    (result.enums ??= []).push(extractEnum(decl, ctx));
                } else if (Node.isTypeAliasDeclaration(decl) && !hasInternalOrHiddenTag(decl)) {
                    (result.types ??= []).push(extractTypeAlias(decl, ctx));
                } else if (Node.isModuleDeclaration(decl)) {
                    const nsInfo = extractNamespace(decl, ctx);
                    if (nsInfo) (result.namespaces ??= []).push(nsInfo);
                }
            }
        }
    }

    if (!result.classes && !result.interfaces && !result.enums &&
        !result.types && !result.functions && !result.namespaces) {
        ctx.typeRefs.popContext();
        return null;
    }

    ctx.typeRefs.popContext();
    return result;
}

// ============================================================================
// Declaration merging helpers
// ============================================================================

/**
 * Merges interfaces with the same name into single entries (declaration merging).
 * Concatenates methods, properties, indexSignatures, callSignatures, constructSignatures,
 * and deduplicates extends arrays.
 */
function mergeInterfaces(interfaces: InterfaceInfo[]): InterfaceInfo[] {
    const map = new Map<string, InterfaceInfo>();
    for (const iface of interfaces) {
        const existing = map.get(iface.name);
        if (!existing) {
            // Clone to avoid mutating the original
            map.set(iface.name, { ...iface });
            continue;
        }
        // Merge members
        if (iface.methods?.length) existing.methods = [...(existing.methods ?? []), ...iface.methods];
        if (iface.properties?.length) existing.properties = [...(existing.properties ?? []), ...iface.properties];
        if (iface.indexSignatures?.length) existing.indexSignatures = [...(existing.indexSignatures ?? []), ...iface.indexSignatures];
        if (iface.callSignatures?.length) existing.callSignatures = [...(existing.callSignatures ?? []), ...iface.callSignatures];
        if (iface.constructSignatures?.length) existing.constructSignatures = [...(existing.constructSignatures ?? []), ...iface.constructSignatures];
        // Merge extends (deduplicate)
        if (iface.extends?.length) {
            const extSet = new Set(existing.extends ?? []);
            for (const e of iface.extends) extSet.add(e);
            existing.extends = [...extSet];
        }
        // Merge referencedTypes (deduplicate)
        if (iface.referencedTypes?.length) {
            const refSet = new Set(existing.referencedTypes ?? []);
            for (const r of iface.referencedTypes) refSet.add(r);
            existing.referencedTypes = [...refSet];
        }
    }
    return [...map.values()];
}

/**
 * Merges namespaces with the same name into single entries (declaration merging).
 * Recursively merges all member arrays.
 */
function mergeNamespaces(namespaces: NamespaceInfo[]): NamespaceInfo[] {
    const map = new Map<string, NamespaceInfo>();
    for (const ns of namespaces) {
        const existing = map.get(ns.name);
        if (!existing) {
            map.set(ns.name, { ...ns });
            continue;
        }
        if (ns.classes?.length) existing.classes = [...(existing.classes ?? []), ...ns.classes];
        if (ns.interfaces?.length) {
            existing.interfaces = mergeInterfaces([...(existing.interfaces ?? []), ...ns.interfaces]);
        }
        if (ns.enums?.length) existing.enums = [...(existing.enums ?? []), ...ns.enums];
        if (ns.types?.length) existing.types = [...(existing.types ?? []), ...ns.types];
        if (ns.functions?.length) existing.functions = [...(existing.functions ?? []), ...ns.functions];
        if (ns.namespaces?.length) {
            existing.namespaces = mergeNamespaces([...(existing.namespaces ?? []), ...ns.namespaces]);
        }
    }
    return [...map.values()];
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
    if (interfaces.length) result.interfaces = mergeInterfaces(interfaces);

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

    const namespaces = sourceFile.getModules()
        .filter(m => m.isExported() && !hasInternalOrHiddenTag(m))
        .map(m => extractNamespace(m, ctx))
        .filter((ns): ns is NamespaceInfo => ns !== null);
    if (namespaces.length) result.namespaces = mergeNamespaces(namespaces);

    // Check if anything was graphed
    if (
        !result.classes &&
        !result.interfaces &&
        !result.enums &&
        !result.types &&
        !result.functions &&
        !result.namespaces
    ) {
        return null;
    }

    return result;
}

