import { assert } from "vitest";
import { get, Metadata } from "./utils.js";
import { getImageDimensionsFromResponse } from "./images.js";
import {
  AzureChatExtensionDataSourceResponseCitationOutput,
  AzureChatExtensionsMessageContextOutput,
  ContentFilterBlocklistIdResultOutput,
  ContentFilterCitedDetectionResultOutput,
  ContentFilterDetectionResultOutput,
  ContentFilterResultOutput,
  ContentFilterResultDetailsForPromptOutput,
  ContentFilterResultsForChoiceOutput,
  ContentFilterResultsForPromptOutput,
  ChatFinishDetailsOutput,
  StopFinishDetailsOutput,
  AzureChatEnhancementsOutput,
  AzureGroundingEnhancementOutput,
  AzureGroundingEnhancementLineSpanOutput,
  AzureGroundingEnhancementCoordinatePointOutput,
  AzureGroundingEnhancementLineOutput,
  ContentFilterDetailedResults,
} from "../../../src/types/index.js";
import { Assistant, AssistantCreateParams } from "openai/resources/beta/assistants.mjs";
import {
  Batch,
  BatchError,
  BatchRequestCounts,
  ChatCompletionChunk,
  ChatCompletionMessage,
  ChatCompletionTokenLogprob,
  Completion,
  CompletionChoice,
  CompletionUsage,
  CreateEmbeddingResponse,
  ImagesResponse,
} from "openai/resources/index";
import { ErrorModel } from "@azure-rest/core-client";
import {
  ChatCompletion,
  ChatCompletionMessageToolCall,
} from "openai/resources/chat/completions.mjs";
import { Transcription } from "openai/resources/audio/transcriptions.mjs";
import { AudioSegment, AudioResultVerboseJson, AudioResultFormat } from "./audioTypes.js";

export function assertAudioResult(responseFormat: AudioResultFormat, result: Transcription): void {
  switch (responseFormat) {
    case "json":
      assert.isObject(result);
      assert.isString((result as Transcription).text);
      break;
    case "verbose_json":
      assertVerboseJson(result as unknown as AudioResultVerboseJson);
      break;
    case "srt":
    case "vtt":
    case "text":
      assert.isString(result);
      break;
  }
}

function assertSegment(segment: AudioSegment): void {
  assert.isNumber(segment.start);
  assert.isNumber(segment.end);
  assert.isString(segment.text);
  assert.isNumber(segment.id);
  assert.isNumber(segment.avg_logprob);
  assert.isNumber(segment.compression_ratio);
  assert.isNumber(segment.no_speech_prob);
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

export function assertChatCompletions(
  completions: ChatCompletion,
  options: ChatCompletionTestOptions = {},
): void {
  assertChatCompletionsNoUsage(completions, options);
  ifDefined(completions.usage, assertUsage);
}

function assertChatCompletionsNoUsage(
  completions: ChatCompletion,
  { allowEmptyChoices, allowEmptyId, ...opts }: ChatCompletionTestOptions,
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, (choice) => assertChoice(choice, opts));
  }
  assertChatCompletionsProperties(completions);
}

function assertChatCompletionsChunkNoUsage(
  completions: ChatCompletionChunk,
  { allowEmptyChoices, allowEmptyId, ...opts }: ChatCompletionTestOptions,
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, (choice) => assertChoice(choice, opts));
  }
  assertChatCompletionsProperties(completions);
}

function assertChatCompletionsProperties(
  completions: Omit<ChatCompletion, "choices"> | Omit<ChatCompletionChunk, "choices">,
): void {
  assertContentFilterResultsForPrompt(completions.prompt_filter_results ?? []);
  assert.isNumber(completions.created);
  assert.isString(completions.id);
  assert.isString(completions.model);
  ifDefined(completions.system_fingerprint, assert.isString);
}

export function assertChatCompletionsList(
  list: Array<ChatCompletionChunk>,
  options: ChatCompletionTestOptions = {},
): void {
  assert.isNotEmpty(list);
  list.map((item) => assertChatCompletionsChunkNoUsage(item, { ...options, stream: true }));
}

export function assertCompletions(completions: Completion): void {
  assertCompletionsNoUsage(completions);
  ifDefined(completions.usage, assertUsage);
}

function assertCompletionsNoUsage(
  completions: Omit<Completion, "usage">,
  { allowEmptyChoices }: CompletionTestOptions = {},
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, assertCompletionsChoice);
  }
  assert.isNumber(completions.created);
  assert.isString(completions.id);
  assert.isString(completions.model);
  ifDefined(completions.system_fingerprint, assert.isString);
  assertContentFilterResultsForPrompt(completions.prompt_filter_results ?? []);
}

