// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import {
  OperationOptions,
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  AzureChatExtensionConfiguration,
  BatchImageGenerationOperationResponse,
  ChatCompletions,
  ChatMessage,
  Completions,
  Embeddings,
  FunctionCallPreset,
  FunctionDefinition,
  FunctionName,
} from "../models/models.js";
import {
  BeginAzureBatchImageGenerationOptions,
  GetAzureBatchImageGenerationOperationStatusOptions,
  GetChatCompletionsOptions as GeneratedGetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetCompletionsOptions,
  GetEmbeddingsOptions,
} from "../models/options.js";
import {
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
  BeginAzureBatchImageGenerationLogicalResponse,
  ChatChoiceOutput,
  ChatMessageOutput,
  ChoiceOutput,
  OpenAIContext as Client,
  GetAzureBatchImageGenerationOperationStatus200Response,
  GetAzureBatchImageGenerationOperationStatusDefaultResponse,
  GetAzureBatchImageGenerationOperationStatusLogicalResponse,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  PromptFilterResultOutput,
  isUnexpected,
} from "../rest/index.js";
import { getOaiSSEs } from "./oaiSse.js";

export interface GetChatCompletionsOptions extends OperationOptions {
  /** A list of functions the model may generate JSON inputs for. */
  functions?: FunctionDefinition[];
  /**
   * Controls how the model responds to function calls. "none" means the model does not call a function,
   * and responds to the end-user. "auto" means the model can pick between an end-user or calling a function.
   *  Specifying a particular function via `{"name": "my_function"}` forces the model to call that function.
   *  "none" is the default when no functions are present. "auto" is the default if functions are present.
   */
  functionCall?: FunctionCallPreset | FunctionName;
  /** The maximum number of tokens to generate. */
  maxTokens?: number;
  /**
   * The sampling temperature to use that controls the apparent creativity of generated completions.
   * Higher values will make output more random while lower values will make results more focused
   * and deterministic.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature called nucleus sampling. This value causes the
   * model to consider the results of tokens with the provided probability mass. As an example, a
   * value of 0.15 will cause only the tokens comprising the top 15% of probability mass to be
   * considered.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  topP?: number;
  /**
   * A map between GPT token IDs and bias scores that influences the probability of specific tokens
   * appearing in a completions response. Token IDs are computed via external tokenizer tools, while
   * bias scores reside in the range of -100 to 100 with minimum and maximum values corresponding to
   * a full ban or exclusive selection of a token, respectively. The exact behavior of a given bias
   * score varies by model.
   */
  logitBias?: Record<string, number>;
  /**
   * An identifier for the caller or end user of the operation. This may be used for tracking
   * or rate-limiting purposes.
   */
  user?: string;
  /**
   * The number of chat completions choices that should be generated for a chat completions
   * response.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for max_tokens and stop.
   */
  n?: number;
  /** A collection of textual sequences that will end completions generation. */
  stop?: string[];
  /**
   * A value that influences the probability of generated tokens appearing based on their existing
   * presence in generated text.
   * Positive values will make tokens less likely to appear when they already exist and increase the
   * model's likelihood to output new topics.
   */
  presencePenalty?: number;
  /**
   * A value that influences the probability of generated tokens appearing based on their cumulative
   * frequency in generated text.
   * Positive values will make tokens less likely to appear as their frequency increases and
   * decrease the likelihood of the model repeating the same statements verbatim.
   */
  frequencyPenalty?: number;
  /** A value indicating whether chat completions should be streamed for this request. */
  stream?: boolean;
  /**
   * The model name to provide as part of this completions request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   *   The configuration entries for Azure OpenAI chat extensions that use them.
   *   This additional specification is only compatible with Azure OpenAI.
   */
  azureExtensionOptions?: AzureExtensionsOptions;
}

/**
 * Options for Azure OpenAI chat extensions.
 */
export interface AzureExtensionsOptions {
  /**
   *   The configuration entries for Azure OpenAI chat extensions that use them.
   *   This additional specification is only compatible with Azure OpenAI.
   */
  extensions?: AzureChatExtensionConfiguration[];
}

/** Convenience alias for BeginAzureBatchImageGenerationOptions */
export type ImageGenerationOptions = BeginAzureBatchImageGenerationOptions;

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
      messages: messages,
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
        messages: messages,
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

export function _getAzureBatchImageGenerationOperationStatusSend(
  context: Client,
  operationId: string,
  options: GetAzureBatchImageGenerationOperationStatusOptions = {
    requestOptions: {},
  }
): StreamableMethod<
  | GetAzureBatchImageGenerationOperationStatus200Response
  | GetAzureBatchImageGenerationOperationStatusDefaultResponse
  | GetAzureBatchImageGenerationOperationStatusLogicalResponse
