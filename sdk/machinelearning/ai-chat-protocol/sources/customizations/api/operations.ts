import { ChatCompletionChunk, ChatMessage } from "../../generated/src/models/index.js";
import {
  ChatProtocolContext as Client,
  CreateStreaming200Response,
} from "../../generated/src/rest/index.js";
import { _createDeserialize, _createSend } from "../../generated/src/api/operations.js";

import { CompletionOptions } from "../models/options.js";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { streamSSEs } from "./streaming.js";

function _createStreamingSend(
  context: Client,
  messages: ChatMessage[],
  options: CompletionOptions = { requestOptions: {} }
): StreamableMethod<CreateStreaming200Response> {
  return context.path("/chat").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: messages,
      stream: true,
      session_state: options.sessionState,
      context: options.context,
    },
  });
}

function _createStreamingDeserialize(body: any): ChatCompletionChunk {
  return {
    choices: (body["choices"] ?? []).map((p: any) => ({
      index: p["index"],
      delta: {
        content: p.delta["content"],
        role: p.delta["role"],
        sessionState: p.delta["session_state"],
      },
      sessionState: p["session_state"],
      context: p["context"],
      finishReason: p["finish_reason"],
    })),
  };
}

/** Creates a new streaming chat completion. */
export function createStreaming(
  context: Client,
  messages: ChatMessage[],
  options: CompletionOptions = { requestOptions: {} }
): AsyncIterable<ChatCompletionChunk> {
  const result = _createStreamingSend(context, messages, options);
  return streamSSEs(result, _createStreamingDeserialize);
}
