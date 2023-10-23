// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  StreamingChatCompletionOptions,
  ChatCompletionChunk,
  ChatCompletionOptions,
  ChatCompletion,
} from "../models/models.js";
import {
  ChatProtocolContext as Client,
  Create200Response,
  CreateStreaming200Response,
} from "../rest/index.js";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { CreateStreamingOptions, CreateOptions } from "../models/options.js";

export function _createStreamingSend(
  context: Client,
  body: StreamingChatCompletionOptions,
  options: CreateStreamingOptions = { requestOptions: {} }
): StreamableMethod<CreateStreaming200Response> {
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
  result: CreateStreaming200Response
): Promise<ChatCompletionChunk> {
  if (result.status !== "200") {
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
): StreamableMethod<Create200Response> {
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

export async function _createDeserialize(result: Create200Response): Promise<ChatCompletion> {
  if (result.status !== "200") {
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
