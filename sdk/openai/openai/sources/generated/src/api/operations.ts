// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AudioTranscriptionOptions,
  AudioTranscription,
  AudioTranslationOptions,
  AudioTranslation,
  CompletionsOptions,
  Completions,
  ChatCompletionsOptions,
  ChatCompletions,
  BatchImageGenerationOperationResponse,
  ImageGenerationOptions,
  EmbeddingsOptions,
  Embeddings,
} from "../models/models.js";
import {
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
  BeginAzureBatchImageGenerationLogicalResponse,
  GetAudioTranscriptionAsPlainText200Response,
  GetAudioTranscriptionAsPlainTextDefaultResponse,
  GetAudioTranscriptionAsResponseObject200Response,
  GetAudioTranscriptionAsResponseObjectDefaultResponse,
  GetAudioTranslationAsPlainText200Response,
  GetAudioTranslationAsPlainTextDefaultResponse,
  GetAudioTranslationAsResponseObject200Response,
  GetAudioTranslationAsResponseObjectDefaultResponse,
  GetAzureBatchImageGenerationOperationStatus200Response,
  GetAzureBatchImageGenerationOperationStatusDefaultResponse,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  isUnexpected,
  OpenAIContext as Client,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString } from "@azure/core-util";
import {
  GetAudioTranscriptionAsPlainTextOptions,
  GetAudioTranscriptionAsResponseObjectOptions,
  GetAudioTranslationAsPlainTextOptions,
  GetAudioTranslationAsResponseObjectOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetAzureBatchImageGenerationOperationStatusOptions,
  BeginAzureBatchImageGenerationOptions,
  GetEmbeddingsOptions,
} from "../models/options.js";

export function _getAudioTranscriptionAsPlainTextSend(
  context: Client,
  deploymentId: string,
  body: AudioTranscriptionOptions,
  options: GetAudioTranscriptionAsPlainTextOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranscriptionAsPlainText200Response
  | GetAudioTranscriptionAsPlainTextDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/transcriptions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        file: uint8ArrayToString(body["file"], "base64"),
        response_format: body["responseFormat"],
        language: body["language"],
        prompt: body["prompt"],
        temperature: body["temperature"],
        model: body["model"],
      },
    }) as StreamableMethod<
    | GetAudioTranscriptionAsPlainText200Response
    | GetAudioTranscriptionAsPlainTextDefaultResponse
  >;
}

export async function _getAudioTranscriptionAsPlainTextDeserialize(
  result:
    | GetAudioTranscriptionAsPlainText200Response
    | GetAudioTranscriptionAsPlainTextDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return result.body;
}

/**
 * Gets transcribed text and associated metadata from provided spoken audio data. Audio will be transcribed in the
 * written language corresponding to the language it was spoken in.
 */
export async function getAudioTranscriptionAsPlainText(
  context: Client,
  deploymentId: string,
  body: AudioTranscriptionOptions,
  options: GetAudioTranscriptionAsPlainTextOptions = { requestOptions: {} }
): Promise<string> {
  const result = await _getAudioTranscriptionAsPlainTextSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getAudioTranscriptionAsPlainTextDeserialize(result);
}

export function _getAudioTranscriptionAsResponseObjectSend(
  context: Client,
  deploymentId: string,
  body: AudioTranscriptionOptions,
  options: GetAudioTranscriptionAsResponseObjectOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranscriptionAsResponseObject200Response
  | GetAudioTranscriptionAsResponseObjectDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/transcriptions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: {
        file: uint8ArrayToString(body["file"], "base64"),
        response_format: body["responseFormat"],
        language: body["language"],
        prompt: body["prompt"],
        temperature: body["temperature"],
        model: body["model"],
      },
    }) as StreamableMethod<
    | GetAudioTranscriptionAsResponseObject200Response
    | GetAudioTranscriptionAsResponseObjectDefaultResponse
  >;
}

export async function _getAudioTranscriptionAsResponseObjectDeserialize(
  result:
    | GetAudioTranscriptionAsResponseObject200Response
    | GetAudioTranscriptionAsResponseObjectDefaultResponse
): Promise<AudioTranscription> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    text: result.body["text"],
    task: result.body["task"],
    language: result.body["language"],
    duration: result.body["duration"],
    segments: (result.body["segments"] ?? []).map((p) => ({
      id: p["id"],
      start: p["start"],
      end: p["end"],
      text: p["text"],
      temperature: p["temperature"],
      avgLogprob: p["avg_logprob"],
      compressionRatio: p["compression_ratio"],
      noSpeechProb: p["no_speech_prob"],
      tokens: p["tokens"],
      seek: p["seek"],
    })),
  };
}

