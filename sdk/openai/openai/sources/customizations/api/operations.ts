// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatMessage,
  Completions,
  ImageGenerations,
  ImageLocation,
} from "../../generated/src/models/models.js";
import {
  GetChatCompletionsWithAzureExtensionsOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions as GeneratedGetChatCompletionsOptions,
} from "../../generated/src/models/options.js";
import {
  _getCompletionsSend,
  _beginAzureBatchImageGenerationSend,
} from "../../generated/src/api/operations.js";
import { getOaiSSEs } from "./oaiSse.js";
import {
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
  BeginAzureBatchImageGenerationLogicalResponse,
  OpenAIContext as Client,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  ImageGenerationsOutput,
  ImagePayloadOutput,
  getLongRunningPoller,
  isUnexpected,
  ChatMessage as GeneratedChatMessage,
} from "../../generated/src/rest/index.js";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { ChatCompletions } from "../models/models.js";
import { getChatCompletionsResult, getCompletionsResult } from "./deserializers.js";
import { GetChatCompletionsOptions } from "./models.js";
import { ImageGenerationOptions } from "../models/options.js";
import { renameKeysToCamelCase } from "./util.js";
import {
  AudioResult,
  AudioResultFormat,
  AudioResultSimpleJson,
  GetAudioTranscriptionOptions,
  GetAudioTranslationOptions,
} from "../models/audio.js";
import { StreamBuilder, createFileFromStream } from "@azure/core-rest-pipeline";

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
 * @param buildFileStream - A function to return a stream of the audio content to translate.
 * @param options - The options for this audio translation request.
 * @returns The audio translation result.
 */
export async function getAudioTranslation(
  context: Client,
  deploymentName: string,
  buildFileStream: StreamBuilder,
  options?: GetAudioTranslationOptions
): Promise<AudioResultSimpleJson>;
/**
 * Returns the translation of an audio file.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param buildFileStream - A function to return a stream of the audio content to translate.
 * @param format - The format of the result object. See {@link AudioResultFormat} for possible values.
 * @param options - The options for this audio translation request.
 * @returns The audio translation result.
 */
export async function getAudioTranslation<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  buildFileStream: StreamBuilder,
  format: Format,
  options?: GetAudioTranslationOptions
): Promise<AudioResult<Format>>;
// implementation
export async function getAudioTranslation<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  buildFileStream: StreamBuilder,
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
        file: createFileFromStream(buildFileStream, "placeholder.wav"),
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
 * @param buildFileStream - A function to return a stream of the audio content to transcribe.
 * @param options - The options for this audio transcription request.
 * @returns The audio transcription result in a simple JSON format.
 */
export async function getAudioTranscription(
  context: Client,
  deploymentName: string,
  buildFileStream: StreamBuilder,
  options?: GetAudioTranscriptionOptions
): Promise<AudioResultSimpleJson>;
/**
 * Returns the transcription of an audio file.
 * @param context - The context containing the client to use for this request.
 * @param deploymentName - The name of the model deployment (when using Azure OpenAI) or model name (when using non-Azure OpenAI) to use for this request.
 * @param buildFileStream - A function to return a stream of the audio content to transcribe.
 * @param format - The format of the result object. See {@link AudioResultFormat} for possible values.
 * @param options - The options for this audio transcription request.
 * @returns The audio transcription result in a format of your choice.
 */
export async function getAudioTranscription<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  buildFileStream: StreamBuilder,
  format: Format,
  options?: GetAudioTranscriptionOptions
): Promise<AudioResult<Format>>;
// implementation
export async function getAudioTranscription<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  buildFileStream: StreamBuilder,
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
        file: createFileFromStream(buildFileStream, "placeholder.wav"),
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

function parseChatMessage(messages: ChatMessage[]): GeneratedChatMessage[] {
  return messages.map((p: ChatMessage) => ({
    role: p.role,
    content: p.content ?? null,
    name: p.name,
    function_call: p.functionCall,
    context: p.context,
  }));
}
