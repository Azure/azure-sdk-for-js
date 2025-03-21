// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequiredAction, RequiredToolCall, ToolDefinition } from "../../models/agents/index.js";
/**
 * Determines if the given output is of the specified type.
 *
 * @typeparam T - The type to check against, which extends one of the possible output parent types.
 * @param output - The action to check, which can be of type `RequiredActionOutput`, `RequiredToolCallOutput`, or `ToolDefinitionOutputParent`.
 * @param type - The type to check the action against.
 * @returns A boolean indicating whether the action is of the specified type.
 */
export function isOutputOfType<T extends { type: string }>(
  output: RequiredAction | RequiredToolCall | ToolDefinition,
  type: string,
): output is T {
  return output.type === type;
}
