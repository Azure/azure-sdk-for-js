// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatCompletionsOptions as GeneratedChatCompletionsOptions,
  ChatMessage,
  Completions,
  ImageGenerations,
  ImageLocation,
} from "../../generated/src/models/models.js";
import { GetCompletionsOptions } from "../models/options.js";
import {
  _getCompletionsSend,
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
import { ImageGenerationOptions } from "../models/options.js";
import { ImageGenerationOptions as GeneratedImageGenerationOptions } from "../../generated/src/models/models.js";
import { renameKeysToCamelCase } from "./util.js";
import {
  AudioResult,
  AudioResultFormat,
  AudioResultSimpleJson,
  GetAudioTranscriptionOptions,
  GetAudioTranslationOptions,
} from "../models/audio.js";
import { createFile } from "@azure/core-rest-pipeline";
import { BeginAzureBatchImageGenerationOptions as GeneratedBatchImageGenerationOptions, GetChatCompletionsOptions as GeneratedGetChatCompletionsOptions } from "../../generated/src/models/options.js";
import { GetChatCompletionsOptions } from "./models.js";

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
  const { temperature, prompt, model, ...rest } = options;
  const { body, status } = await context
    .pathUnchecked("deployments/{deploymentId}/audio/translations", deploymentName)
    .post({
      body: {
        file: createFile(fileContent, "placeholder.wav"),
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
  const { temperature, language, prompt, model, ...rest } = options;
  const { body, status } = await context
    .pathUnchecked("deployments/{deploymentId}/audio/transcriptions", deploymentName)
    .post({
      body: {
        file: createFile(fileContent, "placeholder.wav"),
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
