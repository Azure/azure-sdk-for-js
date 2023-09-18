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
  ChatCompletions,
  ChatMessage,
  Completions,
  Embeddings,
  ImageGenerations,
  ImageLocation,
} from "../models/models.js";
import {
  GetChatCompletionsOptions as GeneratedGetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetCompletionsOptions,
  GetEmbeddingsOptions,
  ImageGenerationOptions,
} from "../models/options.js";
import {
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
  BeginAzureBatchImageGenerationLogicalResponse,
  ChatMessage as GeneratedChatMessage,
  OpenAIContext as Client,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  ImageGenerationsOutput,
  ImagePayloadOutput,
  getLongRunningPoller,
  isUnexpected,
} from "../rest/index.js";
import { getChatCompletionsResult, getCompletionsResult } from "./deserializers.js";
import { getOaiSSEs } from "./oaiSse.js";
import { GetChatCompletionsOptions } from "./models.js";

export function _getEmbeddingsSend(
  context: Client,
  input: string[],
  deploymentId: string,
  options: GetEmbeddingsOptions = { requestOptions: {} }
): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/embeddings", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: { user: options?.user, model: options?.model, input: input },
  });
}

export async function _getEmbeddingsDeserialize(
  result: GetEmbeddings200Response | GetEmbeddingsDefaultResponse
): Promise<Embeddings> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    data: (result.body["data"] ?? []).map((p) => ({
      embedding: p["embedding"],
      index: p["index"],
    })),
    usage: {
      promptTokens: result.body.usage["prompt_tokens"],
      totalTokens: result.body.usage["total_tokens"],
    },
  };
}

/** Return the embeddings for a given prompt. */
export async function getEmbeddings(
  context: Client,
  input: string[],
  deploymentId: string,
  options: GetEmbeddingsOptions = { requestOptions: {} }
): Promise<Embeddings> {
  const result = await _getEmbeddingsSend(context, input, deploymentId, options);
  return _getEmbeddingsDeserialize(result);
}

export function _getCompletionsSend(
  context: Client,
  prompt: string[],
  deploymentId: string,
  options: GetCompletionsOptions = { requestOptions: {} }
): StreamableMethod<GetCompletions200Response | GetCompletionsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/completions", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      prompt: prompt,
      max_tokens: options?.maxTokens,
      temperature: options?.temperature,
      top_p: options?.topP,
      logit_bias: options?.logitBias,
      user: options?.user,
      n: options?.n,
      logprobs: options?.logprobs,
      echo: options?.echo,
      stop: options?.stop,
      presence_penalty: options?.presencePenalty,
      frequency_penalty: options?.frequencyPenalty,
      best_of: options?.bestOf,
      stream: options?.stream,
      model: options?.model,
    },
  });
}

export async function _getCompletionsDeserialize(
  result: GetCompletions200Response | GetCompletionsDefaultResponse
): Promise<Completions> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    promptFilterResults: (result.body["prompt_annotations"] ?? []).map((p) => ({
      promptIndex: p["prompt_index"],
      contentFilterResults: !p.content_filter_results
        ? undefined
        : {
            sexual: !p.content_filter_results?.sexual
              ? undefined
              : {
                  severity: p.content_filter_results?.sexual?.["severity"],
                  filtered: p.content_filter_results?.sexual?.["filtered"],
                },
            violence: !p.content_filter_results?.violence
              ? undefined
              : {
                  severity: p.content_filter_results?.violence?.["severity"],
                  filtered: p.content_filter_results?.violence?.["filtered"],
                },
            hate: !p.content_filter_results?.hate
              ? undefined
              : {
                  severity: p.content_filter_results?.hate?.["severity"],
                  filtered: p.content_filter_results?.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results?.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results?.self_harm?.["severity"],
                  filtered: p.content_filter_results?.self_harm?.["filtered"],
                },
          },
    })),
    choices: (result.body["choices"] ?? []).map((p) => ({
      text: p["text"],
      index: p["index"],
      contentFilterResults: !p.content_filter_results
        ? undefined
        : {
            sexual: !p.content_filter_results?.sexual
              ? undefined
              : {
                  severity: p.content_filter_results?.sexual?.["severity"],
                  filtered: p.content_filter_results?.sexual?.["filtered"],
                },
            violence: !p.content_filter_results?.violence
              ? undefined
              : {
                  severity: p.content_filter_results?.violence?.["severity"],
                  filtered: p.content_filter_results?.violence?.["filtered"],
                },
            hate: !p.content_filter_results?.hate
              ? undefined
              : {
                  severity: p.content_filter_results?.hate?.["severity"],
                  filtered: p.content_filter_results?.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results?.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results?.self_harm?.["severity"],
                  filtered: p.content_filter_results?.self_harm?.["filtered"],
                },
          },
      logprobs:
        p.logprobs === null
          ? null
          : {
              tokens: p.logprobs["tokens"],
              tokenLogprobs: p.logprobs["token_logprobs"],
              topLogprobs: p.logprobs["top_logprobs"],
              textOffset: p.logprobs["text_offset"],
            },
      finishReason: p["finish_reason"],
    })),
    usage: {
      completionTokens: result.body.usage["completion_tokens"],
      promptTokens: result.body.usage["prompt_tokens"],
      totalTokens: result.body.usage["total_tokens"],
    },
  };
}

