// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CompletionsOptions,
  Completions,
  ChatCompletionsOptions,
  ChatCompletions,
  ImageGenerationOptions,
  ImageGenerations,
  EmbeddingsOptions,
  Embeddings,
  ChatRequestMessageUnion,
  EventStream,
  ContentFilterResultsForChoice,
  ContentFilterResultDetailsForPrompt,
  ContentFilterResultsForPrompt,
} from "../models/models.js";
import {
  serializeChatRequestMessageUnion,
  serializeAzureChatExtensionConfigurationUnion,
} from "../utils/serializeUtil.js";
import {
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  GetImageGenerations200Response,
  GetImageGenerationsDefaultResponse,
  isUnexpected,
  OpenAIContext as Client,
  ContentFilterResultsForChoiceOutput,
  ContentFilterResultDetailsForPromptOutput,
  ContentFilterResultsForPromptOutput,
  ChatCompletionsOutput,
  CompletionsOutput,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  ErrorModel,
} from "@azure-rest/core-client";
import {
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetEmbeddingsOptions,
  GetImagesOptions,
  GetImageGenerationsOptions,
  GeneratedGetChatCompletionsOptions,
} from "../models/options.js";
import { getOaiSSEs } from "./oaiSse.js";
import { createFile } from "@azure/core-rest-pipeline";
import {
  GetAudioTranscriptionOptions,
  AudioResultSimpleJson,
  AudioResultFormat,
  AudioResult,
  GetAudioTranslationOptions,
} from "../models/audio.js";
import { snakeCaseKeys, camelCaseKeys, createOpenAIError } from "./util.js";

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
  options?: GetAudioTranscriptionOptions,
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
  options?: GetAudioTranscriptionOptions,
): Promise<AudioResult<Format>>;
// implementation
export async function getAudioTranscription<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  fileContent: Uint8Array,
  formatOrOptions?: Format | GetAudioTranscriptionOptions,
  inputOptions?: GetAudioTranscriptionOptions,
): Promise<AudioResult<Format>> {
  const options =
    inputOptions ?? (typeof formatOrOptions === "string" ? {} : (formatOrOptions ?? {}));
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
        ...(response_format ? { response_format } : {}),
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
  options?: GetAudioTranslationOptions,
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
  options?: GetAudioTranslationOptions,
): Promise<AudioResult<Format>>;
// implementation
export async function getAudioTranslation<Format extends AudioResultFormat>(
  context: Client,
  deploymentName: string,
  fileContent: Uint8Array,
  formatOrOptions?: Format | GetAudioTranslationOptions,
  inputOptions?: GetAudioTranslationOptions,
): Promise<AudioResult<Format>> {
  const options =
    inputOptions ?? (typeof formatOrOptions === "string" ? {} : (formatOrOptions ?? {}));
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
        ...(response_format ? { response_format } : {}),
      },
    });
  if (status !== "200") {
    throw body.error;
  }
  return response_format !== "verbose_json"
    ? body
    : (camelCaseKeys(body) as unknown as AudioResult<Format>);
}

export function _getCompletionsSend(
  context: Client,
  deploymentId: string,
  body: CompletionsOptions,
  options: GetCompletionsOptions = { requestOptions: {} },
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
      suffix: body["suffix"],
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
  result: GetCompletions200Response | GetCompletionsDefaultResponse,
): Promise<Completions> {
  if (isUnexpected(result)) {
    throw createOpenAIError(result);
  }

  return getCompletionsResult(result.body);
}

export function getCompletionsResult(
  body: CompletionsOutput & ContentFilterResultsForPromptX,
): Completions {
  const { created, choices, prompt_filter_results, prompt_annotations, ...rest } = body;
  return {
    ...camelCaseKeys(rest),
    created: new Date(created),
    ...{
      promptFilterResults: getContentFilterResultsForPrompt({
        prompt_filter_results,
        prompt_annotations,
      }),
    },
    choices: choices.map(({ content_filter_results, ...choice }) => ({
      ...camelCaseKeys(choice),
      ...(!content_filter_results
        ? {}
        : {
            contentFilterResults: parseContentFilterResultsForChoiceOutput(content_filter_results),
          }),
    })),
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
  prompt: string[],
  options: GetCompletionsOptions = { requestOptions: {} },
): Promise<Completions> {
  const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
  const result = await _getCompletionsSend(
    context,
    deploymentId,
    { prompt, ...rest },
    { abortSignal, onResponse, requestOptions, tracingOptions },
  );
  return _getCompletionsDeserialize(result);
}

export function streamCompletions(
  context: Client,
  deploymentName: string,
  prompt: string[],
  options: GetCompletionsOptions = { requestOptions: {} },
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
    { abortSignal, onResponse, requestOptions, tracingOptions },
  );
  return getOaiSSEs(response, getCompletionsResult);
}

