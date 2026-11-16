// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ParameterMetadata } from "../constructs/parameter.js";
import type { VariableMetadata } from "../constructs/variable.js";
import type { Stack } from "../constructs/stack.js";
import type { ResourceDeclaration } from "../constructs/resource/resource.js";
import type { ExpressionNode } from "../expression/ast-nodes.js";
import { unwrapExpression } from "../expression/expressions.js";
import { sanitizeIdentifier } from "./identifiers.js";
import pluralizeLib from "./pluralize-config.js";

/** Maps authored declarations and expression handles to emitted identifiers. */
export type DeclarationSymbolMap = Map<
  ResourceDeclaration | ExpressionNode | ParameterMetadata | VariableMetadata,
  string
>;

/** Allocates declaration symbols in one Stack's serialization namespace. */
export function createSymbolMap(
  resources: readonly ResourceDeclaration[],
  stack: Stack,
  resourceNameOverrides: ReadonlyMap<string, string> = new Map(),
): DeclarationSymbolMap {
  const symbolMap: DeclarationSymbolMap = new Map();
  const counts = new Map<string, number>();
  const usedNames = new Set<string>();

  function allocateName(stem: string): string {
    let count = counts.get(stem) ?? 0;
    let identifier: string;
    do {
      count++;
      identifier = count === 1 ? stem : `${stem}${count}`;
    } while (usedNames.has(identifier));
    counts.set(stem, count);
    usedNames.add(identifier);
    return identifier;
  }

  for (const parameter of stack.parameters.listMetadata()) {
    const identifier = allocateName(parameter.name);
    symbolMap.set(parameter, identifier);
    symbolMap.set(unwrapExpression(stack.parameters.get(parameter.name)!), identifier);
  }
  for (const variable of stack.variables.listMetadata()) {
    const identifier = allocateName(variable.name);
    symbolMap.set(variable, identifier);
    symbolMap.set(unwrapExpression(stack.variables.get(variable.name)!), identifier);
  }
  for (const resource of resources) {
    const typeName = resource.type.split("/").at(-1) ?? "resource";
    const stem = sanitizeIdentifier(pluralizeLib.singular(typeName));
    symbolMap.set(resource, allocateName(resourceNameOverrides.get(stem) ?? stem));
  }

  // Outputs have a separate namespace and are not same-stack expression targets.
  return symbolMap;
}
