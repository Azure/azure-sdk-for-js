// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Step 1b: prints a declaration in the shape the review shows it.

import type {
  ClassElement,
  Declaration,
  EnumMember,
  Identifier,
  JSDocTag,
  Node,
  Statement,
  TypeElement,
} from "typescript/ast";
import { SyntaxKind, getNameOfDeclaration, visitEachChild, visitNodes } from "typescript/ast";
import {
  createEnumMember,
  createExpressionStatement,
  createIdentifier,
  createPropertyDeclaration,
  createPropertySignatureDeclaration,
  createToken,
  createTypeReferenceNode,
  updateClassDeclaration,
  updateEnumDeclaration,
  updateFunctionDeclaration,
  updateImportEqualsDeclaration,
  updateInterfaceDeclaration,
  updateModuleBlock,
  updateModuleDeclaration,
  updateTypeAliasDeclaration,
  updateTypeLiteralNode,
  updateVariableStatement,
} from "typescript/ast/factory";
import {
  isClassDeclaration,
  isEnumDeclaration,
  isFunctionDeclaration,
  isImportEqualsDeclaration,
  isImportTypeNode,
  isInterfaceDeclaration,
  isJSDoc,
  isModuleBlock,
  isModuleDeclaration,
  isPrivateIdentifier,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  isVariableDeclaration,
  isVariableStatement,
} from "typescript/ast/is";
import type { API } from "typescript/sync";
import { getModifiers } from "../typescript/nodes.ts";

/**
 * How references inside printed declarations appear in the review.
 */
export interface ReferenceNames {
  /** The exported name a reference prints as, when it differs from the source. */
  rewritten(node: Node): string | undefined;
  /** The name of a package-local declaration that no export path exposes. */
  forgotten(identifier: Identifier): string | undefined;
}

const statusTags = new Set(["alpha", "beta", "internal", "deprecated"]);

const classElementKinds = new Set([
  SyntaxKind.Constructor,
  SyntaxKind.PropertyDeclaration,
  SyntaxKind.MethodDeclaration,
  SyntaxKind.GetAccessor,
  SyntaxKind.SetAccessor,
  SyntaxKind.IndexSignature,
  SyntaxKind.ClassStaticBlockDeclaration,
  SyntaxKind.SemicolonClassElement,
]);

export function isPrivateMember(node: Node): boolean {
  if (!classElementKinds.has(node.kind)) {
    return false;
  }
  const name = (node as { name?: Node }).name;
  return (
    Boolean(getModifiers(node)?.some((modifier) => modifier.kind === SyntaxKind.PrivateKeyword)) ||
    (name !== undefined && isPrivateIdentifier(name))
  );
}

/**
 * Prints each declaration of a symbol under its public name.
 */
export function printDeclarations(
  api: API,
  declarations: readonly Declaration[],
  publicName: string,
  referenceNames: ReferenceNames,
): string[] {
  return declarations.map((declaration) => {
    const node = isVariableDeclaration(declaration) ? declaration.parent.parent : declaration;
    const declaredName = getNameOfDeclaration(declaration);

    // Like API Extractor's ae-forgotten-export, warn on the member (or the declaration itself)
    // that uses a declaration no export path exposes.
    const members: readonly Node[] =
      isClassDeclaration(node) || isInterfaceDeclaration(node) ? node.members : [];
    const forgotten = new Map<Node, string[]>([
      [node, forgottenNamesIn(node, referenceNames, new Set(members))],
      ...members.map((member): [Node, string[]] => [
        member,
        forgottenNamesIn(member, referenceNames),
      ]),
    ]);

    return printReviewShape(
      api,
      node,
      declaredName,
      publicName,
      referenceNames.rewritten,
      forgotten,
    );
  });
}

function forgottenNamesIn(
  node: Node,
  referenceNames: ReferenceNames,
  skip: ReadonlySet<Node> = new Set(),
): string[] {
  const names = new Set<string>();
  const walk = (child: Node): void => {
    if (skip.has(child)) {
      return;
    }
    const name =
      child.kind === SyntaxKind.Identifier
        ? referenceNames.forgotten(child as Identifier)
        : undefined;
    if (name) {
      names.add(name);
    }
    child.forEachChild(walk);
  };
  walk(node);
  return [...names];
}