/**
 * Gets transcribed text and associated metadata from provided spoken audio data. Audio will be transcribed in the
 * written language corresponding to the language it was spoken in.
 */
export async function getAudioTranscriptionAsResponseObject(
  context: Client,
  deploymentId: string,
  body: AudioTranscriptionOptions,
  options: GetAudioTranscriptionAsResponseObjectOptions = { requestOptions: {} }
): Promise<AudioTranscription> {
  const result = await _getAudioTranscriptionAsResponseObjectSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getAudioTranscriptionAsResponseObjectDeserialize(result);
}

export function _getAudioTranslationAsPlainTextSend(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: GetAudioTranslationAsPlainTextOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranslationAsPlainText200Response
  | GetAudioTranslationAsPlainTextDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/translations", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        file: uint8ArrayToString(body["file"], "base64"),
        response_format: body["responseFormat"],
        prompt: body["prompt"],
        temperature: body["temperature"],
        model: body["model"],
      },
    }) as StreamableMethod<
    | GetAudioTranslationAsPlainText200Response
    | GetAudioTranslationAsPlainTextDefaultResponse
  >;
}

export async function _getAudioTranslationAsPlainTextDeserialize(
  result:
    | GetAudioTranslationAsPlainText200Response
    | GetAudioTranslationAsPlainTextDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return result.body;
}

/** Gets English language transcribed text and associated metadata from provided spoken audio data. */
export async function getAudioTranslationAsPlainText(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: GetAudioTranslationAsPlainTextOptions = { requestOptions: {} }
): Promise<string> {
  const result = await _getAudioTranslationAsPlainTextSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getAudioTranslationAsPlainTextDeserialize(result);
}

export function _getAudioTranslationAsResponseObjectSend(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: GetAudioTranslationAsResponseObjectOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranslationAsResponseObject200Response
  | GetAudioTranslationAsResponseObjectDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/translations", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: {
        file: uint8ArrayToString(body["file"], "base64"),
        response_format: body["responseFormat"],
        prompt: body["prompt"],
        temperature: body["temperature"],
        model: body["model"],
      },
    }) as StreamableMethod<
    | GetAudioTranslationAsResponseObject200Response
    | GetAudioTranslationAsResponseObjectDefaultResponse
  >;
}

export async function _getAudioTranslationAsResponseObjectDeserialize(
  result:
    | GetAudioTranslationAsResponseObject200Response
    | GetAudioTranslationAsResponseObjectDefaultResponse
): Promise<AudioTranslation> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    text: result.body["text"],
    task: result.body["task"],
    language: result.body["language"],
    duration: result.body["duration"],
    segments: (result.body["segments"] ?? []).map((p) => ({
      id: p["id"],
      start: p["start"],
      end: p["end"],
      text: p["text"],
      temperature: p["temperature"],
      avgLogprob: p["avg_logprob"],
      compressionRatio: p["compression_ratio"],
      noSpeechProb: p["no_speech_prob"],
      tokens: p["tokens"],
      seek: p["seek"],
    })),
  };
}

/** Gets English language transcribed text and associated metadata from provided spoken audio data. */
export async function getAudioTranslationAsResponseObject(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: GetAudioTranslationAsResponseObjectOptions = { requestOptions: {} }
): Promise<AudioTranslation> {
  const result = await _getAudioTranslationAsResponseObjectSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getAudioTranslationAsResponseObjectDeserialize(result);
}

export function _getCompletionsSend(
  context: Client,
  deploymentId: string,
  body: CompletionsOptions,
  options: GetCompletionsOptions = { requestOptions: {} }
): StreamableMethod<GetCompletions200Response | GetCompletionsDefaultResponse> {
  return context
    .path("/deployments/{deploymentId}/completions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        prompt: body["prompt"],
        max_tokens: body["maxTokens"],
        temperature: body["temperature"],
        top_p: body["topP"],
        logit_bias: body["logitBias"],
        user: body["user"],
        n: body["n"],
        logprobs: body["logprobs"],
        echo: body["echo"],
        stop: body["stop"],
        presence_penalty: body["presencePenalty"],
        frequency_penalty: body["frequencyPenalty"],
        best_of: body["bestOf"],
        stream: body["stream"],
        model: body["model"],
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
    promptFilterResults: (result.body["prompt_filter_results"] ?? []).map(
      (p) => ({
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
              error: !p.content_filter_results?.error
                ? undefined
                : p.content_filter_results?.error,
            },
      })
    ),
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
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
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
  deploymentId: string,
  body: CompletionsOptions,
  options: GetCompletionsOptions = { requestOptions: {} }
): Promise<Completions> {
  const result = await _getCompletionsSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getCompletionsDeserialize(result);
}

