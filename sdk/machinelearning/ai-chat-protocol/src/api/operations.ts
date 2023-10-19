// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import {
  ChatCompletion,
  ChatCompletionChunk,
  ChatCompletionOptions,
  ChatMessage,
} from "../models/models.js";
import { CompletionOptions, CreateOptions } from "../models/options.js";
import {
  ChatProtocolContext as Client,
  Create200Response,
  CreateDefaultResponse,
  CreateStreaming200Response,
  CreateStreamingDefaultResponse,
  isUnexpected,
} from "../rest/index.js";
import { streamSSEs } from "./streaming.js";

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

/** Creates a new streaming chat completion. */
export function createStreaming(
  context: Client,
  messages: ChatMessage[],
  options: CompletionOptions = { requestOptions: {} }
): AsyncIterable<ChatCompletionChunk> {
  const result = _createStreamingSend(context, messages, options);
  return streamSSEs(result, _createStreamingDeserialize);
}

function _createStreamingSend(
  context: Client,
  messages: ChatMessage[],
  options: CompletionOptions = { requestOptions: {} }
): StreamableMethod<CreateStreaming200Response | CreateStreamingDefaultResponse> {
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