/**
 * Gets the JSDoc tags a node declares itself.
 *
 * `getJSDocTags` also reports a node's tags for the nodes it contains when they are in a variable
 * statement or declaration, an expression or return statement, a property declaration or
 * assignment, an export assignment or a satisfies expression. In TypeScript 7.1 beta that includes the
 * keywords and types inside a declaration, which would then all print the tags again.
 */
function ownJSDocTags(node: Node): readonly JSDocTag[] {
  const jsDoc = node.jsDoc?.at(-1);
  return jsDoc && isJSDoc(jsDoc) ? (jsDoc.tags ?? []) : [];
}

/**
 * The comment lines to print above a node: a warning for each forgotten export it uses, then its
 * status tags as `// @tag`.
 */
function commentLinesFor(node: Node, forgottenNames: readonly string[] = []): string[] {
  return [
    ...forgottenNames.map((name) => `// Warning: (arh-forgotten-export: ${name})`),
    ...ownJSDocTags(node)
      .filter((tag) => statusTags.has(tag.tagName.text))
      .map((tag) => `// @${tag.tagName.text}`),
  ];
}

/**
 * Prints a declaration without comments (keeping status tags as `// @tag`), private class members,
 * and `declare` on classes. Renames the declaration to its public export name and references to
 * their exported names.
 *
 * The TypeScript 7 API can neither attach comments to synthesized nodes nor emit comments the
 * printed tree doesn't own, so the tree gets a marker where each comment goes (a member named
 * `__arh_comment_<n>__` ahead of the commented member), and the markers are then replaced in the
 * printed text by the comments, at the indentation the printer gave them. A comment that would
 * need a marker somewhere the tree has no list of members or statements to put it in throws
 * rather than being dropped.
 */
function printReviewShape(
  api: API,
  printed: Node,
  declaredName: Node | undefined,
  publicName: string,
  referenceName: (node: Node) => string | undefined,
  forgotten: ReadonlyMap<Node, string[]>,
): string {
  // The comments owed to each visited node, by the node that replaced it in the shaped tree.
  const owed = new Map<Node, string[]>();
  const markers: string[][] = [];

  const withMarkers = <T extends Node>(
    nodes: readonly T[],
    createMarker: (name: string) => T,
  ): readonly T[] =>
    nodes.flatMap((node) => {
      const lines = owed.get(node);
      if (!lines) {
        return [node];
      }
      owed.delete(node);
      markers.push(lines);
      return [createMarker(`__arh_comment_${markers.length - 1}__`), node];
    });

  const visit = (node: Node): Node | undefined => {
    if (isPrivateMember(node)) {
      return undefined;
    }
    // A default export keeps its declared name: `export default function createClient(...)`.
    if (node === declaredName && publicName !== "default") {
      return createIdentifier(publicName);
    }
    const name = referenceName(node);
    if (name) {
      return isImportTypeNode(node)
        ? createTypeReferenceNode(createIdentifier(name), visitNodes(node.typeArguments, visit))
        : createIdentifier(name);
    }
    let result = visitEachChild(node, visit);
    if (isClassDeclaration(result)) {
      result = updateClassDeclaration(
        result,
        result.modifiers?.filter((modifier) => modifier.kind !== SyntaxKind.DeclareKeyword),
        result.name,
        result.typeParameters,
        result.heritageClauses,
        withMarkers<ClassElement>(result.members, (marker) =>
          createPropertyDeclaration(undefined, createIdentifier(marker)),
        ),
      );
    } else if (isInterfaceDeclaration(result)) {
      result = updateInterfaceDeclaration(
        result,
        result.modifiers,
        result.name,
        result.typeParameters,
        result.heritageClauses,
        withMarkers<TypeElement>(result.members, createPropertySignatureMarker),
      );
    } else if (isTypeLiteralNode(result)) {
      result = updateTypeLiteralNode(
        result,
        withMarkers<TypeElement>(result.members, createPropertySignatureMarker),
      );
    } else if (isEnumDeclaration(result)) {
      result = updateEnumDeclaration(
        result,
        result.modifiers,
        result.name,
        withMarkers<EnumMember>(result.members, (marker) =>
          createEnumMember(createIdentifier(marker)),
        ),
      );
    } else if (isModuleBlock(result)) {
      result = updateModuleBlock(
        result,
        withMarkers<Statement>(result.statements, (marker) =>
          createExpressionStatement(createIdentifier(marker)),
        ),
      );
    }
    // The printed statement shows how the export path exposes it (a named or default export),
    // whatever `export`/`default` modifiers (or none) its own file used.
    if (node === printed) {
      result = replaceExportModifiers(result, publicName);
    }
    const lines = commentLinesFor(node, forgotten.get(node));
    if (lines.length > 0) {
      owed.set(result, lines);
    }
    return result;
  };

  const shaped = visit(printed)!;
  const lines = owed.get(shaped) ?? [];
  owed.delete(shaped);
  if (owed.size > 0) {
    throw new Error(
      `Cannot print the comments above ${[...owed.keys()].map((node) => SyntaxKind[node.kind]).join(", ")} in ${publicName}: ` +
        "the review can only place them above members of classes, interfaces, type literals and enums, and statements of namespaces",
    );
  }

  const text = api.printer
    .printNode(shaped)
    .replace(/^([ \t]*)__arh_comment_(\d+)__[;,]$/gm, (_marker, indent: string, index: string) =>
      markers[Number(index)].map((line) => indent + line).join("\n"),
    );
  if (/__arh_comment_\d+__/.test(text)) {
    throw new Error(`Cannot print the comments of ${publicName}: a comment marker was not placed`);
  }
  return [...lines, text].join("\n");
}