> {
  return context
    .path("/operations/images/{operationId}", operationId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getAzureBatchImageGenerationOperationStatusDeserialize(
  result:
    | GetAzureBatchImageGenerationOperationStatus200Response
    | GetAzureBatchImageGenerationOperationStatusDefaultResponse
    | GetAzureBatchImageGenerationOperationStatusLogicalResponse
): Promise<BatchImageGenerationOperationResponse> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    expires: result.body["expires"],
    result: !result.body.result
      ? undefined
      : {
          created: new Date(result.body.result?.["created"]),
          data: result.body.result?.["data"] as any,
        },
    status: result.body["status"],
    error: !result.body.error ? undefined : result.body.error,
  };
}

/** Returns the status of the images operation */
export async function getAzureBatchImageGenerationOperationStatus(
  context: Client,
  operationId: string,
  options: GetAzureBatchImageGenerationOperationStatusOptions = {
    requestOptions: {},
  }
): Promise<BatchImageGenerationOperationResponse> {
  const result = await _getAzureBatchImageGenerationOperationStatusSend(
    context,
    operationId,
    options
  );
  return _getAzureBatchImageGenerationOperationStatusDeserialize(result);
}

export function _beginAzureBatchImageGenerationSend(
  context: Client,
  prompt: string,
  options: BeginAzureBatchImageGenerationOptions = { requestOptions: {} }
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

export async function _beginAzureBatchImageGenerationDeserialize(
  result:
    | BeginAzureBatchImageGeneration202Response
    | BeginAzureBatchImageGenerationDefaultResponse
    | BeginAzureBatchImageGenerationLogicalResponse
): Promise<BatchImageGenerationOperationResponse> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    expires: result.body["expires"],
    result: !result.body.result
      ? undefined
      : {
          created: new Date(result.body.result?.["created"]),
          data: result.body.result?.["data"] as any,
        },
    status: result.body["status"],
    error: !result.body.error ? undefined : result.body.error,
  };
}

/** Starts the generation of a batch of images from a text caption */
export async function beginAzureBatchImageGeneration(
  context: Client,
  prompt: string,
  options: BeginAzureBatchImageGenerationOptions = { requestOptions: {} }
): Promise<BatchImageGenerationOperationResponse> {
  const result = await _beginAzureBatchImageGenerationSend(context, prompt, options);
  return _beginAzureBatchImageGenerationDeserialize(result);
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
      message: !p.message ? undefined : _deserializeMessage(p.message),
      index: p["index"],
      finishReason: p["finish_reason"],
      delta: !p.delta ? undefined : _deserializeMessage(p.delta),
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
    usage: !result.body.usage
      ? undefined
      : {
          completionTokens: result.body.usage["completion_tokens"],
          promptTokens: result.body.usage["prompt_tokens"],
          totalTokens: result.body.usage["total_tokens"],
        },
  };
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
  return _getChatCompletionsDeserialize(result);
}

function getCompletionsResult(body: Record<string, any>): Omit<Completions, "usage"> {
  return {
    id: body["id"],
    created: new Date(body["created"]),
    promptFilterResults: (body["prompt_annotations"] ?? []).map((p: PromptFilterResultOutput) => ({
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
    choices: (body["choices"] ?? []).map((p: ChoiceOutput) => ({
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
  };
}

function getChatCompletionsResult(body: Record<string, any>): ChatCompletions {
  return {
    id: body["id"],
    created: new Date(body["created"]),
    choices: (body["choices"] ?? []).map((p: ChatChoiceOutput) => ({
      message: !p.message ? undefined : _deserializeMessage(p.message),
      index: p["index"],
      finishReason: p["finish_reason"],
      delta: !p.delta ? undefined : _deserializeMessage(p.delta),
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
    promptFilterResults: (body["prompt_annotations"] ?? []).map((p: PromptFilterResultOutput) => ({
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
  };
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

function _deserializeMessage(message: ChatMessageOutput): ChatMessage {
  return {
    role: message["role"],
    content: message["content"],
    name: message["name"],
    functionCall: !message.function_call
      ? undefined
      : {
          name: message.function_call?.["name"],
          arguments: message.function_call?.["arguments"],
        },
    context: !message.context
      ? undefined
      : {
          messages: !message.context.messages
            ? undefined
            : message.context.messages.map((m) => {
                return _deserializeMessage(m);
              }),
        },
  };
}
