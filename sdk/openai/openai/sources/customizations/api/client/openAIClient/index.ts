// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatCompletionsOptions as GeneratedChatCompletionsOptions,
  ImageGenerations,
} from "../../../../generated/src/models/models.js";
import { GetChatCompletionsOptions, GetCompletionsOptions } from "../../../models/options.js";
import {
  _getCompletionsSend,
  _getImageGenerationsDeserialize,
  _getImageGenerationsSend,
} from "../../../../generated/src/api/client/openAIClient/index.js";
import { getOaiSSEs } from "../../oaiSse.js";
import {
  OpenAIContext as Client,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  isUnexpected,
  ChatCompletionsOptions as RestChatCompletionsOptions,
  ChatRequestMessage as RestChatRequestMessage,
} from "../../../../generated/src/rest/index.js";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { ChatCompletions, ChatRequestMessage, Completions } from "../../../models/models.js";
import { getChatCompletionsResult, getCompletionsResult } from "./deserializers.js";
import { GetImagesOptions } from "../../../models/options.js";
import { camelCaseKeys, snakeCaseKeys } from "../../util.js";
import {
  AudioResult,
  AudioResultFormat,
  AudioResultSimpleJson,
  GetAudioTranscriptionOptions,
  GetAudioTranslationOptions,
} from "../../../models/audio.js";
import { createFile } from "@azure/core-rest-pipeline";
import { ClientOpenAIClientGetChatCompletionsOptions } from "../../../../generated/src/models/options.js";

export async function _getChatCompletionsDeserialize(
  result: GetChatCompletions200Response | GetChatCompletionsDefaultResponse
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  return getChatCompletionsResult(result.body);
}

export async function _getCompletionsDeserialize(
  result: GetCompletions200Response | GetCompletionsDefaultResponse
): Promise<Completions> {
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  return getCompletionsResult(result.body);
}

export function listCompletions(
  context: Client,
  deploymentName: string,
  prompt: string[],
  options: GetCompletionsOptions = { requestOptions: {} }
): AsyncIterable<Omit<Completions, "usage">> {
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

export function listChatCompletions(
  context: Client,
  deploymentName: string,
  messages: ChatRequestMessage[],
  options: GetChatCompletionsOptions = { requestOptions: {} }
): AsyncIterable<ChatCompletions> {
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
// implementation
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
        file: createFile(fileContent, "placeholder.wav"),
        response_format,
        ...snakeCaseKeys(rest),
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
// implementation
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
        file: createFile(fileContent, "placeholder.wav"),
        response_format,
        ...snakeCaseKeys(rest),
      },
    });
  if (status !== "200") {
    throw body.error;
  }
  return response_format !== "verbose_json"
    ? body
    : (camelCaseKeys(body) as unknown as AudioResult<Format>);
}

function _getChatCompletionsWithAzureExtensionsSend(
  context: Client,
  deploymentName: string,
  body: GeneratedChatCompletionsOptions & { messages: ChatRequestMessage[] },
  options: ClientOpenAIClientGetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  const { functions, functionCall, messages, ...rest } = body;
  return context
    .path("/deployments/{deploymentId}/extensions/chat/completions", deploymentName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        ...snakeCaseKeys(rest),
        functions,
        function_call: functionCall,
        messages: messages.map(serializeChatRequestMessage),
      } as RestChatCompletionsOptions,
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
  body: GeneratedChatCompletionsOptions & { messages: ChatRequestMessage[] },
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
    } as RestChatCompletionsOptions,
  });
}

export async function _getChatCompletionsWithAzureExtensionsDeserialize(): Promise<any> {
  return {} as any;
}

export async function getChatCompletionsWithAzureExtensions(
  _context: unknown,
  _deploymentId: unknown,
  _body: unknown,
  _options: unknown
): Promise<unknown> {
  return {} as any;
}
