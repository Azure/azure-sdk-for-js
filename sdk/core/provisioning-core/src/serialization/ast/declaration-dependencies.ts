// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AstDeclarationMap, DeclarationNode, TypeNode } from "./index.js";
import { walkDeclarationExpressions } from "./expression-walker.js";

export type DeclarationDependencyOptions =
  | { readonly recursive?: false }
  | {
      readonly recursive: true;
      /** Only references present in this emitted-identifier map are followed. */
      readonly declarations: AstDeclarationMap;
    };

/**
 * Collects names referenced by declaration values/defaults, types, and decorators,
 * excluding loop-local identifiers. These are dependencies of the declarations,
 * not declarations that depend on them. By default, only direct names are collected.
 * Recursive mode follows references through the declaration map using a work queue.
 * Each declaration instance is inspected once per call, so cycles terminate without
 * being validated. Names with no resolved declaration remain in the result.
 */
export function collectDependenciesForDeclaration(
  input: DeclarationNode | readonly DeclarationNode[],
  options?: DeclarationDependencyOptions,
): Set<string> {
  const identifiers = new Set<string>();
  const visited = new Set<DeclarationNode>();
  const pending = "bicepIdentifier" in input ? [input] : [...input];
  for (let index = 0; index < pending.length; index++) {
    const declaration = pending[index]!;
    if (visited.has(declaration)) continue;
    visited.add(declaration);
    for (const identifier of collectDirectDependencies(declaration)) {
      if (identifiers.has(identifier)) continue;
      identifiers.add(identifier);
      if (options?.recursive === true) {
        const dependency = options.declarations.get(identifier);
        if (dependency !== undefined) pending.push(dependency);
      }
    }
  }
  return identifiers;
}

function collectDirectDependencies(node: DeclarationNode): Set<string> {
  const identifiers = new Set<string>();
  if ("valueType" in node) {
    collectIdentifierIdsFromType(node.valueType, identifiers);
  }
  walkDeclarationExpressions(node, (expression, boundIdentifiers) => {
    if (expression.kind === "identifier" && !boundIdentifiers.has(expression.id)) {
      identifiers.add(expression.id);
    }
  });
  return identifiers;
}

function collectIdentifierIdsFromType(type: TypeNode, identifiers: Set<string>): void {
  switch (type.kind) {
    case "type-reference":
      identifiers.add(type.name);
      return;
    case "union-type-member":
    case "parameterized-type-argument":
      collectIdentifierIdsFromType(type.valueType, identifiers);
      return;
    case "array-type":
      collectIdentifierIdsFromType(type.item, identifiers);
      return;
    case "object-type-property":
    case "object-type-additional-properties":
      collectIdentifierIdsFromType(type.valueType, identifiers);
      return;
    case "object-type":
      for (const property of type.properties) {
        collectIdentifierIdsFromType(property, identifiers);
      }
      if (type.additionalProperties !== undefined) {
        collectIdentifierIdsFromType(type.additionalProperties, identifiers);
      }
      return;
    case "union-type":
      for (const member of type.members) {
        collectIdentifierIdsFromType(member.valueType, identifiers);
      }
      return;
    case "nullable-type":
      collectIdentifierIdsFromType(type.base, identifiers);
      return;
    case "parameterized-type-instantiation":
      collectIdentifierIdsFromType(type.base, identifiers);
      for (const argument of type.args) {
        collectIdentifierIdsFromType(argument.valueType, identifiers);
      }
      return;
    case "primitive-type":
    case "string-type-literal":
    case "integer-type-literal":
    case "boolean-type-literal":
    case "null-type-literal":
      return;
    default: {
      const exhaustive: never = type;
      throw new Error(`Unsupported type kind: ${(exhaustive as { kind: string }).kind}`);
    }
  }
}
