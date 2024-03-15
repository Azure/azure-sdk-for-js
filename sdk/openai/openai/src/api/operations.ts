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
  ChatResponseMessage,
  ContentFilterResultsForChoice,
  ContentFilterResultDetailsForPrompt,
  ContentFilterResultsForPrompt,
} from "../models/models.js";
import { serializeChatRequestMessageUnion } from "../utils/serializeUtil.js";
import {
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
  OpenAIContext as Client,
  ChatResponseMessageOutput,
  ContentFilterResultsForChoiceOutput,
  ContentFilterResultDetailsForPromptOutput,
  ContentFilterResultsForPromptOutput,
  ChatCompletionsOutput,
  CompletionsOutput,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
  ErrorModel,
} from "@azure-rest/core-client";
import {
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetEmbeddingsOptions,
  GetImagesOptions,
  GetImageGenerationsOptions,
  GeneratedGetChatCompletionsOptions,
} from "../models/options.js";
import { getOaiSSEs } from "./oaiSse.js";
import { createFile } from "@azure/core-rest-pipeline";
import { GetAudioTranscriptionOptions, AudioResultSimpleJson, AudioResultFormat, AudioResult, GetAudioTranslationOptions } from "../models/audio.js";
import { snakeCaseKeys, camelCaseKeys } from "./util.js";

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
  result: GetCompletions200Response | GetCompletionsDefaultResponse,
): Promise<Completions> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return getCompletionsResult(result.body);
}

