// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import {
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

async function assertNonEmptyAsyncIterable<T>(
  val: AsyncIterable<T>,
  validate: (x: T) => void
): Promise<void> {
  let ran = false;
  for await (const x of val) {
    ran = true;
    validate(x);
  }
  assert.isTrue(ran);
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

function assertFunctionCall(functionCall: FunctionCall): void {
  assert.isString(functionCall.arguments);
  assert.isString(functionCall.name);
}

function assertMessage(
  message: ChatMessage | undefined,
  { functions }: ChatCompletionTestOptions = {}
): void {
  assert.isDefined(message);
  const msg = message as ChatMessage;
  if (!functions) {
    assert.isString(msg.content);
  }
  assert.isString(msg.role);
  ifDefined(msg.functionCall, assertFunctionCall, { defined: functions });
  ifDefined(msg.name, assert.isString);
}

function assertChatChoice(
  choice: ChatChoice,
  { stream, ...opts }: ChatCompletionTestOptions = {}
): void {
  if (stream) {
    assertMessage(choice.delta, opts);
    assert.isUndefined(choice.message);
  } else {
    assertMessage(choice.message, opts);
    assert.isUndefined(choice.delta);
  }
  assert.isNumber(choice.index);
  ifDefined(choice.contentFilterResults, assertContentFilterResults);
  ifDefined(choice.finishReason, assert.isString);
}

function assertUsage(usage: CompletionsUsage): void {
  assert.isNumber(usage.completionTokens);
  assert.isNumber(usage.promptTokens);
  assert.isNumber(usage.totalTokens);
}

function assertCompletionsNoUsage(
  completions: Omit<Completions, "usage">,
  { allowEmptyChoices = false }: CompletionTestOptions = {}
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, assertChoice);
  }
  assert.instanceOf(completions.created, Date);
  assert.isString(completions.id);
  ifDefined(completions.promptFilterResults, assertContentFilterResults);
}

function assertChatCompletionsNoUsage(
  completions: Omit<ChatCompletions, "usage">,
  { allowEmptyChoices = false, ...opts }: ChatCompletionTestOptions = {}
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, (choice) => assertChatChoice(choice, opts));
  }
  assert.instanceOf(completions.created, Date);
  assert.isString(completions.id);
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
  assertUsage(completions.usage);
}

export async function assertCompletionsStream(
  stream: AsyncIterable<Omit<Completions, "usage">>,
  options: CompletionTestOptions = {}
): Promise<void> {
  return assertNonEmptyAsyncIterable(stream, (item) => assertCompletionsNoUsage(item, options));
}

export async function assertChatCompletionsStream(
  stream: AsyncIterable<Omit<ChatCompletions, "usage">>,
  options: ChatCompletionTestOptions = {}
): Promise<void> {
  return assertNonEmptyAsyncIterable(stream, (item) =>
    assertChatCompletionsNoUsage(item, { ...options, stream: true })
  );
}

interface CompletionTestOptions {
  allowEmptyChoices?: boolean;
}

interface ChatCompletionTestOptions {
  stream?: boolean;
  allowEmptyChoices?: boolean;
  functions?: boolean;
}
