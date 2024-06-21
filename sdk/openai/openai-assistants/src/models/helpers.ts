// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */
import {
  CodeInterpreterToolCallDetailsOutput,
  RequiredToolCallOutput,
  ToolCallOutput,
} from "../rest/outputModels.js";
import { CodeInterpreterToolCallDetails, RequiredToolCall, ToolCall } from "./models.js";
import { camelCaseKeys } from "../api/util.js";

export function parseRequiredToolCallOutput(
  requiredToolCallOutput: RequiredToolCallOutput,
): RequiredToolCall {
  return {
    type: "function",
    id: requiredToolCallOutput.id,
    function: requiredToolCallOutput.function,
  } as RequiredToolCall;
}

export function parseToolCallOutput(toolCallOutput: ToolCallOutput): ToolCall {
  const { id, type } = toolCallOutput;
  switch (type) {
    case "function":
      return { type, id, function: toolCallOutput.function };
    case "retrieval":
      return { type, id, retrieval: toolCallOutput.retrieval };
    case "code_interpreter":
      return {
        type,
        id,
        codeInterpreter: parseCodeInterpreterToolCallDetailsOutput(toolCallOutput.code_interpreter),
      };
    default:
      throw new Error(`Unknown tool call type: ${type}`);
  }
}

function parseCodeInterpreterToolCallDetailsOutput(
  codeInterpreterToolCallDetailsOutput: CodeInterpreterToolCallDetailsOutput,
): CodeInterpreterToolCallDetails {
  const { ...rest } = codeInterpreterToolCallDetailsOutput;
  return { ...camelCaseKeys(rest) };
}