export function getCompletionsResult(body: CompletionsOutput & ContentFilterResultsForPromptX): Completions {
  const { prompt_annotations, prompt_filter_results } = body;
  return {
    id: body["id"],
    created: new Date(body["created"]),
    promptFilterResults: getContentFilterResultsForPrompt({
      prompt_filter_results,
      prompt_annotations,
    }),
    choices: !body["choices"] 
      ? []
      : body["choices"].map((p) => ({
        ...(!p.content_filter_results
          ? {}
          : {
            contentFilterResults: parseContentFilterResultsForChoiceOutput(p.content_filter_results),
          }),
        text: p["text"],
        index: p["index"],
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
    usage: !body["usage"]
    ? body["usage"]
    : {
      completionTokens: body.usage["completion_tokens"],
      promptTokens: body.usage["prompt_tokens"],
      totalTokens: body.usage["total_tokens"],
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
  options: GetCompletionsOptions = { requestOptions: {} },
): Promise<Completions> {
  const result = await _getCompletionsSend(
    context,
    deploymentId,
    body,
    options,
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
): StreamableMethod<
  GetChatCompletions200Response | GetChatCompletionsDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/chat/completions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: body["messages"].map((p) =>
          serializeChatRequestMessageUnion(p),
        ),
        functions:
          body["functions"] === undefined
            ? body["functions"]
            : body["functions"].map((p) => ({
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
        dataSources: body["dataSources"],
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
        response_format: !body.responseFormat
          ? undefined
          : { type: body.responseFormat?.["type"] },
        tools: body["tools"],
        tool_choice: body["toolChoice"],
      },
    });
}

export async function _getChatCompletionsDeserialize(
  result: GetChatCompletions200Response | GetChatCompletionsDefaultResponse,
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return getChatCompletionsResult(result.body);
}

export function getChatCompletionsResult(
  body: ChatCompletionsOutput & ContentFilterResultsForPromptX,
): ChatCompletions {
  const {prompt_annotations, prompt_filter_results} = body;
  return {
    id: body["id"],
    created: new Date(body["created"]),
    choices: !body["choices"]
    ? []
      : body["choices"].map((p) => ({
        ...(!p.delta ? {} : { delta: parseMessage(p.delta) }),
        ...(!p.message ? {} : { message: parseMessage(p.message) }),
        ...(!p.content_filter_results
          ? {}
          : {
            contentFilterResults:
              parseContentFilterResultsForChoiceOutput(p.content_filter_results),
          }),
        index: p["index"],
        finishReason: p["finish_reason"],
        finishDetails: !p.finish_details
          ? undefined
          : { type: p.finish_details?.["type"] },
        enhancements: !p.enhancements
          ? undefined
          : {
            grounding: !p.enhancements?.grounding
              ? undefined
              : {
                lines: p.enhancements?.grounding?.["lines"].map((p) => ({
                  text: p["text"],
                  spans: p["spans"].map((p) => ({
                    text: p["text"],
                    offset: p["offset"],
                    length: p["length"],
                    polygon: p["polygon"].map((p) => ({
                      x: p["x"],
                      y: p["y"],
                    })),
                  })),
})),
              },
          },
      })),
    promptFilterResults: getContentFilterResultsForPrompt({
      prompt_filter_results,
      prompt_annotations,
    }),
    systemFingerprint: body["system_fingerprint"],
    usage: !body["usage"]
      ? body["usage"]
      : {
        completionTokens: body.usage["completion_tokens"],
        promptTokens: body.usage["prompt_tokens"],
        totalTokens: body.usage["total_tokens"],
      },
  }
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
  const result = await _getChatCompletionsSendX(
    context,
    deploymentName,
    messages,
    options,
  );
  return _getChatCompletionsDeserialize(result);
}

function _getChatCompletionsSendX(
  context: Client,
  deploymentName: string,
  messages: ChatRequestMessageUnion[],
  options: GetChatCompletionsOptions & { stream?: boolean } = { requestOptions: {} },
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
        coreOptions,
      )
    : _getChatCompletionsSend(context, deploymentName, { messages, ...rest }, coreOptions);
}

export function _getChatCompletionsWithAzureExtensionsSend(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsWithAzureExtensionsOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | GetChatCompletionsWithAzureExtensions200Response
  | GetChatCompletionsWithAzureExtensionsDefaultResponse
> {
  return context
    .path(
      "/deployments/{deploymentId}/extensions/chat/completions",
      deploymentId,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: body["messages"].map((p) =>
          serializeChatRequestMessageUnion(p),
        ),
        functions:
          body["functions"] === undefined
            ? body["functions"]
            : body["functions"].map((p) => ({
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
        dataSources: body["dataSources"],
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
        response_format: !body.responseFormat
          ? undefined
          : { type: body.responseFormat?.["type"] },
        tools: body["tools"],
        tool_choice: body["toolChoice"],
      },
    });
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
): StreamableMethod<
  GetImageGenerations200Response | GetImageGenerationsDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/images/generations", deploymentId)
    .post({
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
    throw createRestError(result);
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
  body: ImageGenerationOptions,
  options: GetImagesOptions = { requestOptions: {} },
): Promise<ImageGenerations> {
  const result = await _getImageGenerationsSend(
    context,
    deploymentId,
    body,
    options,
  );
  return _getImageGenerationsDeserialize(result);
}

export function _getEmbeddingsSend(
  context: Client,
  deploymentId: string,
  body: EmbeddingsOptions,
  options: GetEmbeddingsOptions = { requestOptions: {} },
): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse> {
  return context
    .path("/deployments/{deploymentId}/embeddings", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { user: body["user"], model: body["model"], input: body["input"] },
    });
}

export async function _getEmbeddingsDeserialize(
  result: GetEmbeddings200Response | GetEmbeddingsDefaultResponse,
): Promise<Embeddings> {
  if (isUnexpected(result)) {
    throw createRestError(result);
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
  options: GetEmbeddingsOptions = { requestOptions: {} },
): Promise<Embeddings> {
  const result = await _getEmbeddingsSend(context, deploymentId, body, options);
  return _getEmbeddingsDeserialize(result);
}

type ContentFilterResultsForPromptX = {
  prompt_filter_results?: Array<ContentFilterResultsForPromptOutput>;
  prompt_annotations?: Array<ContentFilterResultsForPromptOutput>;
};

function getContentFilterResultsForPrompt({
  prompt_annotations,
  prompt_filter_results,
}: ContentFilterResultsForPromptX): ContentFilterResultsForPrompt[] {
  const res = prompt_filter_results ?? prompt_annotations;
  return (
    res?.map(({ content_filter_results, ...rest }) => ({
      ...camelCaseKeys(rest),
      contentFilterResults: parseContentFilterResultDetailsForPromptOutput(content_filter_results),
    })) ?? []
  );
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
  return error ? {
    error: {
      ...error,
      details: error["details"] ?? []
    }
  } : {
    sexual: !successResult?.sexual
      ? undefined
      : {
        severity: successResult?.sexual?.["severity"],
        filtered: successResult?.sexual?.["filtered"],
      },
    violence: !successResult?.violence
      ? undefined
      : {
        severity: successResult?.violence?.["severity"],
        filtered: successResult?.violence?.["filtered"],
      },
    hate: !successResult?.hate
      ? undefined
      : {
        severity: successResult?.hate?.["severity"],
        filtered: successResult?.hate?.["filtered"],
      },
    selfHarm: !successResult?.self_harm
      ? undefined
      : {
        severity: successResult?.self_harm?.["severity"],
        filtered: successResult?.self_harm?.["filtered"],
      },
    profanity: !successResult?.profanity
      ? undefined
      : {
        filtered: successResult?.profanity?.["filtered"],
        detected: successResult?.profanity?.["detected"],
      },
    customBlocklists: !successResult?.["custom_blocklists"]
      ? successResult?.["custom_blocklists"]
      : successResult?.["custom_blocklists"].map((p) => ({
        id: p["id"],
        filtered: p["filtered"],
      })),
    protectedMaterialText: !successResult
      ?.protected_material_text
      ? undefined
      : {
        filtered:
          successResult?.protected_material_text?.[
          "filtered"
          ],
        detected:
          successResult?.protected_material_text?.[
          "detected"
          ],
      },
    protectedMaterialCode: !successResult
      ?.protected_material_code
      ? undefined
      : {
        filtered:
          successResult?.protected_material_code?.[
          "filtered"
          ],
        detected:
          successResult?.protected_material_code?.[
          "detected"
          ],
        url: successResult?.protected_material_code?.[
          "URL"
        ],
        license:
          successResult?.protected_material_code?.[
          "license"
          ],
      },
  };
}

function parseMessage(message: ChatResponseMessageOutput): ChatResponseMessage {
  const { context, tool_calls, ...rest } = message;
  return {
    ...camelCaseKeys(rest),
    toolCalls: tool_calls ?? [],
    ...(!context
      ? {}
      : {
        context: {
          ...(!context.messages
            ? {}
            : {
              messages: context.messages.map(parseMessage),
            }),
        },
      }),
  };
}
