// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  StreamingChatCompletionOptions,
  ChatCompletionChunk,
  ChatCompletionOptions,
  ChatCompletion,
} from "../models/models.js";
import {
  isUnexpected,
  ChatProtocolContext as Client,
  Create200Response,
  CreateDefaultResponse,
  CreateStreaming200Response,
  CreateStreamingDefaultResponse,
} from "../rest/index.js";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { CreateStreamingOptions, CreateOptions } from "../models/options.js";

export function _createStreamingSend(
  context: Client,
  body: StreamingChatCompletionOptions,
  options: CreateStreamingOptions = { requestOptions: {} }
): StreamableMethod<CreateStreaming200Response | CreateStreamingDefaultResponse> {
  return context.path("/chat").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: body.messages as any,
      stream: body["stream"],
      session_state: body["sessionState"],
      context: body["context"],
    },
  });
}

export async function _createStreamingDeserialize(
  result: CreateStreaming200Response | CreateStreamingDefaultResponse
): Promise<ChatCompletionChunk> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    choices: (result.body["choices"] ?? []).map((p) => ({
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
export async function createStreaming(
  context: Client,
  body: StreamingChatCompletionOptions,
  options: CreateStreamingOptions = { requestOptions: {} }
): Promise<ChatCompletionChunk> {
  const result = await _createStreamingSend(context, body, options);
  return _createStreamingDeserialize(result);
}

export function _createSend(
  context: Client,
  body: ChatCompletionOptions,
  options: CreateOptions = { requestOptions: {} }
): StreamableMethod<Create200Response | CreateDefaultResponse> {
  return context.path("/chat").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: body.messages as any,
      stream: body["stream"],
      session_state: body["sessionState"],
      context: body["context"],
    },
  });
}

export async function _createDeserialize(
  result: Create200Response | CreateDefaultResponse
): Promise<ChatCompletion> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    choices: (result.body["choices"] ?? []).map((p) => ({
      index: p["index"],
      message: p.message as any,
      sessionState: p["session_state"],
      context: p["context"],
      finishReason: p["finish_reason"],
    })),
  };
}

/** Creates a new chat completion. */
export async function create(
  context: Client,
  body: ChatCompletionOptions,
  options: CreateOptions = { requestOptions: {} }
): Promise<ChatCompletion> {
  const result = await _createSend(context, body, options);
  return _createDeserialize(result);
}
