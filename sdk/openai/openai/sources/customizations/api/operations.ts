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
