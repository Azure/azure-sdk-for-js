// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { ChatMessage, ChatRole, Completions } from "../models/models.js";
import {
  ChatChoiceOutput,
  ChatMessageOutput,
  ChoiceOutput,
  ContentFilterResultsOutput,
  PromptFilterResultOutput,
} from "../rest/outputModels.js";
import { ChatCompletions } from "../models/models.js";
import { ContentFilterResults } from "./models.js";

export function getCompletionsResult(body: Record<string, any>): Omit<Completions, "usage"> {
  return {
    id: body["id"],
    created: new Date(body["created"]),
    ...(!body["prompt_annotations"]
      ? {}
      : {
          promptFilterResults: body["prompt_annotations"].map((p: PromptFilterResultOutput) => ({
            promptIndex: p["prompt_index"],
            ...(!p.content_filter_results
              ? {}
              : {
                  contentFilterResults: deserializeContentFilter(p.content_filter_results),
                }),
          })),
        }),
    choices: (body["choices"] ?? []).map((p: ChoiceOutput) => ({
      text: p["text"],
      index: p["index"],
      ...(!p.content_filter_results
        ? {}
        : {
            contentFilterResults: deserializeContentFilter(p.content_filter_results),
          }),
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

export function getChatCompletionsResult(body: Record<string, any>): ChatCompletions {
  return {
    id: body["id"],
    created: new Date(body["created"]),
    choices: (body["choices"] ?? []).map((p: ChatChoiceOutput) => ({
      ...(!p.message ? {} : { message: _deserializeMessage(p.message) }),
      index: p["index"],
      finishReason: p["finish_reason"],
      ...(!p.delta ? {} : { delta: _deserializeMessage(p.delta) }),
      ...(!p.content_filter_results
        ? {}
        : { contentFilterResults: deserializeContentFilter(p.content_filter_results) }),
    })),
    ...(!body["prompt_annotations"]
      ? {}
      : {
          promptFilterResults: body["prompt_annotations"].map((p: PromptFilterResultOutput) => ({
            promptIndex: p["prompt_index"],
            ...(!p.content_filter_results
              ? {}
              : {
                  contentFilterResults: deserializeContentFilter(p.content_filter_results),
                }),
          })),
        }),
    ...(!body["usage"]
      ? {}
      : {
          usage: {
            completionTokens: body["usage"].completion_tokens,
            promptTokens: body["usage"].prompt_tokens,
            totalTokens: body["usage"].total_tokens,
          },
        }),
  };
}

function _deserializeMessage(message: ChatMessageOutput): ChatMessage {
  return {
    /**
     * Treating the role and content as optional is because they may not be returned
     * during the streaming mode. The type should be updated for the streaming mode
     * and it is a TODO.
     */
    ...(!message["role"] ? ({} as { role: ChatRole }) : { role: message["role"] }),
    ...(!message["content"] ? ({} as { content: string }) : { content: message["content"] }),
    ...(!message["name"] ? {} : { name: message["name"] }),
    ...(!message.function_call
      ? {}
      : {
          functionCall: {
            name: message.function_call?.["name"],
            arguments: message.function_call?.["arguments"],
          },
        }),
    ...(!message.context
      ? {}
      : {
          context: {
            ...(!message.context.messages
              ? {}
              : {
                  messages: message.context.messages.map((m) => {
                    return _deserializeMessage(m);
                  }),
                }),
          },
        }),
  };
}

function deserializeContentFilter(result: ContentFilterResultsOutput): ContentFilterResults {
  if (result.error) {
    return {
      error: {
        code: result.error.code,
        message: result.error.message,
        details: result.error.details ?? [],
      },
    };
  }
  return {
    ...(!result.sexual
      ? {}
      : {
          sexual: {
            severity: result.sexual?.["severity"],
            filtered: result.sexual?.["filtered"],
          },
        }),
    ...(!result.violence
      ? {}
      : {
          violence: {
            severity: result.violence?.["severity"],
            filtered: result.violence?.["filtered"],
          },
        }),
    ...(!result.hate
      ? {}
      : {
          hate: {
            severity: result.hate?.["severity"],
            filtered: result.hate?.["filtered"],
          },
        }),
    ...(!result.self_harm
      ? {}
      : {
          selfHarm: {
            severity: result.self_harm?.["severity"],
            filtered: result.self_harm?.["filtered"],
          },
        }),
  };
}
