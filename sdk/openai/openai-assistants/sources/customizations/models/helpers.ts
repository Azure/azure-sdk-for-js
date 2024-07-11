// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ToolCallOutput, RequiredToolCallOutput } from "../rest/outputModels.js";
import { CodeInterpreterToolCallDetailsOutput } from "../../generated/src/rest/outputModels.js";
import {
  CodeInterpreterToolCallDetails,
  RequiredToolCall,
  ToolCall,
} from "../../generated/src/models/models.js";
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