/**
 * Gets completions for the provided input prompts.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export async function getCompletions(
  context: Client,
  prompt: string[],
  deploymentId: string,
  options: GetCompletionsOptions = { requestOptions: {} }
): Promise<Completions> {
  const result = await _getCompletionsSend(context, prompt, deploymentId, options);
  return _getCompletionsDeserialize(result);
}

export function _getChatCompletionsSend(
  context: Client,
  messages: ChatMessage[],
  deploymentId: string,
  options: GeneratedGetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<GetChatCompletions200Response | GetChatCompletionsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/chat/completions", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: parseChatMessage(messages),
      functions: options?.functions,
      function_call: options?.functionCall,
      max_tokens: options?.maxTokens,
      temperature: options?.temperature,
      top_p: options?.topP,
      logit_bias: options?.logitBias,
      user: options?.user,
      n: options?.n,
      stop: options?.stop,
      presence_penalty: options?.presencePenalty,
      frequency_penalty: options?.frequencyPenalty,
      stream: options?.stream,
      model: options?.model,
      dataSources: options?.dataSources,
    },
  });
}

export async function _getChatCompletionsDeserialize(
  result: GetChatCompletions200Response | GetChatCompletionsDefaultResponse
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    choices: (result.body["choices"] ?? []).map((p) => ({
      message: !p.message ? undefined : (p.message as any),
      index: p["index"],
      finishReason: p["finish_reason"],
      delta: !p.delta
        ? undefined
        : {
            role: p.delta?.["role"],
            content: p.delta?.["content"],
            name: p.delta?.["name"],
            functionCall: !p.delta?.function_call
              ? undefined
              : {
                  name: p.delta?.function_call?.["name"],
                  arguments: p.delta?.function_call?.["arguments"],
                },
            context: !p.delta?.context
              ? undefined
              : {
                  messages: !p.delta?.context?.messages
                    ? undefined
                    : (p.delta?.context?.messages as any),
                },
          },
      contentFilterResults: !p.content_filter_results
        ? undefined
        : {
            sexual: !p.content_filter_results?.sexual
              ? undefined
              : {
                  severity: p.content_filter_results?.sexual?.["severity"],
                  filtered: p.content_filter_results?.sexual?.["filtered"],
                },
            violence: !p.content_filter_results?.violence
              ? undefined
              : {
                  severity: p.content_filter_results?.violence?.["severity"],
                  filtered: p.content_filter_results?.violence?.["filtered"],
                },
            hate: !p.content_filter_results?.hate
              ? undefined
              : {
                  severity: p.content_filter_results?.hate?.["severity"],
                  filtered: p.content_filter_results?.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results?.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results?.self_harm?.["severity"],
                  filtered: p.content_filter_results?.self_harm?.["filtered"],
                },
          },
    })),
    promptFilterResults: (result.body["prompt_annotations"] ?? []).map((p) => ({
      promptIndex: p["prompt_index"],
      contentFilterResults: !p.content_filter_results
        ? undefined
        : {
            sexual: !p.content_filter_results?.sexual
              ? undefined
              : {
                  severity: p.content_filter_results?.sexual?.["severity"],
                  filtered: p.content_filter_results?.sexual?.["filtered"],
                },
            violence: !p.content_filter_results?.violence
              ? undefined
              : {
                  severity: p.content_filter_results?.violence?.["severity"],
                  filtered: p.content_filter_results?.violence?.["filtered"],
                },
            hate: !p.content_filter_results?.hate
              ? undefined
              : {
                  severity: p.content_filter_results?.hate?.["severity"],
                  filtered: p.content_filter_results?.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results?.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results?.self_harm?.["severity"],
                  filtered: p.content_filter_results?.self_harm?.["filtered"],
                },
          },
    })),
    usage: {
      completionTokens: result.body.usage["completion_tokens"],
      promptTokens: result.body.usage["prompt_tokens"],
      totalTokens: result.body.usage["total_tokens"],
    },
  };
}

export function _getChatCompletionsWithAzureExtensionsSend(
  context: Client,
  messages: ChatMessage[],
  deploymentId: string,
  options: GetChatCompletionsWithAzureExtensionsOptions = { requestOptions: {} }
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/extensions/chat/completions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: parseChatMessage(messages),
        functions: options?.functions,
        function_call: options?.functionCall,
        max_tokens: options?.maxTokens,
        temperature: options?.temperature,
        top_p: options?.topP,
        logit_bias: options?.logitBias,
        user: options?.user,
        n: options?.n,
        stop: options?.stop,
        presence_penalty: options?.presencePenalty,
        frequency_penalty: options?.frequencyPenalty,
        stream: options?.stream,
        model: options?.model,
        dataSources: options?.dataSources,
      },
    });
}

export async function _getChatCompletionsWithAzureExtensionsDeserialize(
  result:
    | GetChatCompletionsWithAzureExtensions200Response
    | GetChatCompletionsWithAzureExtensionsDefaultResponse
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    choices: (result.body["choices"] ?? []).map((p) => ({
      message: !p.message ? undefined : (p.message as any),
      index: p["index"],
      finishReason: p["finish_reason"],
      delta: !p.delta
        ? undefined
        : {
            role: p.delta?.["role"],
            content: p.delta?.["content"],
            name: p.delta?.["name"],
            functionCall: !p.delta?.function_call
              ? undefined
              : {
                  name: p.delta?.function_call?.["name"],
                  arguments: p.delta?.function_call?.["arguments"],
                },
            context: !p.delta?.context
              ? undefined
              : {
                  messages: !p.delta?.context?.messages
                    ? undefined
                    : (p.delta?.context?.messages as any),
                },
          },
      contentFilterResults: !p.content_filter_results
        ? undefined
        : {
            sexual: !p.content_filter_results?.sexual
              ? undefined
              : {
                  severity: p.content_filter_results?.sexual?.["severity"],
                  filtered: p.content_filter_results?.sexual?.["filtered"],
                },
            violence: !p.content_filter_results?.violence
              ? undefined
              : {
                  severity: p.content_filter_results?.violence?.["severity"],
                  filtered: p.content_filter_results?.violence?.["filtered"],
                },
            hate: !p.content_filter_results?.hate
              ? undefined
              : {
                  severity: p.content_filter_results?.hate?.["severity"],
                  filtered: p.content_filter_results?.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results?.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results?.self_harm?.["severity"],
                  filtered: p.content_filter_results?.self_harm?.["filtered"],
                },
          },
    })),
    promptFilterResults: (result.body["prompt_annotations"] ?? []).map((p) => ({
      promptIndex: p["prompt_index"],
      contentFilterResults: !p.content_filter_results
        ? undefined
        : {
            sexual: !p.content_filter_results?.sexual
              ? undefined
              : {
                  severity: p.content_filter_results?.sexual?.["severity"],
                  filtered: p.content_filter_results?.sexual?.["filtered"],
                },
            violence: !p.content_filter_results?.violence
              ? undefined
              : {
                  severity: p.content_filter_results?.violence?.["severity"],
                  filtered: p.content_filter_results?.violence?.["filtered"],
                },
            hate: !p.content_filter_results?.hate
              ? undefined
              : {
                  severity: p.content_filter_results?.hate?.["severity"],
                  filtered: p.content_filter_results?.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results?.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results?.self_harm?.["severity"],
                  filtered: p.content_filter_results?.self_harm?.["filtered"],
                },
          },
    })),
    usage: {
      completionTokens: result.body.usage["completion_tokens"],
      promptTokens: result.body.usage["prompt_tokens"],
      totalTokens: result.body.usage["total_tokens"],
    },
  };
}

/**
 * Gets chat completions for the provided chat messages.
 * This is an Azure-specific version of chat completions that supports integration with configured data sources and
 * other augmentations to the base chat completions capabilities.
 */
