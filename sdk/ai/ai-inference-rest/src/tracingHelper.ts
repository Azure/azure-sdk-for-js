// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import type { TracingSpan } from "@azure/core-tracing";
import { isError } from "@azure/core-util";
import type {
  ChatRequestAssistantMessage,
  ChatRequestMessage,
  ChatRequestSystemMessage,
  ChatRequestToolMessage,
} from "./models.js";
import type {
  ChatChoiceOutput,
  ChatCompletionsOutput,
  ChatCompletionsToolCallOutput,
} from "./outputModels.js";
import type { GetChatCompletionsBodyParam } from "./parameters.js";
/*
* Add event to span.  Sample:
    {
    name: 'gen_ai.user.message',
    attributes: {
      'gen_ai.system': 'INFERENCE_GEN_AI_SYSTEM_NAME',
      'gen_ai.event.content': `{"role":"user","content":"What's the weather like in Boston?"}`  
    },
    time: [ 1725666879, 622695900 ],
    droppedAttributesCount: 0
  },
*/
/*
* Add event to span.  Sample:
{
  name: 'gen_ai.choice',
  attributes: {
    'gen_ai.system': 'INFERENCE_GEN_AI_SYSTEM_NAME',
    'gen_ai.event.content': '{"finish_reason":"tool_calls","index":0,"message":{"content":""}}'
  },
  time: [ 1725666881, 780608000 ],
  droppedAttributesCount: 0
}  
*/

enum TracingAttributesEnum {
  Operation_Name = "gen_ai.operation.name",
  Request_Model = "gen_ai.request.model",
  System = "gen_ai.system",
  Error_Type = "error.type",
  Server_Port = "server.port",
  Request_Frequency_Penalty = "gen_ai.request.frequency_penalty",
  Request_Max_Tokens = "gen_ai.request.max_tokens",
  Request_Presence_Penalty = "gen_ai.request.presence_penalty",
  Request_Stop_Sequences = "gen_ai.request.stop_sequences",
  Request_Temperature = "gen_ai.request.temperature",
  Request_Top_P = "gen_ai.request.top_p",
  Response_Finish_Reasons = "gen_ai.response.finish_reasons",
  Response_Id = "gen_ai.response.id",
  Response_Model = "gen_ai.response.model",
  Usage_Input_Tokens = "gen_ai.usage.input_tokens",
  Usage_Output_Tokens = "gen_ai.usage.output_tokens",
  Server_Address = "server.address",
}

const INFERENCE_GEN_AI_SYSTEM_NAME = "az.ai.inference";

const isContentRecordingEnabled = (): boolean =>
  envVarToBoolean("AZURE_TRACING_GEN_AI_CONTENT_RECORDING_ENABLED");

export function getRequestBody(request: PipelineRequest): GetChatCompletionsBodyParam {
  return { body: JSON.parse(request.body as string) };
}

export function getSpanName(request: PipelineRequest): string {
  const { body } = getRequestBody(request);
  return `chat ${body?.model ?? ""}`.trim();
}

export function onStartTracing(span: TracingSpan, request: PipelineRequest, url: string): void {
  if (!span.isRecording()) {
    return;
  }

  const urlObj = new URL(url);
  const port = Number(urlObj.port) || (urlObj.protocol === "https:" ? undefined : 80);
  if (port) {
    span.setAttribute(TracingAttributesEnum.Server_Port, port);
  }

  span.setAttribute(TracingAttributesEnum.Server_Address, urlObj.hostname);
  span.setAttribute(TracingAttributesEnum.Operation_Name, "chat");
  span.setAttribute(TracingAttributesEnum.System, "az.ai.inference");
  const { body } = getRequestBody(request);
  if (!body) return;
  span.setAttribute(TracingAttributesEnum.Request_Model, body.model);
  span.setAttribute(TracingAttributesEnum.Request_Frequency_Penalty, body.frequency_penalty);
  span.setAttribute(TracingAttributesEnum.Request_Max_Tokens, body.max_tokens);
  span.setAttribute(TracingAttributesEnum.Request_Presence_Penalty, body.presence_penalty);
  span.setAttribute(TracingAttributesEnum.Request_Stop_Sequences, body.stop);
  span.setAttribute(TracingAttributesEnum.Request_Temperature, body.temperature);
  span.setAttribute(TracingAttributesEnum.Request_Top_P, body.top_p);
  if (body.messages) {
    addRequestChatMessageEvent(span, body.messages);
  }
}