export function _getChatCompletionsSend(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GeneratedGetChatCompletionsOptions = { requestOptions: {} },
): StreamableMethod<GetChatCompletions200Response | GetChatCompletionsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/chat/completions", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      model: body["model"],
      stream: body["stream"],
      max_tokens: body["maxTokens"],
      temperature: body["temperature"],
      top_p: body["topP"],
      logit_bias: body["logitBias"],
      user: body["user"],
      n: body["n"],
      stop: body["stop"],
      presence_penalty: body["presencePenalty"],
      frequency_penalty: body["frequencyPenalty"],
      data_sources:
        body["dataSources"] === undefined
          ? body["dataSources"]
          : body["dataSources"].map((p) => serializeAzureChatExtensionConfigurationUnion(p)),
      enhancements: !body.enhancements
        ? undefined
        : {
            grounding: !body.enhancements?.grounding
              ? undefined
              : { enabled: body.enhancements?.grounding?.["enabled"] },
            ocr: !body.enhancements?.ocr
              ? undefined
              : { enabled: body.enhancements?.ocr?.["enabled"] },
          },
      seed: body["seed"],
      logprobs: body["logprobs"],
      top_logprobs: body["topLogprobs"],
      response_format: !body.responseFormat ? undefined : { type: body.responseFormat?.["type"] },
      tool_choice: body["toolChoice"],
      tools: body["tools"],
      functions:
        body["functions"] === undefined
          ? body["functions"]
          : body["functions"].map((p) => ({
              name: p["name"],
              description: p["description"],
              parameters: p["parameters"],
            })),
      function_call: body["functionCall"],
      messages: body["messages"].map((p) => serializeChatRequestMessageUnion(p)),
    },
  });
}

export async function _getChatCompletionsDeserialize(
  result: GetChatCompletions200Response | GetChatCompletionsDefaultResponse,
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw createOpenAIError(result);
  }
  return getChatCompletionsResult(result.body);
}

export function getChatCompletionsResult(
  body: ChatCompletionsOutput & ContentFilterResultsForPromptX,
): ChatCompletions {
  const { created, choices, prompt_filter_results, prompt_annotations, usage, ...rest } = body;
  return {
    ...camelCaseKeys(rest),
    created: new Date(created),
    ...{
      promptFilterResults: getContentFilterResultsForPrompt({
        prompt_filter_results,
        prompt_annotations,
      }),
    },
    ...(!usage
      ? {}
      : {
          usage: {
            completionTokens: usage["completion_tokens"],
            promptTokens: usage["prompt_tokens"],
            totalTokens: usage["total_tokens"],
          },
        }),
    choices: !choices
      ? []
      : choices.map(({ content_filter_results, ...choice }) => ({
          ...camelCaseKeys(choice),
          ...(!content_filter_results
            ? {}
            : {
                contentFilterResults:
                  parseContentFilterResultsForChoiceOutput(content_filter_results),
              }),
        })),
  };
}

