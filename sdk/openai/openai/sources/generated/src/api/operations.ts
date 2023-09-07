// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AudioTranscriptionSimpleJson,
  AudioTranscriptionVerboseJson,
  Completions,
  ChatMessage,
  ChatCompletions,
  Embeddings,
  BatchImageGenerationOperationResponse,
} from "../models/models.js";
import {
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
  BeginAzureBatchImageGenerationLogicalResponse,
  GetAudioTranscriptionPlainText200Response,
  GetAudioTranscriptionPlainTextDefaultResponse,
  GetAudioTranscriptionSimpleJson200Response,
  GetAudioTranscriptionSimpleJsonDefaultResponse,
  GetAudioTranscriptionSrt200Response,
  GetAudioTranscriptionSrtDefaultResponse,
  GetAudioTranscriptionVerboseJson200Response,
  GetAudioTranscriptionVerboseJsonDefaultResponse,
  GetAudioTranscriptionVtt200Response,
  GetAudioTranscriptionVttDefaultResponse,
  GetAudioTranslationPlainText200Response,
  GetAudioTranslationPlainTextDefaultResponse,
  GetAudioTranslationSimpleJson200Response,
  GetAudioTranslationSimpleJsonDefaultResponse,
  GetAudioTranslationSrt200Response,
  GetAudioTranslationSrtDefaultResponse,
  GetAudioTranslationVerboseJson200Response,
  GetAudioTranslationVerboseJsonDefaultResponse,
  GetAudioTranslationVtt200Response,
  GetAudioTranslationVttDefaultResponse,
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
  isUnexpected,
  OpenAIContext as Client,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  GetAudioTranscriptionSimpleJsonOptions,
  GetAudioTranscriptionVerboseJsonOptions,
  GetAudioTranscriptionPlainTextOptions,
  GetAudioTranscriptionSrtOptions,
  GetAudioTranscriptionVttOptions,
  GetAudioTranslationSimpleJsonOptions,
  GetAudioTranslationVerboseJsonOptions,
  GetAudioTranslationPlainTextOptions,
  GetAudioTranslationSrtOptions,
  GetAudioTranslationVttOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetEmbeddingsOptions,
  GetAzureBatchImageGenerationOperationStatusOptions,
  BeginAzureBatchImageGenerationOptions,
} from "../models/options.js";

export function _getAudioTranscriptionSimpleJsonSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionSimpleJsonOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranscriptionSimpleJson200Response
  | GetAudioTranscriptionSimpleJsonDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/transcriptions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        language: options?.language,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranscriptionSimpleJsonDeserialize(
  result:
    | GetAudioTranscriptionSimpleJson200Response
    | GetAudioTranscriptionSimpleJsonDefaultResponse
): Promise<AudioTranscriptionSimpleJson> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    text: result.body["text"],
  };
}

/** Transcribes audio into the input language. */
export async function getAudioTranscriptionSimpleJson(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionSimpleJsonOptions = { requestOptions: {} }
): Promise<AudioTranscriptionSimpleJson> {
  const result = await _getAudioTranscriptionSimpleJsonSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranscriptionSimpleJsonDeserialize(result);
}

export function _getAudioTranscriptionVerboseJsonSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionVerboseJsonOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranscriptionVerboseJson200Response
  | GetAudioTranscriptionVerboseJsonDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/transcriptions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        language: options?.language,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranscriptionVerboseJsonDeserialize(
  result:
    | GetAudioTranscriptionVerboseJson200Response
    | GetAudioTranscriptionVerboseJsonDefaultResponse
): Promise<AudioTranscriptionVerboseJson> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    task: result.body["task"],
    language: result.body["language"],
    duration: result.body["duration"],
    segments: (result.body["segments"] ?? []).map((p) => ({
      id: p["id"],
      start: p["start"],
      end: p["end"],
      text: p["text"],
      temperature: p["temperature"],
      averageLogProb: p["avg_logprob"],
      compressionRatio: p["compression_ratio"],
      noSpeechProb: p["no_speech_prob"],
      tokens: p["tokens"],
      seek: p["seek"],
    })),
  };
}

/** Transcribes audio into the input language. */
export async function getAudioTranscriptionVerboseJson(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionVerboseJsonOptions = { requestOptions: {} }
): Promise<AudioTranscriptionVerboseJson> {
  const result = await _getAudioTranscriptionVerboseJsonSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranscriptionVerboseJsonDeserialize(result);
}

export function _getAudioTranscriptionPlainTextSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionPlainTextOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranscriptionPlainText200Response
  | GetAudioTranscriptionPlainTextDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/transcriptions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        language: options?.language,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranscriptionPlainTextDeserialize(
  result:
    | GetAudioTranscriptionPlainText200Response
    | GetAudioTranscriptionPlainTextDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Transcribes audio into the input language. */
export async function getAudioTranscriptionPlainText(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionPlainTextOptions = { requestOptions: {} }
): Promise<string> {
  const result = await _getAudioTranscriptionPlainTextSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranscriptionPlainTextDeserialize(result);
}

export function _getAudioTranscriptionSrtSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionSrtOptions = { requestOptions: {} }
): StreamableMethod<
  GetAudioTranscriptionSrt200Response | GetAudioTranscriptionSrtDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/transcriptions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        language: options?.language,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranscriptionSrtDeserialize(
  result:
    | GetAudioTranscriptionSrt200Response
    | GetAudioTranscriptionSrtDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Transcribes audio into the input language. */
export async function getAudioTranscriptionSrt(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionSrtOptions = { requestOptions: {} }
): Promise<string> {
  const result = await _getAudioTranscriptionSrtSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranscriptionSrtDeserialize(result);
}

export function _getAudioTranscriptionVttSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionVttOptions = { requestOptions: {} }
): StreamableMethod<
  GetAudioTranscriptionVtt200Response | GetAudioTranscriptionVttDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/transcriptions", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        language: options?.language,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranscriptionVttDeserialize(
  result:
    | GetAudioTranscriptionVtt200Response
    | GetAudioTranscriptionVttDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Transcribes audio into the input language. */
export async function getAudioTranscriptionVtt(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranscriptionVttOptions = { requestOptions: {} }
): Promise<string> {
  const result = await _getAudioTranscriptionVttSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranscriptionVttDeserialize(result);
}

export function _getAudioTranslationSimpleJsonSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationSimpleJsonOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranslationSimpleJson200Response
  | GetAudioTranslationSimpleJsonDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/translations", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranslationSimpleJsonDeserialize(
  result:
    | GetAudioTranslationSimpleJson200Response
    | GetAudioTranslationSimpleJsonDefaultResponse
): Promise<AudioTranscriptionSimpleJson> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    text: result.body["text"],
  };
}

/** Transcribes and translates input audio into English text. */
export async function getAudioTranslationSimpleJson(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationSimpleJsonOptions = { requestOptions: {} }
): Promise<AudioTranscriptionSimpleJson> {
  const result = await _getAudioTranslationSimpleJsonSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranslationSimpleJsonDeserialize(result);
}

export function _getAudioTranslationVerboseJsonSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationVerboseJsonOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranslationVerboseJson200Response
  | GetAudioTranslationVerboseJsonDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/translations", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranslationVerboseJsonDeserialize(
  result:
    | GetAudioTranslationVerboseJson200Response
    | GetAudioTranslationVerboseJsonDefaultResponse
): Promise<AudioTranscriptionVerboseJson> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return {
    task: result.body["task"],
    language: result.body["language"],
    duration: result.body["duration"],
    segments: (result.body["segments"] ?? []).map((p) => ({
      id: p["id"],
      start: p["start"],
      end: p["end"],
      text: p["text"],
      temperature: p["temperature"],
      averageLogProb: p["avg_logprob"],
      compressionRatio: p["compression_ratio"],
      noSpeechProb: p["no_speech_prob"],
      tokens: p["tokens"],
      seek: p["seek"],
    })),
  };
}

/** Transcribes and translates input audio into English text. */
export async function getAudioTranslationVerboseJson(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationVerboseJsonOptions = { requestOptions: {} }
): Promise<AudioTranscriptionVerboseJson> {
  const result = await _getAudioTranslationVerboseJsonSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranslationVerboseJsonDeserialize(result);
}

export function _getAudioTranslationPlainTextSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationPlainTextOptions = { requestOptions: {} }
): StreamableMethod<
  | GetAudioTranslationPlainText200Response
  | GetAudioTranslationPlainTextDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/translations", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranslationPlainTextDeserialize(
  result:
    | GetAudioTranslationPlainText200Response
    | GetAudioTranslationPlainTextDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Transcribes and translates input audio into English text. */
export async function getAudioTranslationPlainText(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationPlainTextOptions = { requestOptions: {} }
): Promise<string> {
  const result = await _getAudioTranslationPlainTextSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranslationPlainTextDeserialize(result);
}