export function tryProcessResponse(span: TracingSpan, response?: PipelineResponse): void {
  if (!span.isRecording()) {
    return;
  }

  if (response?.bodyAsText) {
    const body: any = JSON.parse(response.bodyAsText);
    if (body.error ?? body.message) {
      span.setAttribute(TracingAttributesEnum.Error_Type, `${body.status ?? body.statusCode}`);
      span.setStatus({
        status: "error",
        error: body.error ?? body.message, // message is not in the schema of the response, but it can present if there is crediential error
      });
    }
    span.setAttribute(TracingAttributesEnum.Response_Id, body.id);
    span.setAttribute(TracingAttributesEnum.Response_Model, body.model);
    if (body.choices) {
      span.setAttribute(
        TracingAttributesEnum.Response_Finish_Reasons,
        body.choices.map((choice: ChatChoiceOutput) => choice.finish_reason).join(","),
      );
    }
    if (body.usage) {
      span.setAttribute(TracingAttributesEnum.Usage_Input_Tokens, body.usage.prompt_tokens);
      span.setAttribute(TracingAttributesEnum.Usage_Output_Tokens, body.usage.completion_tokens);
    }
    addResponseChatMessageEvent(span, body);
  }
}

export function tryProcessError(span: TracingSpan, error: unknown): void {
  span.setStatus({
    status: "error",
    error: isError(error) ? error : undefined,
  });
}

function addRequestChatMessageEvent(span: TracingSpan, messages: Array<ChatRequestMessage>): void {
  messages.forEach((message: any) => {
    if (message.role) {
      const content: {
        content?: string;
        tool_calls?: Array<ChatCompletionsToolCallOutput>;
        id?: string;
      } = {};

      const chatMsg = message as ChatRequestSystemMessage;
      if (chatMsg.content) {
        content.content = chatMsg.content;
      }
      if (!isContentRecordingEnabled()) {
        content.content = "";
      }

      const assistantMsg = message as ChatRequestAssistantMessage;
      if (assistantMsg.tool_calls) {
        content.tool_calls = assistantMsg.tool_calls;
        if (!isContentRecordingEnabled()) {
          const toolCalls: Array<ChatCompletionsToolCallOutput> = JSON.parse(
            JSON.stringify(content.tool_calls),
          );
          toolCalls.forEach((toolCall) => {
            if (toolCall.function.arguments) {
              toolCall.function.arguments = "";
            }
            toolCall.function.name = "";
          });
          content.tool_calls = toolCalls;
        }
      }

      const toolMsg: ChatRequestToolMessage = message;
      if (toolMsg.tool_call_id) {
        content.id = toolMsg.tool_call_id;
      }

      span.addEvent?.(`gen_ai.${message.role}.message`, {
        attributes: {
          "gen_ai.system": INFERENCE_GEN_AI_SYSTEM_NAME,
          "gen_ai.event.content": JSON.stringify(content),
        },
      });
    }
  });
}

function addResponseChatMessageEvent(span: TracingSpan, body: ChatCompletionsOutput): void {
  if (!span.addEvent) {
    return;
  }

  body?.choices?.forEach((choice: ChatChoiceOutput) => {
    let message: { content?: string; toolCalls?: Array<ChatCompletionsToolCallOutput> } = {};

    if (choice.message.content) {
      message.content = choice.message.content;
    }
    if (choice.message.tool_calls) {
      message.toolCalls = choice.message.tool_calls;
    }

    if (!isContentRecordingEnabled()) {
      message = JSON.parse(JSON.stringify(message));
      message.content = "";
      if (message.toolCalls) {
        message.toolCalls.forEach((toolCall) => {
          if (toolCall.function.arguments) {
            toolCall.function.arguments = "";
          }
          toolCall.function.name = "";
        });
      }
    }

    const response = {
      finish_reason: choice.finish_reason,
      index: choice.index,
      message,
    };
    const attributes = {
      "gen_ai.system": INFERENCE_GEN_AI_SYSTEM_NAME,
      "gen_ai.event.content": JSON.stringify(response),
    };

    span.addEvent?.("gen_ai.choice", { attributes });
  });
}

function envVarToBoolean(key: string): boolean {
  const value = process.env[key] ?? process.env[key.toLowerCase()];
  return value !== "false" && value !== "0" && Boolean(value);
}
