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
  ImageGenerationOptions,
  ImageGenerations,
  EmbeddingsOptions,
  Embeddings,
} from "../models/models.js";
import { serializeChatRequestMessageUnion } from "../utils/serializeUtil.js";
import {
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
  OpenAIContext as Client,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
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
  GetImageGenerationsOptions,
  GetEmbeddingsOptions,
} from "../models/options.js";

export function _getAudioTranscriptionAsPlainTextSend(
  context: Client,
  deploymentId: string,
  body: AudioTranscriptionOptions,
  options: GetAudioTranscriptionAsPlainTextOptions = { requestOptions: {} },
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
        filename: body["filename"],
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
    | GetAudioTranscriptionAsPlainTextDefaultResponse,
): Promise<string> {
  if (isUnexpected(result)) {
    throw createRestError(result);
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
  options: GetAudioTranscriptionAsPlainTextOptions = { requestOptions: {} },
): Promise<string> {
  const result = await _getAudioTranscriptionAsPlainTextSend(
    context,
    deploymentId,
    body,
    options,
  );
  return _getAudioTranscriptionAsPlainTextDeserialize(result);
}

export function _getAudioTranscriptionAsResponseObjectSend(
  context: Client,
  deploymentId: string,
  body: AudioTranscriptionOptions,
  options: GetAudioTranscriptionAsResponseObjectOptions = {
    requestOptions: {},
  },
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
    | GetAudioTranscriptionAsResponseObjectDefaultResponse,
): Promise<AudioTranscription> {
  if (isUnexpected(result)) {
    throw createRestError(result);
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
  options: GetAudioTranscriptionAsResponseObjectOptions = {
    requestOptions: {},
  },
): Promise<AudioTranscription> {
  const result = await _getAudioTranscriptionAsResponseObjectSend(
    context,
    deploymentId,
    body,
    options,
  );
  return _getAudioTranscriptionAsResponseObjectDeserialize(result);
}

export function _getAudioTranslationAsPlainTextSend(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: GetAudioTranslationAsPlainTextOptions = { requestOptions: {} },
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
        filename: body["filename"],
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
    | GetAudioTranslationAsPlainTextDefaultResponse,
): Promise<string> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Gets English language transcribed text and associated metadata from provided spoken audio data. */
export async function getAudioTranslationAsPlainText(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: GetAudioTranslationAsPlainTextOptions = { requestOptions: {} },
): Promise<string> {
  const result = await _getAudioTranslationAsPlainTextSend(
    context,
    deploymentId,
    body,
    options,
  );
  return _getAudioTranslationAsPlainTextDeserialize(result);
}

export function _getAudioTranslationAsResponseObjectSend(
  context: Client,
  deploymentId: string,
  body: AudioTranslationOptions,
  options: GetAudioTranslationAsResponseObjectOptions = { requestOptions: {} },
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
    | GetAudioTranslationAsResponseObjectDefaultResponse,
): Promise<AudioTranslation> {
  if (isUnexpected(result)) {
    throw createRestError(result);
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
  options: GetAudioTranslationAsResponseObjectOptions = { requestOptions: {} },
): Promise<AudioTranslation> {
  const result = await _getAudioTranslationAsResponseObjectSend(
    context,
    deploymentId,
    body,
    options,
  );
  return _getAudioTranslationAsResponseObjectDeserialize(result);
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

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    promptFilterResults: !result.body["prompt_filter_results"]
      ? result.body["prompt_filter_results"]
      : result.body["prompt_filter_results"].map((p) => ({
          promptIndex: p["prompt_index"],
          contentFilterResults: {
            sexual: !p.content_filter_results.sexual
              ? undefined
              : {
                  severity: p.content_filter_results.sexual?.["severity"],
                  filtered: p.content_filter_results.sexual?.["filtered"],
                },
            violence: !p.content_filter_results.violence
              ? undefined
              : {
                  severity: p.content_filter_results.violence?.["severity"],
                  filtered: p.content_filter_results.violence?.["filtered"],
                },
            hate: !p.content_filter_results.hate
              ? undefined
              : {
                  severity: p.content_filter_results.hate?.["severity"],
                  filtered: p.content_filter_results.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results.self_harm?.["severity"],
                  filtered: p.content_filter_results.self_harm?.["filtered"],
                },
            profanity: !p.content_filter_results.profanity
              ? undefined
              : {
                  filtered: p.content_filter_results.profanity?.["filtered"],
                  detected: p.content_filter_results.profanity?.["detected"],
                },
            customBlocklists: !p.content_filter_results["custom_blocklists"]
              ? p.content_filter_results["custom_blocklists"]
              : p.content_filter_results["custom_blocklists"].map((p) => ({
                  id: p["id"],
                  filtered: p["filtered"],
                })),
            error: !p.content_filter_results.error
              ? undefined
              : p.content_filter_results.error,
            jailbreak: !p.content_filter_results.jailbreak
              ? undefined
              : {
                  filtered: p.content_filter_results.jailbreak?.["filtered"],
                  detected: p.content_filter_results.jailbreak?.["detected"],
                },
          },
        })),
    choices: result.body["choices"].map((p) => ({
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
            profanity: !p.content_filter_results?.profanity
              ? undefined
              : {
                  filtered: p.content_filter_results?.profanity?.["filtered"],
                  detected: p.content_filter_results?.profanity?.["detected"],
                },
            customBlocklists: !p.content_filter_results?.["custom_blocklists"]
              ? p.content_filter_results?.["custom_blocklists"]
              : p.content_filter_results?.["custom_blocklists"].map((p) => ({
                  id: p["id"],
                  filtered: p["filtered"],
                })),
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
            protectedMaterialText: !p.content_filter_results
              ?.protected_material_text
              ? undefined
              : {
                  filtered:
                    p.content_filter_results?.protected_material_text?.[
                      "filtered"
                    ],
                  detected:
                    p.content_filter_results?.protected_material_text?.[
                      "detected"
                    ],
                },
            protectedMaterialCode: !p.content_filter_results
              ?.protected_material_code
              ? undefined
              : {
                  filtered:
                    p.content_filter_results?.protected_material_code?.[
                      "filtered"
                    ],
                  detected:
                    p.content_filter_results?.protected_material_code?.[
                      "detected"
                    ],
                  url: p.content_filter_results?.protected_material_code?.[
                    "URL"
                  ],
                  license:
                    p.content_filter_results?.protected_material_code?.[
                      "license"
                    ],
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

export function _getChatCompletionsSend(
  context: Client,
  deploymentId: string,
  body: ChatCompletionsOptions,
  options: GetChatCompletionsOptions = { requestOptions: {} },
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
        functions: !body["functions"]
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

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    choices: result.body["choices"].map((p) => ({
      message: !p.message
        ? undefined
        : {
            role: p.message?.["role"],
            content: p.message?.["content"],
            toolCalls: !p.message?.["tool_calls"]
              ? p.message?.["tool_calls"]
              : p.message?.["tool_calls"],
            functionCall: !p.message?.function_call
              ? undefined
              : {
                  name: p.message?.function_call?.["name"],
                  arguments: p.message?.function_call?.["arguments"],
                },
            context: !p.message?.context
              ? undefined
              : {
                  messages: !p.message?.context?.["messages"]
                    ? p.message?.context?.["messages"]
                    : p.message?.context?.["messages"].map((p) => ({
                        role: p["role"],
                        content: p["content"],
                        toolCalls: !p["tool_calls"]
                          ? p["tool_calls"]
                          : p["tool_calls"],
                        functionCall: !p.function_call
                          ? undefined
                          : {
                              name: p.function_call?.["name"],
                              arguments: p.function_call?.["arguments"],
                            },
                        context: !p.context ? undefined : (p.context as any),
                      })),
                },
          },
      index: p["index"],
      finishReason: p["finish_reason"],
      finishDetails: !p.finish_details
        ? undefined
        : { type: p.finish_details?.["type"] },
      delta: !p.delta
        ? undefined
        : {
            role: p.delta?.["role"],
            content: p.delta?.["content"],
            toolCalls: !p.delta?.["tool_calls"]
              ? p.delta?.["tool_calls"]
              : p.delta?.["tool_calls"],
            functionCall: !p.delta?.function_call
              ? undefined
              : {
                  name: p.delta?.function_call?.["name"],
                  arguments: p.delta?.function_call?.["arguments"],
                },
            context: !p.delta?.context
              ? undefined
              : {
                  messages: !p.delta?.context?.["messages"]
                    ? p.delta?.context?.["messages"]
                    : p.delta?.context?.["messages"].map((p) => ({
                        role: p["role"],
                        content: p["content"],
                        toolCalls: !p["tool_calls"]
                          ? p["tool_calls"]
                          : p["tool_calls"],
                        functionCall: !p.function_call
                          ? undefined
                          : {
                              name: p.function_call?.["name"],
                              arguments: p.function_call?.["arguments"],
                            },
                        context: !p.context ? undefined : (p.context as any),
                      })),
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
            profanity: !p.content_filter_results?.profanity
              ? undefined
              : {
                  filtered: p.content_filter_results?.profanity?.["filtered"],
                  detected: p.content_filter_results?.profanity?.["detected"],
                },
            customBlocklists: !p.content_filter_results?.["custom_blocklists"]
              ? p.content_filter_results?.["custom_blocklists"]
              : p.content_filter_results?.["custom_blocklists"].map((p) => ({
                  id: p["id"],
                  filtered: p["filtered"],
                })),
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
            protectedMaterialText: !p.content_filter_results
              ?.protected_material_text
              ? undefined
              : {
                  filtered:
                    p.content_filter_results?.protected_material_text?.[
                      "filtered"
                    ],
                  detected:
                    p.content_filter_results?.protected_material_text?.[
                      "detected"
                    ],
                },
            protectedMaterialCode: !p.content_filter_results
              ?.protected_material_code
              ? undefined
              : {
                  filtered:
                    p.content_filter_results?.protected_material_code?.[
                      "filtered"
                    ],
                  detected:
                    p.content_filter_results?.protected_material_code?.[
                      "detected"
                    ],
                  url: p.content_filter_results?.protected_material_code?.[
                    "URL"
                  ],
                  license:
                    p.content_filter_results?.protected_material_code?.[
                      "license"
                    ],
                },
          },
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
    promptFilterResults: !result.body["prompt_filter_results"]
      ? result.body["prompt_filter_results"]
      : result.body["prompt_filter_results"].map((p) => ({
          promptIndex: p["prompt_index"],
          contentFilterResults: {
            sexual: !p.content_filter_results.sexual
              ? undefined
              : {
                  severity: p.content_filter_results.sexual?.["severity"],
                  filtered: p.content_filter_results.sexual?.["filtered"],
                },
            violence: !p.content_filter_results.violence
              ? undefined
              : {
                  severity: p.content_filter_results.violence?.["severity"],
                  filtered: p.content_filter_results.violence?.["filtered"],
                },
            hate: !p.content_filter_results.hate
              ? undefined
              : {
                  severity: p.content_filter_results.hate?.["severity"],
                  filtered: p.content_filter_results.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results.self_harm?.["severity"],
                  filtered: p.content_filter_results.self_harm?.["filtered"],
                },
            profanity: !p.content_filter_results.profanity
              ? undefined
              : {
                  filtered: p.content_filter_results.profanity?.["filtered"],
                  detected: p.content_filter_results.profanity?.["detected"],
                },
            customBlocklists: !p.content_filter_results["custom_blocklists"]
              ? p.content_filter_results["custom_blocklists"]
              : p.content_filter_results["custom_blocklists"].map((p) => ({
                  id: p["id"],
                  filtered: p["filtered"],
                })),
            error: !p.content_filter_results.error
              ? undefined
              : p.content_filter_results.error,
            jailbreak: !p.content_filter_results.jailbreak
              ? undefined
              : {
                  filtered: p.content_filter_results.jailbreak?.["filtered"],
                  detected: p.content_filter_results.jailbreak?.["detected"],
                },
          },
        })),
    systemFingerprint: result.body["system_fingerprint"],
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
  options: GetChatCompletionsOptions = { requestOptions: {} },
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsSend(
    context,
    deploymentId,
    body,
    options,
  );
  return _getChatCompletionsDeserialize(result);
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
        functions: !body["functions"]
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

export async function _getChatCompletionsWithAzureExtensionsDeserialize(
  result:
    | GetChatCompletionsWithAzureExtensions200Response
    | GetChatCompletionsWithAzureExtensionsDefaultResponse,
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    created: new Date(result.body["created"]),
    choices: result.body["choices"].map((p) => ({
      message: !p.message
        ? undefined
        : {
            role: p.message?.["role"],
            content: p.message?.["content"],
            toolCalls: !p.message?.["tool_calls"]
              ? p.message?.["tool_calls"]
              : p.message?.["tool_calls"],
            functionCall: !p.message?.function_call
              ? undefined
              : {
                  name: p.message?.function_call?.["name"],
                  arguments: p.message?.function_call?.["arguments"],
                },
            context: !p.message?.context
              ? undefined
              : {
                  messages: !p.message?.context?.["messages"]
                    ? p.message?.context?.["messages"]
                    : p.message?.context?.["messages"].map((p) => ({
                        role: p["role"],
                        content: p["content"],
                        toolCalls: !p["tool_calls"]
                          ? p["tool_calls"]
                          : p["tool_calls"],
                        functionCall: !p.function_call
                          ? undefined
                          : {
                              name: p.function_call?.["name"],
                              arguments: p.function_call?.["arguments"],
                            },
                        context: !p.context ? undefined : (p.context as any),
                      })),
                },
          },
      index: p["index"],
      finishReason: p["finish_reason"],
      finishDetails: !p.finish_details
        ? undefined
        : { type: p.finish_details?.["type"] },
      delta: !p.delta
        ? undefined
        : {
            role: p.delta?.["role"],
            content: p.delta?.["content"],
            toolCalls: !p.delta?.["tool_calls"]
              ? p.delta?.["tool_calls"]
              : p.delta?.["tool_calls"],
            functionCall: !p.delta?.function_call
              ? undefined
              : {
                  name: p.delta?.function_call?.["name"],
                  arguments: p.delta?.function_call?.["arguments"],
                },
            context: !p.delta?.context
              ? undefined
              : {
                  messages: !p.delta?.context?.["messages"]
                    ? p.delta?.context?.["messages"]
                    : p.delta?.context?.["messages"].map((p) => ({
                        role: p["role"],
                        content: p["content"],
                        toolCalls: !p["tool_calls"]
                          ? p["tool_calls"]
                          : p["tool_calls"],
                        functionCall: !p.function_call
                          ? undefined
                          : {
                              name: p.function_call?.["name"],
                              arguments: p.function_call?.["arguments"],
                            },
                        context: !p.context ? undefined : (p.context as any),
                      })),
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
            profanity: !p.content_filter_results?.profanity
              ? undefined
              : {
                  filtered: p.content_filter_results?.profanity?.["filtered"],
                  detected: p.content_filter_results?.profanity?.["detected"],
                },
            customBlocklists: !p.content_filter_results?.["custom_blocklists"]
              ? p.content_filter_results?.["custom_blocklists"]
              : p.content_filter_results?.["custom_blocklists"].map((p) => ({
                  id: p["id"],
                  filtered: p["filtered"],
                })),
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
            protectedMaterialText: !p.content_filter_results
              ?.protected_material_text
              ? undefined
              : {
                  filtered:
                    p.content_filter_results?.protected_material_text?.[
                      "filtered"
                    ],
                  detected:
                    p.content_filter_results?.protected_material_text?.[
                      "detected"
                    ],
                },
            protectedMaterialCode: !p.content_filter_results
              ?.protected_material_code
              ? undefined
              : {
                  filtered:
                    p.content_filter_results?.protected_material_code?.[
                      "filtered"
                    ],
                  detected:
                    p.content_filter_results?.protected_material_code?.[
                      "detected"
                    ],
                  url: p.content_filter_results?.protected_material_code?.[
                    "URL"
                  ],
                  license:
                    p.content_filter_results?.protected_material_code?.[
                      "license"
                    ],
                },
          },
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
    promptFilterResults: !result.body["prompt_filter_results"]
      ? result.body["prompt_filter_results"]
      : result.body["prompt_filter_results"].map((p) => ({
          promptIndex: p["prompt_index"],
          contentFilterResults: {
            sexual: !p.content_filter_results.sexual
              ? undefined
              : {
                  severity: p.content_filter_results.sexual?.["severity"],
                  filtered: p.content_filter_results.sexual?.["filtered"],
                },
            violence: !p.content_filter_results.violence
              ? undefined
              : {
                  severity: p.content_filter_results.violence?.["severity"],
                  filtered: p.content_filter_results.violence?.["filtered"],
                },
            hate: !p.content_filter_results.hate
              ? undefined
              : {
                  severity: p.content_filter_results.hate?.["severity"],
                  filtered: p.content_filter_results.hate?.["filtered"],
                },
            selfHarm: !p.content_filter_results.self_harm
              ? undefined
              : {
                  severity: p.content_filter_results.self_harm?.["severity"],
                  filtered: p.content_filter_results.self_harm?.["filtered"],
                },
            profanity: !p.content_filter_results.profanity
              ? undefined
              : {
                  filtered: p.content_filter_results.profanity?.["filtered"],
                  detected: p.content_filter_results.profanity?.["detected"],
                },
            customBlocklists: !p.content_filter_results["custom_blocklists"]
              ? p.content_filter_results["custom_blocklists"]
              : p.content_filter_results["custom_blocklists"].map((p) => ({
                  id: p["id"],
                  filtered: p["filtered"],
                })),
            error: !p.content_filter_results.error
              ? undefined
              : p.content_filter_results.error,
            jailbreak: !p.content_filter_results.jailbreak
              ? undefined
              : {
                  filtered: p.content_filter_results.jailbreak?.["filtered"],
                  detected: p.content_filter_results.jailbreak?.["detected"],
                },
          },
        })),
    systemFingerprint: result.body["system_fingerprint"],
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
  options: GetChatCompletionsWithAzureExtensionsOptions = {
    requestOptions: {},
  },
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsWithAzureExtensionsSend(
    context,
    deploymentId,
    body,
    options,
  );
  return _getChatCompletionsWithAzureExtensionsDeserialize(result);
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
  options: GetImageGenerationsOptions = { requestOptions: {} },
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
