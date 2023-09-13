// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import {
  AudioResult,
  AudioResultFormat,
  AudioResultSimpleJson,
  AudioResultVerboseJson,
  AudioSegment,
  ChatChoice,
  ChatCompletions,
  ChatMessage,
  Choice,
  Completions,
  CompletionsLogProbabilityModel,
  CompletionsUsage,
  ContentFilterResult,
  ContentFilterResults,
  FunctionCall,
} from "../../../src/index.js";

function ifDefined(
  val: any,
  validate: (x: any) => void,
  { defined }: { defined?: boolean } = {}
): void {
  if (val !== undefined && val !== null) {
    validate(val);
  } else if (defined) {
    throw new Error("Expected value to be defined");
  }
}

function assertNonEmptyArray<T>(val: T[], validate: (x: T) => void): void {
  assert.isArray(val);
  assert.isNotEmpty(val);
  for (const x of val) {
    validate(x);
  }
}

async function assertAsyncIterable<T>(
  val: AsyncIterable<T>,
  validate: (x: T) => void
): Promise<number> {
  const items: T[] = [];
  for await (const item of val) {
    try {
      validate(item);
    } catch (e: any) {
      throw new Error(
        `Error validating item:\n ${JSON.stringify(item, undefined, 2)}\n\n${
          e.message
        }.\n\nPrevious items:\n\n${items
          .map((x) => JSON.stringify(x, undefined, 2))
          .join("\n")}\n\n Stack trace: ${e.stack}`
      );
    }
    items.push(item);
  }
  return items.length;
}

function assertLogProbabilityModel(logProbability: CompletionsLogProbabilityModel): void {
  assertNonEmptyArray(logProbability.textOffset, assert.isNumber);
  assertNonEmptyArray(logProbability.tokenLogprobs, assert.isNumber);
  assertNonEmptyArray(logProbability.tokens, assert.isString);
  assertNonEmptyArray(logProbability.topLogprobs, assert.isObject);
}

function assertContentFilterResult(val: ContentFilterResult): void {
  assert.isBoolean(val.filtered);
  assert.isString(val.severity);
}

function assertContentFilterResults(cfr: ContentFilterResults): void {
  ifDefined(cfr.hate, assertContentFilterResult);
  ifDefined(cfr.selfHarm, assertContentFilterResult);
  ifDefined(cfr.sexual, assertContentFilterResult);
  ifDefined(cfr.violence, assertContentFilterResult);
}

function assertChoice(choice: Choice): void {
  assert.isString(choice.text);
  ifDefined(choice.logprobs, assertLogProbabilityModel);
  assert.isNumber(choice.index);
  ifDefined(choice.contentFilterResults, assertContentFilterResults);
  ifDefined(choice.finishReason, assert.isString);
}

function assertFunctionCall(
  functionCall: FunctionCall,
  { stream }: ChatCompletionTestOptions
): void {
  assertIf(!stream, functionCall.arguments, assert.isString);
  assertIf(!stream, functionCall.name, assert.isString);
}

function assertIf(condition: boolean, val: any, check: (x: any) => void): void {
  if (condition) {
    check(val);
  } else {
    ifDefined(val, check);
  }
}

function assertMessage(
  message: ChatMessage | undefined,
  { functions, stream }: ChatCompletionTestOptions = {}
): void {
  assert.isDefined(message);
  const msg = message as ChatMessage;
  if (!functions) {
    assertIf(!stream, msg.content, assert.isString);
  }
  assertIf(!stream, msg.role, assert.isString);
  ifDefined(msg.functionCall, (item) => assertFunctionCall(item, { stream }));
  ifDefined(msg.name, assert.isString);
  ifDefined(msg.context, ({ messages }) => {
    assertNonEmptyArray(messages, assertMessage);
  });
}

function assertChatChoice(choice: ChatChoice, options: ChatCompletionTestOptions): void {
  const stream = options.stream;
  if (stream) {
    assertMessage(choice.delta, options);
    assert.isUndefined(choice.message);
  } else {
    assertMessage(choice.message, options);
    assert.isUndefined(choice.delta);
  }
  assert.isNumber(choice.index);
  ifDefined(choice.contentFilterResults, assertContentFilterResults);
  ifDefined(choice.finishReason, assert.isString);
}

