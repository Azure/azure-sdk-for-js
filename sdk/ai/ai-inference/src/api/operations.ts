// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatCompletions,
  ModelInfo,
  ChatRequestMessageUnion,
} from "../models/models.js";
import { serializeChatRequestMessageUnion } from "../utils/serializeUtil.js";
import {
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetModelInfo200Response,
  GetModelInfoDefaultResponse,
  isUnexpected,
  ModelClientContext as Client,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  CompleteOptionalParams,
  GetModelInfoOptionalParams,
} from "../models/options.js";

export function _completeSend(
  context: Client,
  messages: ChatRequestMessageUnion[],
  options: CompleteOptionalParams = { requestOptions: {} },
): StreamableMethod<
  GetChatCompletions200Response | GetChatCompletionsDefaultResponse
> {
  return context
    .path("/chat/completions")
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.unknownParams !== undefined
          ? { "unknown-parameters": options?.unknownParams }
          : {}),
      },
      body: {
        messages: messages.map((p) => serializeChatRequestMessageUnion(p)),
        frequency_penalty: options?.frequencyPenalty,
        stream: options?.stream,
        presence_penalty: options?.presencePenalty,
        temperature: options?.temperature,
        top_p: options?.topP,
        max_tokens: options?.maxTokens,
        response_format: options?.responseFormat,
        stop: options?.stop,
        tools: options?.tools,
        tool_choice: options?.toolChoice,
        seed: options?.seed,
      },
    });
}

export async function _completeDeserialize(
  result: GetChatCompletions200Response | GetChatCompletionsDefaultResponse,
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    model: result.body["model"],
    usage: {
      capacityType: result.body.usage["capacity_type"],
      completionTokens: result.body.usage["completion_tokens"],
      promptTokens: result.body.usage["prompt_tokens"],
      totalTokens: result.body.usage["total_tokens"],
    },
    choices: result.body["choices"].map((p) => ({
      index: p["index"],
      finishReason: p["finish_reason"],
      message: {
        role: p.message["role"],
        content: p.message["content"],
        toolCalls:
          p.message["tool_calls"] === undefined
            ? p.message["tool_calls"]
            : p.message["tool_calls"],
      },
    })),
  };
}

/**
 * Gets chat completions for the provided chat messages.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export async function complete(
  context: Client,
  messages: ChatRequestMessageUnion[],
  options: CompleteOptionalParams = { requestOptions: {} },
): Promise<ChatCompletions> {
  const result = await _completeSend(context, messages, options);
  return _completeDeserialize(result);
}

export function _getModelInfoSend(
  context: Client,
  options: GetModelInfoOptionalParams = { requestOptions: {} },
): StreamableMethod<GetModelInfo200Response | GetModelInfoDefaultResponse> {
  return context
    .path("/info")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getModelInfoDeserialize(
  result: GetModelInfo200Response | GetModelInfoDefaultResponse,
): Promise<ModelInfo> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    modelName: result.body["model_name"],
    modelType: result.body["model_type"],
    modelProviderName: result.body["model_provider_name"],
  };
}

/** Returns information about the AI model. */
export async function getModelInfo(
  context: Client,
  options: GetModelInfoOptionalParams = { requestOptions: {} },
): Promise<ModelInfo> {
  const result = await _getModelInfoSend(context, options);
  return _getModelInfoDeserialize(result);
}
