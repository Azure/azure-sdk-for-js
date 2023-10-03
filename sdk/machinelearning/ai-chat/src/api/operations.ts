// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatMessage,
  ChatCompletion,
  ChatCompletionChunk,
} from "../models/models.js";
import {
  ChatContext as Client,
  Create200Response,
  CreateStreaming200Response,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { CreateOptions, CreateStreamingOptions } from "../models/options.js";

export function _createSend(
  context: Client,
  messages: ChatMessage[],
  stream: true,
  sessionState: any,
  extraArguments: Record<string, any>,
  options: CreateOptions = { requestOptions: {} }
): StreamableMethod<Create200Response> {
  return context
    .path("/chat")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: (messages ?? []).map((p) => ({
          content: p["content"],
          role: p["role"],
          session_state: p["sessionState"],
        })),
        stream: stream,
        session_state: sessionState,
        extra_args: extraArguments,
      },
    });
}

export async function _createDeserialize(
  result: Create200Response
): Promise<ChatCompletion> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    choices: (result.body["choices"] ?? []).map((p) => ({
      index: p["index"],
      message: p.message as any,
      extraArguments: p["extra_args"],
      sessionState: p["session_state"],
      finishReason: p["finishReason"],
    })),
  };
}

/** placeholder */
export async function create(
  context: Client,
  messages: ChatMessage[],
  stream: true,
  sessionState: any,
  extraArguments: Record<string, any>,
  options: CreateOptions = { requestOptions: {} }
): Promise<ChatCompletion> {
  const result = await _createSend(
    context,
    messages,
    stream,
    sessionState,
    extraArguments,
    options
  );
  return _createDeserialize(result);
}

export function _createStreamingSend(
  context: Client,
  messages: ChatMessage[],
  stream: false,
  sessionState: any,
  extraArguments: Record<string, any>,
  options: CreateStreamingOptions = { requestOptions: {} }
): StreamableMethod<CreateStreaming200Response> {
  return context
    .path("/chat")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: (messages ?? []).map((p) => ({
          content: p["content"],
          role: p["role"],
          session_state: p["sessionState"],
        })),
        stream: stream,
        session_state: sessionState,
        extra_args: extraArguments,
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
      extraArguments: p["extra_args"],
      sessionState: p["session_state"],
      finishReason: p["finishReason"],
    })),
  };
}

/** placeholder */
export async function createStreaming(
  context: Client,
  messages: ChatMessage[],
  stream: false,
  sessionState: any,
  extraArguments: Record<string, any>,
  options: CreateStreamingOptions = { requestOptions: {} }
): Promise<ChatCompletionChunk> {
  const result = await _createStreamingSend(
    context,
    messages,
    stream,
    sessionState,
    extraArguments,
    options
  );
  return _createStreamingDeserialize(result);
}
