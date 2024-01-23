// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ToolCall } from "./models.js";
import { ToolCallOutput } from "../rest/outputModels.js";

export function parseToolCallOutput(toolCallOutput: ToolCallOutput): ToolCall {
  const { id } = toolCallOutput;
  const toolCall: { id: string, type: string, function: any, retrieval: any, codeInterpreter: any } = { id, type: "", function: {}, retrieval: {}, codeInterpreter: {}};
  switch (toolCallOutput.type) {
    case "function":
      toolCall.type = toolCallOutput.type as "function";
      toolCall.function = toolCallOutput.function;
      break;
    case "retrieval":
      toolCall.type = toolCallOutput.type as "retrieval";
      toolCall.retrieval = toolCallOutput.retrieval;
      break;
    case "code_interpreter":
      toolCall.type = toolCallOutput.type as "code_interpreter";
      toolCall.codeInterpreter = toolCallOutput.code_interpreter;
      break;
    default:
      throw new Error(`Unknown tool call type: ${toolCall.type}`);
  }

  return toolCall as ToolCall;
}
