// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import {
  AudioResult,
  AudioResultFormat,
  AudioResultSimpleJson,
  AudioResultVerboseJson,
  AudioSegment,
  AzureChatEnhancements,
  AzureChatExtensionDataSourceResponseCitation,
  AzureChatExtensionsMessageContext,
  AzureGroundingEnhancement,
  AzureGroundingEnhancementCoordinatePoint,
  AzureGroundingEnhancementLine,
  AzureGroundingEnhancementLineSpan,
  ChatChoice,
  ChatCompletions,
  ChatCompletionsFunctionToolCall,
  ChatCompletionsToolCallUnion,
  ChatFinishDetails,
  ChatResponseMessage,
  Choice,
  Completions,
  CompletionsLogProbabilityModel,
  CompletionsUsage,
  ContentFilterBlocklistIdResult,
  ContentFilterCitedDetectionResult,
  ContentFilterDetectionResult,
  ContentFilterErrorResults,
  ContentFilterResult,
  ContentFilterResultDetailsForPrompt,
  ContentFilterResultsForChoice,
  ContentFilterResultsForPrompt,
  FunctionCall,
  ImageGenerations,
  StopFinishDetails,
} from "../../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { get } from "./utils.js";
import { stringToUint8Array } from "@azure/core-util";
import { getImageDimensionsFromResponse } from "./images.js";

