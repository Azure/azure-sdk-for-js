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
import { createFile } from "@azure/core-rest-pipeline";
import { uint8ArrayToString } from "@azure/core-util";
import {
  AudioResult,
  AudioResultFormat,
  AudioResultSimpleJson,
  GetAudioTranscriptionOptions,
  GetAudioTranslationOptions,
} from "../../../models/audio.js";
import {
  AudioTranscription,
  AudioTranscriptionOptions,
  AudioTranslation,
  AudioTranslationOptions,
  ChatCompletions,
  ChatCompletionsOptions,
  ChatRequestMessage,
  Completions,
  CompletionsOptions,
  Embeddings,
  EmbeddingsOptions,
  EventStream,
  ImageGenerations,
} from "../../../models/models.js";
import {
  ClientOpenAIClientGetAudioTranscriptionAsPlainTextOptions,
  ClientOpenAIClientGetAudioTranscriptionAsResponseObjectOptions,
  ClientOpenAIClientGetAudioTranslationAsPlainTextOptions,
  ClientOpenAIClientGetAudioTranslationAsResponseObjectOptions,
  ClientOpenAIClientGetChatCompletionsOptions,
  ClientOpenAIClientGetChatCompletionsWithAzureExtensionsOptions,
  ClientOpenAIClientGetCompletionsOptions,
  ClientOpenAIClientGetEmbeddingsOptions,
  ClientOpenAIClientGetImageGenerationsOptions,
  GetChatCompletionsOptions,
  GetCompletionsOptions,
  GetImagesOptions,
} from "../../../models/options.js";
import {
  AzureChatExtensionConfiguration,
  OpenAIContext as Client,
  GetAudioTranscriptionAsPlainText200Response,
  GetAudioTranscriptionAsPlainTextDefaultResponse,
  GetAudioTranscriptionAsResponseObject200Response,
  GetAudioTranscriptionAsResponseObjectDefaultResponse,
  GetAudioTranslationAsPlainText200Response,
  GetAudioTranslationAsPlainTextDefaultResponse,
  GetAudioTranslationAsResponseObject200Response,
  GetAudioTranslationAsResponseObjectDefaultResponse,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  GetImageGenerations200Response,
  GetImageGenerationsDefaultResponse,
  isUnexpected,
  ChatRequestMessage as RestChatRequestMessage,
} from "../../../rest/index.js";
import { getOaiSSEs } from "../../oaiSse.js";
import { camelCaseKeys, snakeCaseKeys } from "../../util.js";
import { getChatCompletionsResult, getCompletionsResult } from "./deserializers.js";
import {
  ChatCompletionsOptions as GeneratedChatCompletionsOptions,
  ImageGenerationOptions as GeneratedImageGenerationOptions,
} from "../../../models/models.js";

export function _getAudioTranscriptionAsPlainTextSend(
  context: Client,
  deploymentId: string,
  body: AudioTranscriptionOptions,
  options: ClientOpenAIClientGetAudioTranscriptionAsPlainTextOptions = {
    requestOptions: {},
  }
): StreamableMethod<
  GetAudioTranscriptionAsPlainText200Response | GetAudioTranscriptionAsPlainTextDefaultResponse
> {
  return context.path("/deployments/{deploymentId}/audio/transcriptions", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      file: uint8ArrayToString(body["file"], "base64"),
      filename: body["filename"],
      response_format: body["responseFormat"],
      language: body["language"],
      prompt: body["prompt"],
      temperature: body["temperature"],
      model: body["model"],
    },
  }) as StreamableMethod<
    GetAudioTranscriptionAsPlainText200Response | GetAudioTranscriptionAsPlainTextDefaultResponse
  >;
}

export async function _getAudioTranscriptionAsPlainTextDeserialize(
  result:
    | GetAudioTranscriptionAsPlainText200Response
    | GetAudioTranscriptionAsPlainTextDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body;
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
  options: ClientOpenAIClientGetAudioTranscriptionAsPlainTextOptions = {
    requestOptions: {},
  }
): Promise<string> {
  const result = await _getAudioTranscriptionAsPlainTextSend(context, deploymentId, body, options);
  return _getAudioTranscriptionAsPlainTextDeserialize(result);
}

export function _getAudioTranscriptionAsResponseObjectSend(
  context: Client,
  deploymentId: string,
  body: AudioTranscriptionOptions,
  options: ClientOpenAIClientGetAudioTranscriptionAsResponseObjectOptions = {
    requestOptions: {},
  }
): StreamableMethod<
  | GetAudioTranscriptionAsResponseObject200Response
  | GetAudioTranscriptionAsResponseObjectDefaultResponse