function assertUsage(usage: CompletionsUsage | undefined): void {
  assert.isDefined(usage);
  const castUsage = usage as CompletionsUsage;
  assert.isNumber(castUsage.completionTokens);
  assert.isNumber(castUsage.promptTokens);
  assert.isNumber(castUsage.totalTokens);
}

function assertCompletionsNoUsage(
  completions: Omit<Completions, "usage">,
  { allowEmptyChoices }: CompletionTestOptions = {}
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, assertChoice);
  }
  assert.instanceOf(completions.created, Date);
  assert.isString(completions.id);
  ifDefined(completions.promptFilterResults, assertContentFilterResults);
}

function assertChatCompletionsNoUsage(
  completions: ChatCompletions,
  { allowEmptyChoices, allowEmptyId, ...opts }: ChatCompletionTestOptions
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, (choice) => assertChatChoice(choice, opts));
  }
  assert.instanceOf(completions.created, Date);
  ifDefined(completions.id, assert.isString, { defined: !allowEmptyId });
  ifDefined(completions.promptFilterResults, assertContentFilterResults);
}

export function assertCompletions(completions: Completions): void {
  assertCompletionsNoUsage(completions);
  assertUsage(completions.usage);
}

export function assertChatCompletions(
  completions: ChatCompletions,
  options: ChatCompletionTestOptions = {}
): void {
  assertChatCompletionsNoUsage(completions, options);
  ifDefined(completions.usage, assertUsage);
}

export async function assertCompletionsStream(
  stream: AsyncIterable<Omit<Completions, "usage">>,
  options: CompletionTestOptions = {}
): Promise<number> {
  return assertAsyncIterable(stream, (item) => assertCompletionsNoUsage(item, options));
}

export async function assertChatCompletionsStream(
  stream: AsyncIterable<ChatCompletions>,
  options: ChatCompletionTestOptions = {}
): Promise<number> {
  return assertAsyncIterable(stream, (item) =>
    assertChatCompletionsNoUsage(item, { ...options, stream: true })
  );
}

export function assertChatCompletionsList(
  list: Array<ChatCompletions>,
  options: ChatCompletionTestOptions = {}
): void {
  list.map((item) => assertChatCompletionsNoUsage(item, { ...options, stream: true }));
}

interface CompletionTestOptions {
  allowEmptyChoices?: boolean;
}

interface ChatCompletionTestOptions {
  stream?: boolean;
  allowEmptyChoices?: boolean;
  functions?: boolean;
  allowEmptyStream?: boolean;
  allowEmptyId?: boolean;
}

function assertSegment(segment: AudioSegment): void {
  assert.isNumber(segment.start);
  assert.isNumber(segment.end);
  assert.isString(segment.text);
  assert.isNumber(segment.id);
  assert.isNumber(segment.avgLogprob);
  assert.isNumber(segment.compressionRatio);
  assert.isNumber(segment.noSpeechProb);
  assert.isNumber(segment.seek);
  assert.isNumber(segment.temperature);
  assert.isArray(segment.tokens);
  segment.tokens.forEach((item) => assert.isNumber(item));
}

function assertVerboseJson(result: AudioResultVerboseJson): void {
  assert.isString(result.text);
  assert.isNumber(result.duration);
  assert.isString(result.language);
  assert.isString(result.task);
  assert.isArray(result.segments);
  result.segments.forEach((item) => assertSegment(item));
}

export function assertAudioResult<Format extends AudioResultFormat>(
  responseFormat: AudioResultFormat,
  result: AudioResult<Format>
): void {
  switch (responseFormat) {
    case "json":
      assert.isObject(result);
      assert.isString((result as AudioResultSimpleJson).text);
      break;
    case "verbose_json":
      assertVerboseJson(result as AudioResultVerboseJson);
      break;
    case "srt":
    case "vtt":
    case "text":
      assert.isString(result);
      break;
  }
}
