import {
  ChatCompletionDelta,
  ChatCompletionOptions,
  CreateOptions,
} from "../../generated/src/models/index.js";
import { Create200Response, CreateStreaming200Response } from "../../generated/src/rest/index.js";
import { _createDeserialize } from "../../generated/src/api/operations.js";

import { CompletionOptions } from "../models/options.js";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { streamJSONLines } from "./streaming.js";
import { ChatProtocolContext as Client } from "../rest/clientDefinitions.js";
import { ChatMessage } from "../models/models.js";

function _createStreamingSend(
  context: Client,
  messages: ChatMessage[],
  options: CompletionOptions = { requestOptions: {} }
): StreamableMethod<CreateStreaming200Response> {
  return context.path(context.chatRoute).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: messages,
      stream: true,
      sessionState: options.sessionState,
      context: options.context,
    },
  });
}

function _createStreamingDeserialize(body: any): ChatCompletionDelta {
  return {
    choices: (body["choices"] ?? []).map((p: any) => ({
      index: p["index"],
      delta: {
        content: p.delta["content"],
        role: p.delta["role"],
        sessionState: p.delta["sessionState"],
      },
      sessionState: p["sessionState"],
      context: p["context"],
      finishReason: p["finishReason"],
    })),
  };
}

/** Creates a new streaming chat completion. */
export function createStreaming(
  context: Client,
  messages: ChatMessage[],
  options: CompletionOptions = { requestOptions: {} }
): AsyncIterable<ChatCompletionDelta> {
  const result = _createStreamingSend(context, messages, options);
  return streamJSONLines(result, _createStreamingDeserialize);
}

export function _createSend(
  context: Client,
  operationRoute: string,
  body: ChatCompletionOptions,
  options: CreateOptions = { requestOptions: {} }
): StreamableMethod<Create200Response> {
  return context.path(operationRoute).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: body.messages as any,
      stream: body["stream"],
      sessionState: body["sessionState"],
      context: body["context"],
    },
  });
}