> {
  return context.path("/deployments/{deploymentId}/audio/transcriptions", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "multipart/form-data",
    body: {
      file: uint8ArrayToString(body["file"], "base64"),
      filename: body["filename"],
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
    throw result.body;
  }

  return {
    text: result.body["text"],
    task: result.body["task"],
    language: result.body["language"],
    duration: result.body["duration"],
    segments: !result.body["segments"]
      ? result.body["segments"]
      : result.body["segments"].map((p) => ({
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
  options: ClientOpenAIClientGetAudioTranscriptionAsResponseObjectOptions = {
    requestOptions: {},
  }
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
  options: ClientOpenAIClientGetAudioTranslationAsPlainTextOptions = {
    requestOptions: {},
  }
): StreamableMethod<
  GetAudioTranslationAsPlainText200Response | GetAudioTranslationAsPlainTextDefaultResponse
> {
  return context.path("/deployments/{deploymentId}/audio/translations", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      file: uint8ArrayToString(body["file"], "base64"),
      filename: body["filename"],
      response_format: body["responseFormat"],
      prompt: body["prompt"],
      temperature: body["temperature"],
      model: body["model"],
    },
  }) as StreamableMethod<
    GetAudioTranslationAsPlainText200Response | GetAudioTranslationAsPlainTextDefaultResponse
  >;
}

export async function _getAudioTranslationAsPlainTextDeserialize(
  result: GetAudioTranslationAsPlainText200Response | GetAudioTranslationAsPlainTextDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Gets English language transcribed text and associated metadata from provided spoken audio data. */
export async function getAudioTranslationAsPlainText(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: ClientOpenAIClientGetAudioTranslationAsPlainTextOptions = {
    requestOptions: {},
  }
): Promise<string> {
  const result = await _getAudioTranslationAsPlainTextSend(context, deploymentId, body, options);
  return _getAudioTranslationAsPlainTextDeserialize(result);
}

export function _getAudioTranslationAsResponseObjectSend(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: ClientOpenAIClientGetAudioTranslationAsResponseObjectOptions = {
    requestOptions: {},
  }
): StreamableMethod<
  | GetAudioTranslationAsResponseObject200Response
  | GetAudioTranslationAsResponseObjectDefaultResponse
> {
  return context.path("/deployments/{deploymentId}/audio/translations", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "multipart/form-data",
    body: {
      file: uint8ArrayToString(body["file"], "base64"),
      filename: body["filename"],
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
    throw result.body;
  }

  return {
    text: result.body["text"],
    task: result.body["task"],
    language: result.body["language"],
    duration: result.body["duration"],
    segments: !result.body["segments"]
      ? result.body["segments"]
      : result.body["segments"].map((p) => ({
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
  options: ClientOpenAIClientGetAudioTranslationAsResponseObjectOptions = {
    requestOptions: {},
  }
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
  options: ClientOpenAIClientGetCompletionsOptions = { requestOptions: {} }
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

/**
 * Gets completions for the provided input prompts.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export async function getCompletions(
  context: Client,
  deploymentName: string,
  prompt: string[],
  options: GetCompletionsOptions = { requestOptions: {} }
): Promise<Completions> {
  const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
  const response = await _getCompletionsSend(
    context,
    deploymentName,
    {
      prompt,
      ...rest,
    },
    { abortSignal, onResponse, requestOptions, tracingOptions }
  );
  return _getCompletionsDeserialize(response);
}

export async function _getCompletionsDeserialize(
  result: GetCompletions200Response | GetCompletionsDefaultResponse
): Promise<Completions> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  return getCompletionsResult(result.body);
}

export async function _getChatCompletionsDeserialize(
  result: GetChatCompletions200Response | GetChatCompletionsDefaultResponse
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  return getChatCompletionsResult(result.body);
}

export function _getImageGenerationsSend(
  context: Client,
  deploymentId: string,
  body: GeneratedImageGenerationOptions,
  options: ClientOpenAIClientGetImageGenerationsOptions = { requestOptions: {} }
): StreamableMethod<GetImageGenerations200Response | GetImageGenerationsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/images/generations", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      model: body["model"],
      prompt: body["prompt"],
      n: body["n"],
      size: body["size"],
      response_format: body["responseFormat"],
      quality: body["quality"],
      style: body["style"],
      user: body["user"],
    },
  });
}

export async function _getImageGenerationsDeserialize(
  result: GetImageGenerations200Response | GetImageGenerationsDefaultResponse
): Promise<ImageGenerations> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }

  return {
    created: new Date(result.body["created"]),
    data: result.body["data"].map((p) => ({
      url: p["url"],
      base64Data: p["b64_json"],
      revisedPrompt: p["revised_prompt"],
    })),
  };
}

/** Creates an image given a prompt. */
export async function getImageGenerations(
  context: Client,
  deploymentId: string,
  body: GeneratedImageGenerationOptions,
  options: ClientOpenAIClientGetImageGenerationsOptions = { requestOptions: {} }
): Promise<ImageGenerations> {
  const result = await _getImageGenerationsSend(context, deploymentId, body, options);
  return _getImageGenerationsDeserialize(result);
}

export function _getEmbeddingsSend(
  context: Client,
  deploymentId: string,
  body: EmbeddingsOptions,
  options: ClientOpenAIClientGetEmbeddingsOptions = { requestOptions: {} }
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
    data: result.body["data"].map((p) => ({
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
  options: ClientOpenAIClientGetEmbeddingsOptions = { requestOptions: {} }
): Promise<Embeddings> {
  const result = await _getEmbeddingsSend(context, deploymentId, body, options);
  return _getEmbeddingsDeserialize(result);
}

export function streamCompletions(
  context: Client,
  deploymentName: string,
  prompt: string[],
  options: GetCompletionsOptions = { requestOptions: {} }
): Promise<EventStream<Omit<Completions, "usage">>> {
  const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
  const response = _getCompletionsSend(
    context,
    deploymentName,
    {
      prompt,
      ...rest,
      stream: true,
    },
    { abortSignal, onResponse, requestOptions, tracingOptions }
  );
  return getOaiSSEs(response, getCompletionsResult);
}

export async function getImages(
  context: Client,
  deploymentName: string,
  prompt: string,
  options: GetImagesOptions = { requestOptions: {} }
): Promise<ImageGenerations> {
  const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
  const result = await _getImageGenerationsSend(
    context,
    deploymentName,
    { prompt, ...rest },
    { abortSignal, onResponse, requestOptions, tracingOptions }
  );
  return _getImageGenerationsDeserialize(result);
}

export function streamChatCompletions(
  context: Client,
  deploymentName: string,
  messages: ChatRequestMessage[],
  options: GetChatCompletionsOptions = { requestOptions: {} }
): Promise<EventStream<ChatCompletions>> {
  const response = _getChatCompletionsSendX(context, deploymentName, messages, {
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
  deploymentName: string,
  messages: ChatRequestMessage[],
  options: GetChatCompletionsOptions = { requestOptions: {} }
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsSendX(context, deploymentName, messages, options);
  return _getChatCompletionsDeserialize(result);
}
/**
 * Returns the translation of an audio file.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param fileContent - The content of the audio file to translate.
 * @param options - The options for this audio translation request.
 * @returns The audio translation result.
 */
export async function getAudioTranslation(
  context: Client,
  deploymentName: string,
  fileContent: Uint8Array,
  options?: GetAudioTranslationOptions
): Promise<AudioResultSimpleJson>;
/**
 * Returns the translation of an audio file.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param fileContent - The content of the audio file to translate.
 * @param format - The format of the result object. See {@link AudioResultFormat} for possible values.
 * @param options - The options for this audio translation request.
 * @returns The audio translation result.
 */
export async function getAudioTranslation<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  fileContent: Uint8Array,
  format: Format,
  options?: GetAudioTranslationOptions
): Promise<AudioResult<Format>>;
export async function getAudioTranslation<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  fileContent: Uint8Array,
  formatOrOptions?: Format | GetAudioTranslationOptions,
  inputOptions?: GetAudioTranslationOptions
): Promise<AudioResult<Format>> {
  const options =
    inputOptions ?? (typeof formatOrOptions === "string" ? {} : formatOrOptions ?? {});
  const response_format = typeof formatOrOptions === "string" ? formatOrOptions : undefined;
  const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
  const { body, status } = await context
    .pathUnchecked("deployments/{deploymentName}/audio/translations", deploymentName)
    .post({
      ...operationOptionsToRequestParameters({
        abortSignal,
        onResponse,
        tracingOptions,
        requestOptions,
      }),
      contentType: "multipart/form-data",
      body: {
        ...snakeCaseKeys(rest),
        file: createFile(fileContent, "placeholder.wav"),
        response_format,
      },
    });
  if (status !== "200") {
    throw body.error;
  }

  return response_format !== "verbose_json"
    ? body
    : (camelCaseKeys(body) as unknown as AudioResult<Format>);
}

/**
 * Returns the transcription of an audio file in a simple JSON format.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param fileContent - The content of the audio file to transcribe.
 * @param options - The options for this audio transcription request.
 * @returns The audio transcription result in a simple JSON format.
 */
export async function getAudioTranscription(
  context: Client,
  deploymentName: string,
  fileContent: Uint8Array,
  options?: GetAudioTranscriptionOptions
): Promise<AudioResultSimpleJson>;
/**
 * Returns the transcription of an audio file.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param fileContent - The content of the audio file to transcribe.
 * @param format - The format of the result object. See {@link AudioResultFormat} for possible values.
 * @param options - The options for this audio transcription request.
 * @returns The audio transcription result in a format of your choice.
 */
export async function getAudioTranscription<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  fileContent: Uint8Array,
  format: Format,
  options?: GetAudioTranscriptionOptions
): Promise<AudioResult<Format>>;
export async function getAudioTranscription<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  fileContent: Uint8Array,
  formatOrOptions?: Format | GetAudioTranscriptionOptions,
  inputOptions?: GetAudioTranscriptionOptions
): Promise<AudioResult<Format>> {
  const options =
    inputOptions ?? (typeof formatOrOptions === "string" ? {} : formatOrOptions ?? {});
  const response_format = typeof formatOrOptions === "string" ? formatOrOptions : undefined;
  const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
  const { body, status } = await context
    .pathUnchecked("deployments/{deploymentName}/audio/transcriptions", deploymentName)
    .post({
      ...operationOptionsToRequestParameters({
        abortSignal,
        onResponse,
        tracingOptions,
        requestOptions,
      }),
      contentType: "multipart/form-data",
      body: {
        ...snakeCaseKeys(rest),
        file: createFile(fileContent, "placeholder.wav"),
        response_format,
      },
    });
  if (status !== "200") {
    throw body.error;
  }

  return response_format !== "verbose_json"
    ? body
    : (camelCaseKeys(body) as unknown as AudioResult<Format>);
}

function _getChatCompletionsSendX(
  context: Client,
  deploymentName: string,
  messages: ChatRequestMessage[],
  options: GetChatCompletionsOptions & { stream?: boolean } = { requestOptions: {} }
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  const {
    azureExtensionOptions,
    abortSignal,
    onResponse,
    requestOptions,
    tracingOptions,
    ...rest
  } = options;
  const coreOptions = {
    abortSignal,
    onResponse,
    requestOptions,
    tracingOptions,
  };
  const azure = {
    ...(!azureExtensionOptions?.extensions
      ? {}
      : { dataSources: azureExtensionOptions.extensions }),
    ...(!azureExtensionOptions?.enhancements
      ? {}
      : { enhancements: azureExtensionOptions.enhancements }),
  };
  return azure.dataSources || azure.enhancements
    ? _getChatCompletionsWithAzureExtensionsSend(
        context,
        deploymentName,
        {
          messages,
          ...rest,
          ...azure,
        },
        coreOptions
      )
    : _getChatCompletionsSend(context, deploymentName, { messages, ...rest }, coreOptions);
}

function _getChatCompletionsWithAzureExtensionsSend(
  context: Client,
  deploymentName: string,
  body: GeneratedChatCompletionsOptions,
  options: ClientOpenAIClientGetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  const { functions, functionCall, messages, dataSources, ...rest } = body;
  return context
    .path("/deployments/{deploymentId}/extensions/chat/completions", deploymentName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        ...snakeCaseKeys(rest),
        dataSources: dataSources?.map(
          ({ type, ...opts }) => ({ type, parameters: opts } as AzureChatExtensionConfiguration)
        ),
        functions,
        function_call: functionCall,
        messages: messages.map(serializeChatRequestMessage),
      },
    });
}

function serializeChatRequestMessage(message: ChatRequestMessage): RestChatRequestMessage {
  if (message.content === undefined) {
    message.content = null;
  }
  switch (message.role) {
    case "assistant": {
      const { functionCall, toolCalls, ...rest } = message;
      return {
        ...snakeCaseKeys(rest),
        ...(!toolCalls || toolCalls.length === 0 ? {} : { tool_calls: toolCalls }),
        ...(functionCall ? { function_call: functionCall } : {}),
      };
    }
    default: {
      return snakeCaseKeys(message);
    }
  }
}

function _getChatCompletionsSend(
  context: Client,
  deploymentName: string,
  body: GeneratedChatCompletionsOptions,
  options: ClientOpenAIClientGetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<GetChatCompletions200Response | GetChatCompletionsDefaultResponse> {
  const { functions, functionCall, messages, ...rest } = body;
  return context.path("/deployments/{deploymentId}/chat/completions", deploymentName).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      ...snakeCaseKeys(rest),
      functions,
      function_call: functionCall,
      messages: messages.map(serializeChatRequestMessage),
    },
  });
}

export async function _getChatCompletionsWithAzureExtensionsDeserialize(): Promise<any> {
  return {} as any;
}

export async function getChatCompletionsWithAzureExtensions(
  _context: Client,
  _deploymentId: string,
  _body: ChatCompletionsOptions,
  _options: ClientOpenAIClientGetChatCompletionsWithAzureExtensionsOptions = {}
): Promise<ChatCompletions> {
  return {} as any;
}
