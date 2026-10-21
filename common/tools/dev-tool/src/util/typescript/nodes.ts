// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ModifierLike, ModifiersBase, Node } from "typescript/ast";

/**
 * Gets the modifiers of nodes that can have them (declarations and statements), and nothing for all other nodes.
 */
export function getModifiers(node: Node): readonly ModifierLike[] | undefined {
  return (node as Partial<ModifiersBase>).modifiers;
}