function ifDefined(
  val: any,
  validate: (x: any) => void,
  { defined }: { defined?: boolean } = {},
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

function assertArray<T>(val: T[], validate: (x: T) => void): void {
  assert.isArray(val);
  for (const x of val) {
    validate(x);
  }
}

async function assertAsyncIterable<T>(
  val: AsyncIterable<T>,
  validate: (x: T) => void,
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
          .join("\n")}\n\n Stack trace: ${e.stack}`,
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

function assertContentFilterDetectionResult(val: ContentFilterDetectionResult): void {
  assert.isBoolean(val.detected);
  assert.isBoolean(val.filtered);
}

function assertContentFilterBlocklistIdResult(val: ContentFilterBlocklistIdResult): void {
  assert.isString(val.id);
  assert.isBoolean(val.filtered);
}

function assertContentFilterResultsForPromptItem(cfr: ContentFilterResultsForPrompt): void {
  assert.isNumber(cfr.promptIndex);
  assertContentFilterResultDetailsForPrompt(cfr.contentFilterResults);
}

function assertContentFilterErrorResults(cfr: ContentFilterErrorResults): void {
  assert.isDefined(cfr.error);
  assert.isDefined(cfr.error.code);
  assert.isDefined(cfr.error.message);
}

function assertContentFilterResultDetailsForPrompt(cfr: ContentFilterResultDetailsForPrompt): void {
  if (cfr.error) {
    assertContentFilterErrorResults(cfr);
  } else {
    ifDefined(cfr.hate, assertContentFilterResult);
    ifDefined(cfr.selfHarm, assertContentFilterResult);
    ifDefined(cfr.sexual, assertContentFilterResult);
    ifDefined(cfr.violence, assertContentFilterResult);
    ifDefined(cfr.profanity, assertContentFilterDetectionResult);
    ifDefined(cfr.jailbreak, assertContentFilterDetectionResult);
    ifDefined(cfr.customBlocklists, (arr) =>
      assertArray(arr, assertContentFilterBlocklistIdResult),
    );
  }
}

function assertContentFilterCitedDetectionResult(val: ContentFilterCitedDetectionResult): void {
  assert.isBoolean(val.detected);
  assert.isBoolean(val.filtered);
  assert.isString(val.license);
  ifDefined(val.url, assert.isString);
}

function assertContentFilterResultsForChoice(cfr: ContentFilterResultsForChoice): void {
  if (cfr.error) {
    assertContentFilterErrorResults(cfr);
  } else {
    ifDefined(cfr.hate, assertContentFilterResult);
    ifDefined(cfr.selfHarm, assertContentFilterResult);
    ifDefined(cfr.sexual, assertContentFilterResult);
    ifDefined(cfr.violence, assertContentFilterResult);
    ifDefined(cfr.profanity, assertContentFilterResult);
    ifDefined(cfr.customBlocklists, assertContentFilterBlocklistIdResult);
    ifDefined(cfr.protectedMaterialCode, assertContentFilterCitedDetectionResult);
    ifDefined(cfr.protectedMaterialText, assertContentFilterDetectionResult);
  }
}

function assertChoice(choice: Choice): void {
  assert.isString(choice.text);
  ifDefined(choice.logprobs, assertLogProbabilityModel);
  assert.isNumber(choice.index);
  ifDefined(choice.contentFilterResults, assertContentFilterResultsForChoice);
  ifDefined(choice.finishReason, assert.isString);
}

function assertFunctionCall(
  functionCall: FunctionCall,
  { stream }: ChatCompletionTestOptions,
): void {
  assertIf(!stream, functionCall.arguments, assert.isString);
  assertIf(!stream, functionCall.name, assert.isString);
}

function assertToolCall(
  functionCall: ChatCompletionsToolCallUnion,
  { stream }: ChatCompletionTestOptions,
): void {
  assertIf(!stream, functionCall.type, assert.isString);
  assertIf(!stream, functionCall.id, assert.isString);
  assertIf(Boolean(stream), functionCall.index, assert.isNumber);
  switch (functionCall.type) {
    case "function":
      assertFunctionCall((functionCall as ChatCompletionsFunctionToolCall).function, { stream });
      break;
  }
}

function assertIf(condition: boolean, val: any, check: (x: any) => void): void {
  if (condition) {
    check(val);
  } else {
    ifDefined(val, check);
  }
}

function assertMessage(
  message: ChatResponseMessage | undefined,
  { functions, stream }: ChatCompletionTestOptions = {},
): void {
  assert.isDefined(message);
  const msg = message as ChatResponseMessage;
  if (!functions) {
    assertIf(!stream, msg.content, assert.isString);
  }
  assertIf(!stream, msg.role, assert.isString);
  ifDefined(msg.functionCall, (item) => assertFunctionCall(item, { stream }));
  for (const item of msg.toolCalls ?? []) {
    assertToolCall(item, { stream });
  }
  ifDefined(msg.context, assertContext);
}

function assertContext(context: AzureChatExtensionsMessageContext): void {
  ifDefined(context.intent, assert.isString);
  ifDefined(context.citations, (arr) => assertArray(arr, assertCitations));
}

function assertCitations(citations: AzureChatExtensionDataSourceResponseCitation): void {
  assert.isDefined(citations.content);
  ifDefined(citations.title, assert.isString);
  ifDefined(citations.url, assert.isString);
  ifDefined(citations.filepath, assert.isString);
  ifDefined(citations.chunkId, assert.isString);
}

function assertChatFinishDetails(val: ChatFinishDetails): void {
  switch (val.type) {
    case "max_tokens":
      break;
    case "stop": {
      assert.isString((val as StopFinishDetails).stop);
      break;
    }
  }
}

function assertAzureGroundingEnhancementCoordinatePoint(
  val: AzureGroundingEnhancementCoordinatePoint,
): void {
  assert.isNumber(val.x);
  assert.isNumber(val.y);
}

function assertAzureGroundingEnhancementLineSpan(val: AzureGroundingEnhancementLineSpan): void {
  assert.isNumber(val.length);
  assert.isNumber(val.offset);
  assert.isString(val.text);
  assertNonEmptyArray(val.polygon, assertAzureGroundingEnhancementCoordinatePoint);
}

function assertAzureGroundingEnhancementLine(val: AzureGroundingEnhancementLine): void {
  assertNonEmptyArray(val.spans, assertAzureGroundingEnhancementLineSpan);
}

function assertAzureGroundingEnhancement(val: AzureGroundingEnhancement): void {
  assertNonEmptyArray(val.lines, assertAzureGroundingEnhancementLine);
}

function assertAzureChatEnhancements(val: AzureChatEnhancements): void {
  ifDefined(val.grounding, assertAzureGroundingEnhancement);
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
  ifDefined(choice.contentFilterResults, assertContentFilterResultsForChoice);
  ifDefined(choice.finishReason, assert.isString);
  ifDefined(choice.finishDetails, assertChatFinishDetails);
  ifDefined(choice.enhancements, assertAzureChatEnhancements);
}

function assertUsage(usage: CompletionsUsage | undefined): void {
  assert.isDefined(usage);
  const castUsage = usage as CompletionsUsage;
  assert.isNumber(castUsage.completionTokens);
  assert.isNumber(castUsage.promptTokens);
  assert.isNumber(castUsage.totalTokens);
}

function assertContentFilterResultsForPrompt(cfr: ContentFilterResultsForPrompt[]): void {
  assert.isArray(cfr);
  for (const item of cfr) {
    assertContentFilterResultsForPromptItem(item);
  }
}

function assertCompletionsNoUsage(
  completions: Omit<Completions, "usage">,
  { allowEmptyChoices }: CompletionTestOptions = {},
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, assertChoice);
  }
  assert.instanceOf(completions.created, Date);
  assert.isString(completions.id);
  assertContentFilterResultsForPrompt(completions.promptFilterResults ?? []);
}

function assertChatCompletionsNoUsage(
  completions: ChatCompletions,
  { allowEmptyChoices, allowEmptyId, ...opts }: ChatCompletionTestOptions,
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, (choice) => assertChatChoice(choice, opts));
  }
  assert.instanceOf(completions.created, Date);
  ifDefined(completions.id, assert.isString, { defined: !allowEmptyId });
  assertContentFilterResultsForPrompt(completions.promptFilterResults ?? []);
  ifDefined(completions.systemFingerprint, assert.isString);
  ifDefined(completions.model, assert.isString);
}

export function assertCompletions(completions: Completions): void {
  assertCompletionsNoUsage(completions);
  assertUsage(completions.usage);
}

export function assertChatCompletions(
  completions: ChatCompletions,
  options: ChatCompletionTestOptions = {},
): void {
  assertChatCompletionsNoUsage(completions, options);
  ifDefined(completions.usage, assertUsage);
}

export async function assertCompletionsStream(
  stream: AsyncIterable<Omit<Completions, "usage">>,
  options: CompletionTestOptions = {},
): Promise<number> {
  return assertAsyncIterable(stream, (item) => assertCompletionsNoUsage(item, options));
}

export async function assertChatCompletionsStream(
  stream: AsyncIterable<ChatCompletions>,
  options: ChatCompletionTestOptions = {},
): Promise<number> {
  return assertAsyncIterable(stream, (item) =>
    assertChatCompletionsNoUsage(item, { ...options, stream: true }),
  );
}

export function assertChatCompletionsList(
  list: Array<ChatCompletions>,
  options: ChatCompletionTestOptions = {},
): void {
  assert.isNotEmpty(list);
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
  result: AudioResult<Format>,
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

export function assertImageGenerationsWithURLs(
  result: ImageGenerations,
  recorder: Recorder,
  height: number,
  width: number,
): void {
  assert.instanceOf(result.created, Date);
  assert.isNotEmpty(result.data);
  for (const img of result.data) {
    assert.isUndefined(img.base64Data);
    ifDefined(img.revisedPrompt, assert.isString);
    ifDefined(img.url, async (url) => {
      assert.isString(url);
      const response = await get(url, recorder);
      const dimensions = await getImageDimensionsFromResponse(response);
      assert.equal(dimensions?.height, height, "Height does not match");
      assert.equal(dimensions?.width, width, "Width does not match");
    });
  }
}

export function assertImageGenerationsWithString(
  result: ImageGenerations,
  height: number,
  width: number,
): void {
  assert.instanceOf(result.created, Date);
  assert.isNotEmpty(result.data);
  for (const img of result.data) {
    assert.isUndefined(img.url);
    ifDefined(img.revisedPrompt, assert.isString);
    ifDefined(img.base64Data, async (data) => {
      assert.isString(data);
      const arr = stringToUint8Array(data, "base64");
      const actualWidth = new DataView(arr.subarray(16, 4).buffer).getUint32(0);
      assert.equal(actualWidth, width, "Width does not match");
      const actualHeight = new DataView(arr.subarray(20, 4).buffer).getUint32(0);
      assert.equal(actualHeight, height, "Height does not match");
    });
  }
}

export async function assertOpenAiError<T>(
  promise: Promise<T>,
  expectations: {
    messagePattern?: RegExp;
    type?: string;
    errorCode?: string | null;
  },
): Promise<void> {
  try {
    await promise;
  } catch (e: any) {
    const { messagePattern, type, errorCode } = expectations;
    if (messagePattern) {
      assert.match(e.message, messagePattern);
    } else {
      assert.isUndefined(e.message);
    }
    if (type) {
      assert.equal(e.type, type);
    } else {
      assert.isUndefined(e.type);
    }
    if (errorCode !== undefined) {
      assert.equal(e.code, errorCode);
    } else {
      assert.isUndefined(e.code);
    }
  }
}