function assertCompletionsChoice(choice: CompletionChoice): void {
  assert.isNumber(choice.index);
  ifDefined(choice.logprobs, assertLogprobs);
  ifDefined(choice.finish_reason, assert.isString);
  assert.isString(choice.text);
  ifDefined(choice.content_filter_results, assertContentFilterResultsForChoice);
}

function assertContentFilterResultsForChoice(cfr: ContentFilterResultsForChoiceOutput): void {
  if (cfr.error) {
    assertContentFilterErrorResults(cfr.error);
  } else {
    ifDefined(cfr.hate, assertContentFilterResult);
    ifDefined(cfr.self_harm, assertContentFilterResult);
    ifDefined(cfr.sexual, assertContentFilterResult);
    ifDefined(cfr.violence, assertContentFilterResult);
    ifDefined(cfr.profanity, assertContentFilterDetectionResult);
    ifDefined(cfr.custom_blocklists, assertContentFilterDetailedResult);
    ifDefined(cfr.protected_material_code, assertContentFilterCitedDetectionResult);
    ifDefined(cfr.protected_material_text, assertContentFilterDetectionResult);
  }
}

function assertContentFilterResultsForPrompt(cfr: ContentFilterResultsForPromptOutput[]): void {
  assert.isArray(cfr);
  for (const item of cfr) {
    assertContentFilterResultsForPromptItem(item);
  }
}

function assertContentFilterCitedDetectionResult(
  val: ContentFilterCitedDetectionResultOutput,
): void {
  assert.isBoolean(val.detected);
  assert.isBoolean(val.filtered);
  ifDefined(val.license, assert.isString);
  ifDefined(val.URL, assert.isString);
}

function assertContentFilterResultsForPromptItem(cfr: ContentFilterResultsForPromptOutput): void {
  assert.isNumber(cfr.prompt_index);
  assertContentFilterResultDetailsForPrompt(cfr.content_filter_results);
}

function assertContentFilterResultDetailsForPrompt(
  cfr: ContentFilterResultDetailsForPromptOutput,
): void {
  if (cfr.error) {
    assertContentFilterErrorResults(cfr.error);
  } else {
    ifDefined(cfr.hate, assertContentFilterResult);
    ifDefined(cfr.self_harm, assertContentFilterResult);
    ifDefined(cfr.sexual, assertContentFilterResult);
    ifDefined(cfr.violence, assertContentFilterResult);
    ifDefined(cfr.profanity, assertContentFilterDetectionResult);
    ifDefined(cfr.jailbreak, assertContentFilterDetectionResult);
    ifDefined(cfr.custom_blocklists, assertContentFilterDetailedResult);
  }
}

function assertContentFilterErrorResults(error: ErrorModel): void {
  assert.isDefined(error);
  assert.isDefined(error.code);
  assert.isDefined(error.message);
}

function assertContentFilterResult(val: ContentFilterResultOutput): void {
  assert.isBoolean(val.filtered);
  assert.isString(val.severity);
}

function assertContentFilterDetectionResult(val: ContentFilterDetectionResultOutput): void {
  assert.isBoolean(val.detected);
  assert.isBoolean(val.filtered);
}

function assertContentFilterDetailedResult(val: ContentFilterDetailedResults): void {
  assert.isBoolean(val.filtered);
  assertNonEmptyArray(val.details, assertContentFilterBlocklistIdResult);
}

function assertContentFilterBlocklistIdResult(val: ContentFilterBlocklistIdResultOutput): void {
  assert.isString(val.id);
  assert.isBoolean(val.filtered);
}

function assertChoice(
  choice: ChatCompletion.Choice | ChatCompletionChunk.Choice,
  options: ChatCompletionTestOptions,
): void {
  const stream = options.stream;
  if (stream) {
    assertMessage((choice as ChatCompletionChunk.Choice).delta, options);
    assert.isFalse("message" in choice);
  } else {
    assertMessage((choice as ChatCompletion.Choice).message, options);
    assert.isFalse("delta" in choice);
  }
  assert.isNumber(choice.index);
  ifDefined(choice.content_filter_results, assertContentFilterResultsForChoice);
  ifDefined(choice.enhancements, assertAzureChatEnhancements);
  ifDefined(choice.finish_details, assertChatFinishDetails);
  ifDefined(choice.logprobs, assertLogProbability);
  ifDefined(choice.finish_reason, assert.isString);
}