export function _getAudioTranslationSrtSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationSrtOptions = { requestOptions: {} }
): StreamableMethod<
  GetAudioTranslationSrt200Response | GetAudioTranslationSrtDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/translations", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranslationSrtDeserialize(
  result:
    | GetAudioTranslationSrt200Response
    | GetAudioTranslationSrtDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Transcribes and translates input audio into English text. */
export async function getAudioTranslationSrt(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationSrtOptions = { requestOptions: {} }
): Promise<string> {
  const result = await _getAudioTranslationSrtSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranslationSrtDeserialize(result);
}

export function _getAudioTranslationVttSend(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationVttOptions = { requestOptions: {} }
): StreamableMethod<
  GetAudioTranslationVtt200Response | GetAudioTranslationVttDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/audio/translations", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType:
        (options.contentType as any) ??
        "multipart/form-data; boundary=azure_openai",
      headers: { "content-length": contentLength },
      body: {
        file: file,
        prompt: options?.prompt,
        temperature: options?.temperature,
        response_format: options?.responseFormat,
      },
    });
}

export async function _getAudioTranslationVttDeserialize(
  result:
    | GetAudioTranslationVtt200Response
    | GetAudioTranslationVttDefaultResponse
): Promise<string> {
  if (isUnexpected(result)) {
    throw result.body;
  }

  return result.body;
}

/** Transcribes and translates input audio into English text. */
export async function getAudioTranslationVtt(
  context: Client,
  file: Uint8Array,
  deploymentId: string,
  contentLength: number,
  options: GetAudioTranslationVttOptions = { requestOptions: {} }
): Promise<string> {
  const result = await _getAudioTranslationVttSend(
    context,
    file,
    deploymentId,
    contentLength,
    options
  );
  return _getAudioTranslationVttDeserialize(result);
}

export function _getCompletionsSend(
  context: Client,
  prompt: string[],
  deploymentId: string,
  options: GetCompletionsOptions = { requestOptions: {} }
): StreamableMethod<GetCompletions200Response | GetCompletionsDefaultResponse> {
  return context
    .path("/deployments/{deploymentId}/completions", deploymentId)
    .post({
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
    throw result.body;
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
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
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
  prompt: string[],
  deploymentId: string,
  options: GetCompletionsOptions = { requestOptions: {} }
): Promise<Completions> {
  const result = await _getCompletionsSend(
    context,
    prompt,
    deploymentId,
    options
  );
  return _getCompletionsDeserialize(result);
}

export function _getChatCompletionsSend(
  context: Client,
  messages: ChatMessage[],
  deploymentId: string,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): StreamableMethod<
  GetChatCompletions200Response | GetChatCompletionsDefaultResponse
> {
  return context
    .path("/deployments/{deploymentId}/chat/completions", deploymentId)
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

export async function _getChatCompletionsDeserialize(
  result: GetChatCompletions200Response | GetChatCompletionsDefaultResponse
): Promise<ChatCompletions> {
  if (isUnexpected(result)) {
    throw result.body;
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
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
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
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export async function getChatCompletions(
  context: Client,
  messages: ChatMessage[],
  deploymentId: string,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): Promise<ChatCompletions> {
  const result = await _getChatCompletionsSend(
    context,
    messages,
    deploymentId,
    options
  );
  return _getChatCompletionsDeserialize(result);
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
    .path(
      "/deployments/{deploymentId}/extensions/chat/completions",
      deploymentId
    )
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
    throw result.body;
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
            error: !p.content_filter_results?.error
              ? undefined
              : p.content_filter_results?.error,
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

export function _getEmbeddingsSend(
  context: Client,
  input: string[],
  deploymentId: string,
  options: GetEmbeddingsOptions = { requestOptions: {} }
): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse> {
  return context
    .path("/deployments/{deploymentId}/embeddings", deploymentId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { user: options?.user, model: options?.model, input: input },
    });
}

export async function _getEmbeddingsDeserialize(
  result: GetEmbeddings200Response | GetEmbeddingsDefaultResponse
): Promise<Embeddings> {
  if (isUnexpected(result)) {
    throw result.body;
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
  const result = await _getEmbeddingsSend(
    context,
    input,
    deploymentId,
    options
  );
  return _getEmbeddingsDeserialize(result);
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
    throw result.body;
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
  return context
    .path("/images/generations:submit")
    .post({
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
    throw result.body;
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
  const result = await _beginAzureBatchImageGenerationSend(
    context,
    prompt,
    options
  );
  return _beginAzureBatchImageGenerationDeserialize(result);
}