export async function getChatCompletionsWithAzureExtensions(
  context: Client,
  messages: ChatMessage[],
  deploymentId: string,
  options: GetChatCompletionsWithAzureExtensionsOptions = { requestOptions: {} }
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsWithAzureExtensionsSend(
    context,
    messages,
    deploymentId,
    options
  );
  return _getChatCompletionsWithAzureExtensionsDeserialize(result);
}

export function _beginAzureBatchImageGenerationSend(
  context: Client,
  prompt: string,
  options: ImageGenerationOptions = { requestOptions: {} }
): StreamableMethod<
  | BeginAzureBatchImageGeneration202Response
  | BeginAzureBatchImageGenerationDefaultResponse
  | BeginAzureBatchImageGenerationLogicalResponse
> {
  return context.path("/images/generations:submit").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      prompt: prompt,
      n: options?.n,
      size: options?.size,
      response_format: options?.responseFormat,
      user: options?.user,
    },
  });
}

export function listCompletions(
  context: Client,
  prompt: string[],
  deploymentName: string,
  options: GetCompletionsOptions = { requestOptions: {} }
): AsyncIterable<Omit<Completions, "usage">> {
  const response = _getCompletionsSend(context, prompt, deploymentName, {
    ...options,
    stream: true,
  });
  return getOaiSSEs(response, getCompletionsResult);
}

