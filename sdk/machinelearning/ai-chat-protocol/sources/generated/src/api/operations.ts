// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  StreamingChatCompletionOptions,
  ChatCompletionDelta,
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
  operationRoute: string,
  body: StreamingChatCompletionOptions,
  options: CreateStreamingOptions = { requestOptions: {} }
): StreamableMethod<CreateStreaming200Response> {
  return context.path("/{operationRoute}", operationRoute).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: body.messages as any,
      stream: body["stream"],
      sessionState: body["sessionState"],
      context: body["context"],
    },
  }) as StreamableMethod<CreateStreaming200Response>;
}

export async function _createStreamingDeserialize(
  result: CreateStreaming200Response
): Promise<ChatCompletionDelta> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    choices: result.body["choices"].map((p) => ({
      index: p["index"],
      delta: {
        kind: p.delta["kind"],
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
export async function createStreaming(
  context: Client,
  operationRoute: string,
  body: StreamingChatCompletionOptions,
  options: CreateStreamingOptions = { requestOptions: {} }
): Promise<ChatCompletionDelta> {
  const result = await _createStreamingSend(context, operationRoute, body, options);
  return _createStreamingDeserialize(result);
}

export function _createSend(
  context: Client,
  operationRoute: string,
  body: ChatCompletionOptions,
  options: CreateOptions = { requestOptions: {} }
): StreamableMethod<Create200Response> {
  return context.path("/{operationRoute}", operationRoute).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: body.messages as any,
      stream: body["stream"],
      sessionState: body["sessionState"],
      context: body["context"],
    },
  }) as StreamableMethod<Create200Response>;
}

export async function _createDeserialize(result: Create200Response): Promise<ChatCompletion> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    choices: result.body["choices"].map((p) => ({
      index: p["index"],
      message: p.message as any,
      sessionState: p["sessionState"],
      context: p["context"],
      finishReason: p["finishReason"],
    })),
  };
}

/** Creates a new chat completion. */
export async function create(
  context: Client,
  operationRoute: string,
  body: ChatCompletionOptions,
  options: CreateOptions = { requestOptions: {} }
): Promise<ChatCompletion> {
  const result = await _createSend(context, operationRoute, body, options);
  return _createDeserialize(result);
}