/**
 * Gets chat completions for the provided chat messages.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export async function getChatCompletions(
  context: Client,
  deploymentName: string,
  messages: ChatRequestMessageUnion[],
  options: GetChatCompletionsOptions = { requestOptions: {} },
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsSendX(context, deploymentName, messages, options);
  return _getChatCompletionsDeserialize(result);
}

function _getChatCompletionsSendX(
  context: Client,
  deploymentName: string,
  messages: ChatRequestMessageUnion[],
  options: GetChatCompletionsOptions & { stream?: boolean } = { requestOptions: {} },
): StreamableMethod<GetChatCompletions200Response | GetChatCompletionsDefaultResponse> {
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
  return _getChatCompletionsSend(
    context,
    deploymentName,
    { messages, ...rest, ...azure },
    coreOptions,
  );
}

export function streamChatCompletions(
  context: Client,
  deploymentName: string,
  messages: ChatRequestMessageUnion[],
  options: GetChatCompletionsOptions = { requestOptions: {} },
): Promise<EventStream<ChatCompletions>> {
  const response = _getChatCompletionsSendX(context, deploymentName, messages, {
    ...options,
    stream: true,
  });
  return getOaiSSEs(response, getChatCompletionsResult);
}

export function _getImageGenerationsSend(
  context: Client,
  deploymentId: string,
  body: ImageGenerationOptions,
  options: GetImageGenerationsOptions = { requestOptions: {} },
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
  result: GetImageGenerations200Response | GetImageGenerationsDefaultResponse,
): Promise<ImageGenerations> {
  if (isUnexpected(result)) {
    throw createOpenAIError(result);
  }

  return {
    created: new Date(result.body["created"]),
    data: result.body["data"].map((p) => ({
      url: p["url"],
      base64Data: p["b64_json"],
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
      revisedPrompt: p["revised_prompt"],
      promptFilterResults: !p.prompt_filter_results
        ? undefined
        : {
            sexual: !p.prompt_filter_results?.sexual
              ? undefined
              : {
                  severity: p.prompt_filter_results?.sexual?.["severity"],
                  filtered: p.prompt_filter_results?.sexual?.["filtered"],
                },
            violence: !p.prompt_filter_results?.violence
              ? undefined
              : {
                  severity: p.prompt_filter_results?.violence?.["severity"],
                  filtered: p.prompt_filter_results?.violence?.["filtered"],
                },
            hate: !p.prompt_filter_results?.hate
              ? undefined
              : {
                  severity: p.prompt_filter_results?.hate?.["severity"],
                  filtered: p.prompt_filter_results?.hate?.["filtered"],
                },
            selfHarm: !p.prompt_filter_results?.self_harm
              ? undefined
              : {
                  severity: p.prompt_filter_results?.self_harm?.["severity"],
                  filtered: p.prompt_filter_results?.self_harm?.["filtered"],
                },
            profanity: !p.prompt_filter_results?.profanity
              ? undefined
              : {
                  filtered: p.prompt_filter_results?.profanity?.["filtered"],
                  detected: p.prompt_filter_results?.profanity?.["detected"],
                },
            jailbreak: !p.prompt_filter_results?.jailbreak
              ? undefined
              : {
                  filtered: p.prompt_filter_results?.jailbreak?.["filtered"],
                  detected: p.prompt_filter_results?.jailbreak?.["detected"],
                },
          },
    })),
  };
}

/** Creates an image given a prompt. */
export async function getImageGenerations(
  context: Client,
  deploymentId: string,
  prompt: string,
  options: GetImagesOptions = { requestOptions: {} },
): Promise<ImageGenerations> {
  const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
  const result = await _getImageGenerationsSend(
    context,
    deploymentId,
    { prompt, ...rest },
    { abortSignal, onResponse, requestOptions, tracingOptions },
  );
  return _getImageGenerationsDeserialize(result);
}

export function _getEmbeddingsSend(
  context: Client,
  deploymentId: string,
  body: EmbeddingsOptions,
  options: GetEmbeddingsOptions = { requestOptions: {} },
): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse> {
  return context.path("/deployments/{deploymentId}/embeddings", deploymentId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      user: body["user"],
      model: body["model"],
      input: body["input"],
      dimensions: body["dimensions"],
    },
  });
}

export async function _getEmbeddingsDeserialize(
  result: GetEmbeddings200Response | GetEmbeddingsDefaultResponse,
): Promise<Embeddings> {
  if (isUnexpected(result)) {
    throw createOpenAIError(result);
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
  input: string[],
  options: GetEmbeddingsOptions = { requestOptions: {} },
): Promise<Embeddings> {
  const { abortSignal, onResponse, requestOptions, tracingOptions, ...rest } = options;
  const result = await _getEmbeddingsSend(
    context,
    deploymentId,
    { input, ...rest },
    { abortSignal, onResponse, requestOptions, tracingOptions },
  );
  return _getEmbeddingsDeserialize(result);
}

type ContentFilterResultsForPromptX = {
  prompt_filter_results?: Array<ContentFilterResultsForPromptOutput>;
  prompt_annotations?: Array<ContentFilterResultsForPromptOutput>;
};

function getContentFilterResultsForPrompt({
  prompt_annotations,
  prompt_filter_results,
}: ContentFilterResultsForPromptX): ContentFilterResultsForPrompt[] | undefined {
  const res = prompt_filter_results ?? prompt_annotations;
  return res?.map(({ content_filter_results, ...rest }) => ({
    ...camelCaseKeys(rest),
    contentFilterResults: parseContentFilterResultDetailsForPromptOutput(content_filter_results),
  }));
}

function parseContentFilterResultDetailsForPromptOutput({
  error,
  ...rest
}: ContentFilterResultDetailsForPromptOutput = {}): ContentFilterResultDetailsForPrompt {
  return error ? parseError(error) : camelCaseKeys(rest);
}

function parseError(error: ErrorModel): { error: ErrorModel } {
  return {
    error: {
      ...error,
      details: error["details"] ?? [],
    },
  };
}

function parseContentFilterResultsForChoiceOutput({
  error,
  ...successResult
}: ContentFilterResultsForChoiceOutput = {}): ContentFilterResultsForChoice {
  return error
    ? {
        error: {
          ...error,
          details: error["details"] ?? [],
        },
      }
    : camelCaseKeys(successResult);
}
