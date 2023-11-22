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
import { createFileFromStream } from "@azure/core-rest-pipeline";
import {
  AudioResult,
  AudioResultFormat,
  AudioResultSimpleJson,
  GetAudioTranscriptionOptions,
  GetAudioTranslationOptions,
} from "../models/audio.js";
import {
  ChatCompletions,
  ChatMessage,
  Completions,
  CompletionsOptions,
  Embeddings,
  EmbeddingsOptions,
  ChatCompletionsOptions as GeneratedChatCompletionsOptions,
  ImageGenerationOptions as GeneratedImageGenerationOptions,
  ImageGenerations,
  ImageLocation,
} from "../models/models.js";
import {
  BeginAzureBatchImageGenerationOptions as GeneratedBatchImageGenerationOptions,
  GetChatCompletionsOptions as GeneratedGetChatCompletionsOptions,
  GetCompletionsOptions,
  GetEmbeddingsOptions,
  ImageGenerationOptions,
} from "../models/options.js";
import {
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
  BeginAzureBatchImageGenerationLogicalResponse,
  OpenAIContext as Client,
  ChatMessage as GeneratedChatMessage,
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
import { GetChatCompletionsOptions, StreamProducer } from "./models.js";
import { getOaiSSEs } from "./oaiSse.js";
import { renameKeysToCamelCase } from "./util.js";

export function _getCompletionsSend(
  context: Client,
  deploymentId: string,
  body: CompletionsOptions,
  options: GetCompletionsOptions = { requestOptions: {} }
): StreamableMethod<GetCompletions200Response | GetCompletionsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/completions", deploymentId).post({
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
    promptFilterResults: (result.body["prompt_filter_results"] ?? []).map((p) => ({
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
            error: !p.content_filter_results?.error ? undefined : p.content_filter_results?.error,
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
            error: !p.content_filter_results?.error ? undefined : p.content_filter_results?.error,
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
  const result = await _getCompletionsSend(context, deploymentId, body, options);
  return _getCompletionsDeserialize(result);
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
            error: !p.content_filter_results?.error ? undefined : p.content_filter_results?.error,
          },
    })),
    promptFilterResults: (result.body["prompt_filter_results"] ?? []).map((p) => ({
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
            error: !p.content_filter_results?.error ? undefined : p.content_filter_results?.error,
          },
    })),
    usage: {
      completionTokens: result.body.usage["completion_tokens"],
      promptTokens: result.body.usage["prompt_tokens"],
      totalTokens: result.body.usage["total_tokens"],
    },
  };
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
            error: !p.content_filter_results?.error ? undefined : p.content_filter_results?.error,
          },
    })),
    promptFilterResults: (result.body["prompt_filter_results"] ?? []).map((p) => ({
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
            error: !p.content_filter_results?.error ? undefined : p.content_filter_results?.error,
          },
    })),
    usage: {
      completionTokens: result.body.usage["completion_tokens"],
      promptTokens: result.body.usage["prompt_tokens"],
      totalTokens: result.body.usage["total_tokens"],
    },
  };
}

export function _getEmbeddingsSend(
  context: Client,
  deploymentId: string,
  body: EmbeddingsOptions,
  options: GetEmbeddingsOptions = { requestOptions: {} }
): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/embeddings", deploymentId).post({
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

export function listCompletions(
  context: Client,
  prompt: string[],
  deploymentName: string,
  options: GetCompletionsOptions = { requestOptions: {} }
): AsyncIterable<Omit<Completions, "usage">> {
  const response = _getCompletionsSend(
    context,
    deploymentName,
    {
      prompt,
      ...options,
      stream: true,
    },
    options
  );
  return getOaiSSEs(response, getCompletionsResult);
}

export async function getImages(
  context: Client,
  prompt: string,
  options: ImageGenerationOptions = { requestOptions: {} }
): Promise<ImageGenerations> {
  const response = await _beginAzureBatchImageGenerationSend(
    context,
    { prompt, ...options },
    options
  );
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

/**
 * Returns the translation of an audio file.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param audioStream - A function to return a stream of the audio content to translate.
 * @param options - The options for this audio translation request.
 * @returns The audio translation result.
 */
export async function getAudioTranslation(
  context: Client,
  deploymentName: string,
  audioStream: StreamProducer,
  options?: GetAudioTranslationOptions
): Promise<AudioResultSimpleJson>;
/**
 * Returns the translation of an audio file.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param audioStream - A function to return a stream of the audio content to translate.
 * @param format - The format of the result object. See {@link AudioResultFormat} for possible values.
 * @param options - The options for this audio translation request.
 * @returns The audio translation result.
 */
export async function getAudioTranslation<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  audioStream: StreamProducer,
  format: Format,
  options?: GetAudioTranslationOptions
): Promise<AudioResult<Format>>;
// implementation
export async function getAudioTranslation<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  audioStream: StreamProducer,
  formatOrOptions?: Format | GetAudioTranslationOptions,
  inputOptions?: GetAudioTranslationOptions
): Promise<AudioResult<Format>> {
  const options =
    inputOptions ?? (typeof formatOrOptions === "string" ? {} : formatOrOptions ?? {});
  const response_format = typeof formatOrOptions === "string" ? formatOrOptions : undefined;
  const { temperature, prompt, model, ...rest } = options;
  const { body, status } = await context
    .pathUnchecked("deployments/{deploymentId}/audio/translations", deploymentName)
    .post({
      body: {
        file: await createFileFromStream(
          audioStream.stream,
          audioStream.name ?? "placeholder.wav",
          { size: audioStream.length }
        ),
        ...(response_format && { response_format }),
        ...(temperature !== undefined ? { temperature } : {}),
        ...(prompt && { prompt }),
        ...(model && { model }),
      },
      ...rest,
      contentType: "multipart/form-data",
    });
  if (status !== "200") {
    throw body.error;
  }
  return response_format !== "verbose_json"
    ? body
    : (renameKeysToCamelCase(body) as AudioResult<Format>);
}