export function _getChatCompletionsSend(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<
  GetChatCompletions200Response | GetChatCompletionsDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/chat/completions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: body.messages as any,
        functions: (body["functions"] ?? []).map((p) => ({
          name: p["name"],
          description: p["description"],
          parameters: p["parameters"],
        })),
        function_call: body["functionCall"],
        max_tokens: body["maxTokens"],
        temperature: body["temperature"],
        top_p: body["topP"],
        logit_bias: body["logitBias"],
        user: body["user"],
        n: body["n"],
        stop: body["stop"],
        presence_penalty: body["presencePenalty"],
        frequency_penalty: body["frequencyPenalty"],
        stream: body["stream"],
        model: body["model"],
        dataSources: (body["dataSources"] ?? []).map((p) => ({
          type: p["type"],
          parameters: p["parameters"],
        })),
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
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
          },
    })),
    promptFilterResults: (result.body["prompt_filter_results"] ?? []).map(
      (p) => ({
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
              error: !p.content_filter_results?.error
                ? undefined
                : p.content_filter_results?.error,
            },
      })
    ),
    usage: {
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
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsSend(
    context,
    deploymentId,
    body,
    options
  );
  return _getChatCompletionsDeserialize(result);
}

export function _getChatCompletionsWithAzureExtensionsSend(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsWithAzureExtensionsOptions = { requestOptions: {} }
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  return context
    .path(
      "/deployments/{deploymentId}/extensions/chat/completions",
      deploymentId
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: body.messages as any,
        functions: (body["functions"] ?? []).map((p) => ({
          name: p["name"],
          description: p["description"],
          parameters: p["parameters"],
        })),
        function_call: body["functionCall"],
        max_tokens: body["maxTokens"],
        temperature: body["temperature"],
        top_p: body["topP"],
        logit_bias: body["logitBias"],
        user: body["user"],
        n: body["n"],
        stop: body["stop"],
        presence_penalty: body["presencePenalty"],
        frequency_penalty: body["frequencyPenalty"],
        stream: body["stream"],
        model: body["model"],
        dataSources: (body["dataSources"] ?? []).map((p) => ({
          type: p["type"],
          parameters: p["parameters"],
        })),
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
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
          },
    })),
    promptFilterResults: (result.body["prompt_filter_results"] ?? []).map(
      (p) => ({
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
              error: !p.content_filter_results?.error
                ? undefined
                : p.content_filter_results?.error,
            },
      })
    ),
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
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsWithAzureExtensionsOptions = { requestOptions: {} }
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsWithAzureExtensionsSend(
    context,
    deploymentId,
    body,
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
> {
  return context
    .path("/operations/images/{operationId}", operationId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getAzureBatchImageGenerationOperationStatusDeserialize(
  result:
    | GetAzureBatchImageGenerationOperationStatus200Response
    | GetAzureBatchImageGenerationOperationStatusDefaultResponse
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
  body: ImageGenerationOptions,
  options: BeginAzureBatchImageGenerationOptions = { requestOptions: {} }
): StreamableMethod<
  | BeginAzureBatchImageGeneration202Response
  | BeginAzureBatchImageGenerationDefaultResponse
  | BeginAzureBatchImageGenerationLogicalResponse
> {
  return context
    .path("/images/generations:submit")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        prompt: body["prompt"],
        n: body["n"],
        size: body["size"],
        response_format: body["responseFormat"],
        user: body["user"],
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
  body: ImageGenerationOptions,
  options: BeginAzureBatchImageGenerationOptions = { requestOptions: {} }
): Promise<BatchImageGenerationOperationResponse> {
  const result = await _beginAzureBatchImageGenerationSend(
    context,
    body,
    options
  );
  return _beginAzureBatchImageGenerationDeserialize(result);
}

export function _getEmbeddingsSend(
  context: Client,
  deploymentId: string,
  body: EmbeddingsOptions,
  options: GetEmbeddingsOptions = { requestOptions: {} }
): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse> {
  return context
    .path("/deployments/{deploymentId}/embeddings", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { user: body["user"], model: body["model"], input: body["input"] },
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
  deploymentId: string,
  body: EmbeddingsOptions,
  options: GetEmbeddingsOptions = { requestOptions: {} }
): Promise<Embeddings> {
  const result = await _getEmbeddingsSend(context, deploymentId, body, options);
  return _getEmbeddingsDeserialize(result);
}