export async function assertCompletionsStream(
  stream: AsyncIterable<Omit<Completion, "usage">>,
  options: CompletionTestOptions = {},
): Promise<number> {
  return assertAsyncIterable(stream, (item) => assertCompletionsNoUsage(item, options));
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

function assertLogprobs(logprobs: CompletionChoice.Logprobs): void {
  ifDefined(logprobs.token_logprobs, (token_logprob) => assert.isNumber(token_logprob));
  ifDefined(logprobs.text_offset, (text) => assert.isNumber(text));
  ifDefined(logprobs.tokens, (token) => assert.isNumber(token));
  ifDefined(logprobs.top_logprobs, (top_logprob) => assert.instanceOf(top_logprob, Object));
}
function assertLogProbability(logProbability: ChatCompletion.Choice.Logprobs): void {
  assertNonEmptyArray(logProbability.content ?? [], assertTokenLogProbability);
}

function assertTokenLogProbability(tokenLogprob: ChatCompletionTokenLogprob): void {
  ifDefined(tokenLogprob.bytes, (bytes) => {
    assert.isNumber(bytes);
  });
  assert.isString(tokenLogprob.token);
  assert.isNumber(tokenLogprob.logprob);
}

function assertUsage(usage: CompletionUsage | undefined): void {
  assert.isDefined(usage);
  const castUsage = usage as CompletionUsage;
  assert.isNumber(castUsage.completion_tokens);
  assert.isNumber(castUsage.prompt_tokens);
  assert.isNumber(castUsage.total_tokens);
}

function assertIf<T>(condition: boolean, val: T, check: (x: T) => void): void {
  if (condition) {
    check(val);
  } else {
    ifDefined(val, check);
  }
}

function ifDefined<T>(
  val: T | undefined | null,
  validate: (x: T) => void,
  { defined }: { defined?: boolean } = {},
): void {
  if (val !== undefined && val !== null) {
    validate(val);
  } else if (defined) {
    throw new Error("Expected value to be defined");
  }
}

function assertFunctionCall(
  functionCall: ChatCompletionChunk.Choice.Delta.ToolCall.Function,
  { stream }: ChatCompletionTestOptions,
): void {
  assertIf(!stream, functionCall.arguments, assert.isString);
  assertIf(!stream, functionCall.name, assert.isString);
}

function assertToolCall(
  toolCall: ChatCompletionMessageToolCall | ChatCompletionChunk.Choice.Delta.ToolCall,
  { stream }: ChatCompletionTestOptions,
): void {
  assertIf(!stream, toolCall.type, assert.isString);
  assertIf(!stream, toolCall.id, assert.isString);
  assertIf(
    Boolean(stream),
    (toolCall as ChatCompletionChunk.Choice.Delta.ToolCall).index,
    assert.isNumber,
  );

  switch (toolCall.type) {
    case "function":
      ifDefined(toolCall.function, (functionCall) => assertFunctionCall(functionCall, { stream }));
      break;
  }
}

function assertChatFinishDetails(val: ChatFinishDetailsOutput): void {
  switch (val.type) {
    case "max_tokens":
      break;
    case "stop": {
      assert.isString((val as StopFinishDetailsOutput).stop);
      break;
    }
  }
}

export function assertNonEmptyArray<T>(val: T[], validate: (x: T) => void): void {
  assert.isNotEmpty(val);
  assertArray(val, validate);
}

function assertArray<T>(val: T[], validate: (x: T) => void): void {
  assert.isArray(val);
  for (const x of val) {
    validate(x);
  }
}

export function assertImagesWithURLs(image: ImagesResponse, height: number, width: number): void {
  assert.isNotNull(image);
  assert.isNumber(image.created);
  assert.isArray(image.data);
  image.data.forEach((img) => {
    ifDefined(img.revised_prompt, assert.isString);
    assert.isUndefined(img.b64_json);
    ifDefined(img.url, async (url) => {
      assert.isString(url);
      const response = await get(url);
      const dimensions = await getImageDimensionsFromResponse(response);
      assert.equal(dimensions?.height, height, "Height does not match");
      assert.equal(dimensions?.width, width, "Width does not match");
    });
  });
}

export function assertImagesWithJSON(image: ImagesResponse, height: number, width: number): void {
  assert.isNotNull(image);
  assert.isNumber(image.created);
  assert.isArray(image.data);
  image.data.forEach((img) => {
    ifDefined(img.revised_prompt, assert.isString);
    assert.isUndefined(img.url);
    ifDefined(img.b64_json, async (data) => {
      assert.isString(data);
      // Width in PNG is byte 16 - 19
      const actualWidth = Buffer.from(data, "base64").readUInt32BE(16);
      assert.equal(actualWidth, width, "Width does not match");
      // Height in PNG is byte 20 - 23
      const actualHeight = Buffer.from(data, "base64").readUInt32BE(20);
      assert.equal(actualHeight, height, "Height does not match");
    });
  });
}

export function assertEmbeddings(
  embeddings: CreateEmbeddingResponse,
  options?: EmbeddingTestOptions,
) {
  assert.isNotNull(embeddings.data);
  assert.equal(embeddings.data.length > 0, true);
  assert.isNotNull(embeddings.data[0].embedding);
  assert.equal(embeddings.data[0].embedding.length > 0, true);
  assert.isNotNull(embeddings.usage);
  if (options?.dimensions) {
    assert.equal(embeddings.data[0].embedding.length, options.dimensions);
  }
}

function assertMessage(
  message: ChatCompletionMessage | ChatCompletionChunk.Choice.Delta | undefined,
  { functions, stream }: ChatCompletionTestOptions = {},
): void {
  assert.isDefined(message);
  const msg = message;
  if (!functions) {
    assertIf(!stream, msg?.content, assert.isString);
  }
  assertIf(!stream, msg?.role, assert.isString);
  for (const item of msg?.tool_calls ?? []) {
    assertToolCall(item, { stream });
  }
  ifDefined(msg?.context, assertContext);
}

function assertContext(context: AzureChatExtensionsMessageContextOutput): void {
  ifDefined(context.intent, assert.isString);
  ifDefined(context.citations, (arr) => assertArray(arr, assertCitations));
}

function assertAzureChatEnhancements(val: AzureChatEnhancementsOutput): void {
  ifDefined(val.grounding, assertAzureGroundingEnhancement);
}

function assertAzureGroundingEnhancementLine(val: AzureGroundingEnhancementLineOutput): void {
  assertNonEmptyArray(val.spans, assertAzureGroundingEnhancementLineSpan);
}

function assertAzureGroundingEnhancement(val: AzureGroundingEnhancementOutput): void {
  assertNonEmptyArray(val.lines, assertAzureGroundingEnhancementLine);
}

function assertAzureGroundingEnhancementLineSpan(
  val: AzureGroundingEnhancementLineSpanOutput,
): void {
  assert.isNumber(val.length);
  assert.isNumber(val.offset);
  assert.isString(val.text);
  assertNonEmptyArray(val.polygon, assertAzureGroundingEnhancementCoordinatePoint);
}

function assertAzureGroundingEnhancementCoordinatePoint(
  val: AzureGroundingEnhancementCoordinatePointOutput,
): void {
  assert.isNumber(val.x);
  assert.isNumber(val.y);
}

function assertCitations(citations: AzureChatExtensionDataSourceResponseCitationOutput): void {
  assert.isDefined(citations.content);
  ifDefined(citations.title, assert.isString);
  ifDefined(citations.url, assert.isString);
  ifDefined(citations.filepath, assert.isString);
  ifDefined(citations.chunk_id, assert.isString);
}

export function assertAssistantEquality(
  assistant: AssistantCreateParams,
  response: Assistant,
): void {
  assert.isNotNull(response);
  assert.equal(response.model, assistant.model);
  assert.equal(response.name, assistant.name);
  assert.equal(response.instructions, assistant.instructions);
  assert.equal(response.description, assistant.description);
  assert.equal((response.metadata as Metadata).foo, "bar");
  assert.isNotNull(response.tools[0]);
  const tools = assistant.tools || [];
  assert.equal(response.tools[0].type, tools[0].type);
}

export function assertBatch(batch: Batch): void {
  assert.isString(batch.id);
  assert.equal(batch.completion_window, "24h");
  assert.isNumber(batch.created_at);
  assert.isString(batch.endpoint);
  assert.isString(batch.input_file_id);
  assert.equal(batch.object, "batch");
  assert.isString(batch.status);
  ifDefined(batch.cancelled_at, assert.isNumber);
  ifDefined(batch.cancelling_at, assert.isNumber);
  ifDefined(batch.completed_at, assert.isNumber);
  ifDefined(batch.error_file_id, assert.isString);
  ifDefined(batch.errors, assertBatchErrors);
  ifDefined(batch.expired_at, assert.isNumber);
  ifDefined(batch.expires_at, assert.isNumber);
  ifDefined(batch.failed_at, assert.isNumber);
  ifDefined(batch.finalizing_at, assert.isNumber);
  ifDefined(batch.expired_at, assert.isNumber);
  ifDefined(batch.in_progress_at, assert.isNumber);
  ifDefined(batch.metadata, assert.isNotNull);
  ifDefined(batch.output_file_id, assert.isString);
  ifDefined(batch.request_counts, assertbatchRequestCounts);
}

function assertbatchRequestCounts(requestCounts: BatchRequestCounts): void {
  assert.isNumber(requestCounts.completed);
  assert.isNumber(requestCounts.failed);
  assert.isNumber(requestCounts.total);
}

function assertBatchErrors(errors: Batch.Errors): void {
  ifDefined(errors.object, (object) => assert.equal(object, "list"));
  ifDefined(errors.data, (error) => assertNonEmptyArray(error, assertBatchErrorData));
}

function assertBatchErrorData(error: BatchError): void {
  ifDefined(error.code, assert.isString);
  ifDefined(error.message, assert.isString);
  ifDefined(error.param, assert.isString);
  ifDefined(error.line, assert.isNumber);
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

interface EmbeddingTestOptions {
  dimensions?: number;
}
