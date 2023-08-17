// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChatCompletions, ChatMessage, Completions } from "../../generated/api/models.js";
import {
  BeginAzureBatchImageGenerationOptions,
  _getCompletionsSend,
  _getChatCompletionsSend,
  GetChatCompletionsOptions,
  GetCompletionsOptions,
} from "../../generated/api/operations.js";
import { ChatChoiceOutput, ChoiceOutput } from "../../generated/rest/outputModels.js";
import { getOaiSSEs } from "./oaiSse.js";
import { OpenAIContext as Client } from "../../generated/rest/index.js";

function getCompletionsResult(body: Record<string, any>): Omit<Completions, "usage"> {
  return {
    id: body["id"],
    created: body["created"],
    choices: (body["choices"] ?? []).map((p: ChoiceOutput) => ({
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
  };
}

function getChatCompletionsResult(body: Record<string, any>): Omit<ChatCompletions, "usage"> {
  return {
    id: body["id"],
    created: body["created"],
    choices: (body["choices"] ?? []).map((p: ChatChoiceOutput) => ({
      message: !p.message
        ? undefined
        : { role: p.message?.["role"], content: p.message?.["content"] },
      index: p["index"],
      finishReason: p["finish_reason"],
      delta: !p.delta ? undefined : { role: p.delta?.["role"], content: p.delta?.["content"] },
    })),
  };
}

/** Convenience alias for BeginAzureBatchImageGenerationOptions */
export type ImageGenerationOptions = BeginAzureBatchImageGenerationOptions;

export function listChatCompletions(
  context: Client,
  messages: ChatMessage[],
  deploymentName: string,
  options: GetChatCompletionsOptions = { requestOptions: {} }
): AsyncIterable<Omit<ChatCompletions, "usage">> {
  const response = _getChatCompletionsSend(context, messages, deploymentName, {
    ...options,
    stream: true,
  });
  return getOaiSSEs(response, getChatCompletionsResult);
}

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
