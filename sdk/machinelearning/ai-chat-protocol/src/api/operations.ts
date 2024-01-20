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
  CreateStreaming200Response,
} from "../rest/index.js";
import { streamJSONLines } from "./streaming.js";

export async function _createDeserialize(result: Create200Response): Promise<ChatCompletion> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    choices: (result.body["choices"] ?? []).map((p) => ({
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

/** Creates a new streaming chat completion. */
export function createStreaming(
  context: Client,
  messages: ChatMessage[],
  options: CompletionOptions = { requestOptions: {} }
): AsyncIterable<ChatCompletionChunk> {
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

function _createStreamingDeserialize(body: any): ChatCompletionChunk {
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