function createPropertySignatureMarker(marker: string): TypeElement {
  // The declared parameter types require a type and an initializer, but a property needs neither.
  return createPropertySignatureDeclaration(
    undefined,
    createIdentifier(marker),
    undefined,
    undefined as never,
    undefined as never,
  );
}

/**
 * Replaces the `export` and `default` modifiers of a declaration with the ones its public name needs.
 */
function replaceExportModifiers(node: Node, publicName: string): Node {
  const exportModifiers =
    publicName === "default"
      ? ([SyntaxKind.ExportKeyword, SyntaxKind.DefaultKeyword] as const)
      : ([SyntaxKind.ExportKeyword] as const);
  const modifiers = [
    ...exportModifiers.map((kind) => createToken(kind)),
    ...(getModifiers(node) ?? []).filter(
      (modifier) =>
        modifier.kind !== SyntaxKind.ExportKeyword && modifier.kind !== SyntaxKind.DefaultKeyword,
    ),
  ];

  if (isClassDeclaration(node)) {
    return updateClassDeclaration(
      node,
      modifiers,
      node.name,
      node.typeParameters,
      node.heritageClauses,
      node.members,
    );
  } else if (isFunctionDeclaration(node)) {
    return updateFunctionDeclaration(
      node,
      modifiers,
      node.asteriskToken,
      node.name,
      node.typeParameters,
      node.parameters,
      node.type,
      node.body,
    );
  } else if (isInterfaceDeclaration(node)) {
    return updateInterfaceDeclaration(
      node,
      modifiers,
      node.name,
      node.typeParameters,
      node.heritageClauses,
      node.members,
    );
  } else if (isTypeAliasDeclaration(node)) {
    return updateTypeAliasDeclaration(node, modifiers, node.name, node.typeParameters, node.type);
  } else if (isEnumDeclaration(node)) {
    return updateEnumDeclaration(node, modifiers, node.name, node.members);
  } else if (isModuleDeclaration(node)) {
    return updateModuleDeclaration(node, modifiers, node.name, node.attributes, node.body);
  } else if (isVariableStatement(node)) {
    return updateVariableStatement(node, modifiers, node.declarationList);
  } else if (isImportEqualsDeclaration(node)) {
    return updateImportEqualsDeclaration(node, modifiers, node.name, node.moduleReference);
  }
  throw new Error(`Cannot print a ${SyntaxKind[node.kind]} as an export of ${publicName}`);
}