/**
 * Returns the transcription of an audio file in a simple JSON format.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param audioStream - A function to return a stream of the audio content to transcribe.
 * @param options - The options for this audio transcription request.
 * @returns The audio transcription result in a simple JSON format.
 */
export async function getAudioTranscription(
  context: Client,
  deploymentName: string,
  audioStream: StreamProducer,
  options?: GetAudioTranscriptionOptions
): Promise<AudioResultSimpleJson>;
/**
 * Returns the transcription of an audio file.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param audioStream - A function to return a stream of the audio content to transcribe.
 * @param format - The format of the result object. See {@link AudioResultFormat} for possible values.
 * @param options - The options for this audio transcription request.
 * @returns The audio transcription result in a format of your choice.
 */
export async function getAudioTranscription<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  audioStream: StreamProducer,
  format: Format,
  options?: GetAudioTranscriptionOptions
): Promise<AudioResult<Format>>;
// implementation
export async function getAudioTranscription<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  audioStream: StreamProducer,
  formatOrOptions?: Format | GetAudioTranscriptionOptions,
  inputOptions?: GetAudioTranscriptionOptions
): Promise<AudioResult<Format>> {
  const options =
    inputOptions ?? (typeof formatOrOptions === "string" ? {} : formatOrOptions ?? {});
  const response_format = typeof formatOrOptions === "string" ? formatOrOptions : undefined;
  const { temperature, language, prompt, model, ...rest } = options;
  const { body, status } = await context
    .pathUnchecked("deployments/{deploymentId}/audio/transcriptions", deploymentName)
    .post({
      body: {
        file: await createFileFromStream(
          audioStream.stream,
          audioStream.name ?? "placeholder.wav",
          { size: audioStream.length }
        ),
        ...(response_format && { response_format }),
        ...(language && { language }),
        ...(temperature !== undefined ? { temperature } : {}),
        ...(prompt && { prompt }),
        ...(model && { model }),
      },
      ...rest,
      contentType: "multipart/form-data",
    });
  if (status !== "200") {
    throw body.error;
  }
  return response_format !== "verbose_json"
    ? body
    : (renameKeysToCamelCase(body) as AudioResult<Format>);
}

export function _getChatCompletionsWithAzureExtensionsSend(
  context: Client,
  deploymentId: string,
  body: GeneratedChatCompletionsOptions,
  options: GeneratedGetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/extensions/chat/completions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: parseChatMessage(body.messages),
        functions: body["functions"],
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
        dataSources: body["dataSources"],
      },
    });
}

export function _getChatCompletionsSend(
  context: Client,
  deploymentId: string,
  body: GeneratedChatCompletionsOptions,
  options: GeneratedGetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<GetChatCompletions200Response | GetChatCompletionsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/chat/completions", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: parseChatMessage(body.messages),
      functions: body["functions"],
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
      dataSources: body["dataSources"],
    },
  });
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
    ? _getChatCompletionsWithAzureExtensionsSend(
        context,
        deploymentName,
        { messages, ...options, dataSources: options.azureExtensionOptions?.extensions },
        {
          ...options,
        }
      )
    : _getChatCompletionsSend(context, deploymentName, { messages, ...options }, options);
}

function parseChatMessage(messages: ChatMessage[]): GeneratedChatMessage[] {
  return messages.map((p: ChatMessage) => ({
    role: p.role,
    content: p.content ?? null,
    name: p.name,
    function_call: p.functionCall,
    context: p.context,
  }));
}

function _beginAzureBatchImageGenerationSend(
  context: Client,
  body: GeneratedImageGenerationOptions,
  options: GeneratedBatchImageGenerationOptions = { requestOptions: {} }
): StreamableMethod<
  | BeginAzureBatchImageGeneration202Response
  | BeginAzureBatchImageGenerationDefaultResponse
  | BeginAzureBatchImageGenerationLogicalResponse
> {
  return context.path("/images/generations:submit").post({
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
