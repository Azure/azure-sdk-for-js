// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Stack } from "../../constructs/stack.js";
import type { ResourceDeclaration } from "../../constructs/resource/resource.js";
import { collectResourceDeclarations } from "../../constructs/resource/resource-query.js";
import type { InfraNode, SerializationDocument } from "../ast/index.js";
import { buildStackDeclarations } from "../ast/declaration-builder.js";
import { createSymbolMap, type DeclarationSymbolMap } from "../symbol-map.js";

function serializeFile(
  stack: Stack,
  resources: readonly ResourceDeclaration[],
  symbolMap: DeclarationSymbolMap,
): InfraNode {
  return {
    ...(stack.targetScope !== "resourceGroup" ? { targetScope: stack.targetScope } : {}),
    fileName: `${stack.name}.bicep`,
    ...buildStackDeclarations(stack, resources, symbolMap),
  };
}

/**
 * Serializes a stack or a nonempty array of stacks into a JSON-compatible
 * {@link SerializationDocument} with one `infras` entry per stack.
 *
 * The document preserves declarations and symbolic expressions for rendering
 * or restoration. Pass `JSON.stringify(serialize(stack))` to {@link deserialize}
 * to reconstruct the authored stack; this does not deploy any resources.
 */
export function serialize(input: Stack | readonly Stack[]): SerializationDocument {
  const stacks = Array.isArray(input) ? input : [input];
  if (stacks.length === 0) {
    throw new Error("Cannot serialize an empty stack collection.");
  }

  return {
    infras: stacks.map((stack) => {
      const resources = collectResourceDeclarations(stack);
      const symbolMap = createSymbolMap(resources, stack);
      return serializeFile(stack, resources, symbolMap);
    }),
  };
}