export async function getImages(
  context: Client,
  prompt: string,
  options: ImageGenerationOptions = { requestOptions: {} }
): Promise<ImageGenerations> {
  const response = await _beginAzureBatchImageGenerationSend(context, prompt, options);
  if (isUnexpected(response)) {
    // Check for response from OpenAI
    const body = response.body as unknown as ImageGenerations;
    if (body.created && body.data) {
      return body;
    }
    throw response.body.error;
  }

  if (response.status === "202") {
    const poller = await getLongRunningPoller(
      context,
      response as BeginAzureBatchImageGeneration202Response
    );
    const result = await poller.pollUntilDone();
    return getImageResultsDeserialize(result);
  } else {
    return getImageResultsDeserialize(response);
  }
}

export function listChatCompletions(
  context: Client,
  messages: ChatMessage[],
  deploymentName: string,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): AsyncIterable<ChatCompletions> {
  const response = _getChatCompletionsSendX(context, messages, deploymentName, {
    ...options,
    stream: true,
  });
  return getOaiSSEs(response, getChatCompletionsResult);
}

/**
 * Gets chat completions for the provided chat messages.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export async function getChatCompletions(
  context: Client,
  messages: ChatMessage[],
  deploymentId: string,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsSendX(context, messages, deploymentId, options);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  return getChatCompletionsResult(result.body);
}

function convertResultTypes({ created, data }: ImageGenerationsOutput): ImageGenerations {
  if (typeof (data[0] as ImageLocation).url === "string") {
    return {
      created: new Date(created),
      data: data as ImageLocation[],
    };
  } else {
    return {
      created: new Date(created),
      data: data.map((item) => {
        return {
          base64Data: (item as ImagePayloadOutput).b64_json,
        };
      }),
    };
  }
}

function getImageResultsDeserialize(
  response:
    | BeginAzureBatchImageGeneration202Response
    | BeginAzureBatchImageGenerationDefaultResponse
    | BeginAzureBatchImageGenerationLogicalResponse
): ImageGenerations {
  if (isUnexpected(response) || !response.body.result) {
    throw response.body.error;
  }

  const result = response.body.result;
  return convertResultTypes(result);
}

function _getChatCompletionsSendX(
  context: Client,
  messages: ChatMessage[],
  deploymentName: string,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  return options.azureExtensionOptions?.extensions
    ? _getChatCompletionsWithAzureExtensionsSend(context, messages, deploymentName, {
        ...options,
        dataSources: options.azureExtensionOptions?.extensions,
      })
    : _getChatCompletionsSend(context, messages, deploymentName, options);
}

function parseChatMessage(messages: ChatMessage[]): GeneratedChatMessage[] {
  return messages.map((p: ChatMessage) => ({
    role: p.role,
    content: p.content ?? null,
    name: p.name,
    function_call: p.functionCall,
    context: p.context,
  }))
}
