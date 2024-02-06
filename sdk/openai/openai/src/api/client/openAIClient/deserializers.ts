// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { ErrorModel } from "@azure-rest/core-client";
import {
  ChatCompletions,
  ChatResponseMessage,
  Completions,
  ContentFilterResultDetailsForPrompt,
  ContentFilterResultsForChoice,
  ContentFilterResultsForPrompt,
} from "../../../models/models.js";
import {
  ChatCompletionsOutput,
  ChatResponseMessageOutput,
  CompletionsOutput,
  ContentFilterResultDetailsForPromptOutput,
  ContentFilterResultsForChoiceOutput,
  ContentFilterResultsForPromptOutput,
} from "../../../rest/outputModels.js";
import { camelCaseKeys } from "../../util.js";

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

export function getCompletionsResult(
  body: CompletionsOutput & ContentFilterResultsForPromptX,
): Completions {
  const { created, choices, prompt_filter_results, prompt_annotations, ...rest } = body;
  return {
    ...camelCaseKeys(rest),
    created: new Date(created),
    promptFilterResults: getContentFilterResultsForPrompt({
      prompt_filter_results,
      prompt_annotations,
    }),
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

export function getChatCompletionsResult(
  body: ChatCompletionsOutput & ContentFilterResultsForPromptX,
): ChatCompletions {
  const { created, choices, prompt_filter_results, prompt_annotations, ...rest } = body;
  return {
    ...camelCaseKeys(rest),
    created: new Date(created),
    promptFilterResults: getContentFilterResultsForPrompt({
      prompt_filter_results,
      prompt_annotations,
    }),
    choices: !choices
      ? []
      : choices.map(({ content_filter_results, delta, message, ...choice }) => ({
          ...camelCaseKeys(choice),
          ...(!delta ? {} : { delta: parseMessage(delta) }),
          ...(!message ? {} : { message: parseMessage(message) }),
          ...(!content_filter_results
            ? {}
            : {
                contentFilterResults:
                  parseContentFilterResultsForChoiceOutput(content_filter_results),
              }),
        })),
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

function parseError(error: ErrorModel): { error: ErrorModel } {
  return {
    error: {
      ...error,
      details: error["details"] ?? [],
    },
  };
}

function parseContentFilterResultDetailsForPromptOutput({
  error,
  ...rest
}: ContentFilterResultDetailsForPromptOutput = {}): ContentFilterResultDetailsForPrompt {
  return error ? parseError(error) : camelCaseKeys(rest);
}

function parseContentFilterResultsForChoiceOutput({
  error,
  ...rest
}: ContentFilterResultsForChoiceOutput = {}): ContentFilterResultsForChoice {
  return error ? parseError(error) : camelCaseKeys(rest);
}
