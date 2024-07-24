import { assert } from "vitest";
import { get } from "./utils.js";
import { OpenAI } from "openai";
import { getImageDimensionsFromResponse } from "./images.js";
import { stringToUint8Array } from "@azure/core-util";
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
  AzureChatEnhancementConfiguration,
  AzureChatGroundingEnhancementConfiguration,
  AzureChatOCREnhancementConfiguration,
  ChatFinishDetailsOutput,
  StopFinishDetailsOutput,
} from "../../../src/types/index.js";
import { Assistant, AssistantCreateParams } from "openai/resources/beta/assistants.mjs";
import {
  ChatCompletionChunk,
  ChatCompletionMessage,
  ChatCompletionTokenLogprob,
  Completion,
  CompletionChoice,
  CreateEmbeddingResponse,
} from "openai/resources/index";
import { ErrorModel } from "@azure-rest/core-client";
import { ChatCompletion } from "openai/resources/chat/completions.mjs";

export function assertChatCompletions(
  completions: OpenAI.Chat.Completions.ChatCompletion,
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
    ifDefined(cfr.profanity, assertContentFilterResult);
    ifDefined(cfr.custom_blocklists, assertContentFilterBlocklistIdResult);
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
  assert.isString(val.license);
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
    ifDefined(cfr.custom_blocklists, (arr) =>
      assertArray(arr, assertContentFilterBlocklistIdResult),
    );
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
  stream: AsyncIterable<Omit<OpenAI.Completions.Completion, "usage">>,
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
function assertLogProbability(
  logProbability: OpenAI.Chat.Completions.ChatCompletion.Choice.Logprobs,
): void {
  assertNonEmptyArray(logProbability.content ?? [], assertTokenLogProbability);
}

function assertTokenLogProbability(tokenLogprob: ChatCompletionTokenLogprob): void {
  ifDefined(tokenLogprob.bytes, (bytes) => {
    assert.isNumber(bytes);
  });
  assert.isString(tokenLogprob.token);
  assert.isNumber(tokenLogprob.logprob);
}

function assertUsage(usage: OpenAI.Completions.CompletionUsage | undefined): void {
  assert.isDefined(usage);
  const castUsage = usage as OpenAI.Completions.CompletionUsage;
  assert.isNumber(castUsage.completion_tokens);
  assert.isNumber(castUsage.prompt_tokens);
  assert.isNumber(castUsage.total_tokens);
}

function assertIf(condition: boolean, val: any, check: (x: any) => void): void {
  if (condition) {
    check(val);
  } else {
    ifDefined(val, check);
  }
}

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

function assertFunctionCall(
  functionCall: OpenAI.Chat.Completions.ChatCompletionMessage.FunctionCall,
  { stream }: ChatCompletionTestOptions,
): void {
  assertIf(!stream, functionCall.arguments, assert.isString);
  assertIf(!stream, functionCall.name, assert.isString);
}

function assertToolCall(
  toolCall:
    | OpenAI.Chat.Completions.ChatCompletionMessageToolCall
    | ChatCompletionChunk.Choice.Delta.ToolCall,
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

export function assertImagesWithURLs(
  image: OpenAI.Images.ImagesResponse,
  height: number,
  width: number,
): void {
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

export function assertImagesWithJSON(
  image: OpenAI.Images.ImagesResponse,
  height: number,
  width: number,
): void {
  assert.isNotNull(image);
  assert.isNumber(image.created);
  assert.isArray(image.data);
  image.data.forEach((img) => {
    ifDefined(img.revised_prompt, assert.isString);
    assert.isUndefined(img.url);
    ifDefined(img.b64_json, async (data) => {
      assert.isString(data);
      const arr = stringToUint8Array(data, "base64");
      const actualWidth = new DataView(arr.subarray(16, 4).buffer).getUint32(0);
      assert.equal(actualWidth, width, "Width does not match");
      const actualHeight = new DataView(arr.subarray(20, 4).buffer).getUint32(0);
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

function assertMessage(
  message: ChatCompletionMessage | ChatCompletionChunk.Choice.Delta | undefined,
  { functions, stream }: ChatCompletionTestOptions = {},
): void {
  assert.isDefined(message);
  const msg = message;
  if (!functions) {
    assertIf(!stream, msg.content, assert.isString);
  }
  assertIf(!stream, msg.role, assert.isString);
  for (const item of msg.tool_calls ?? []) {
    assertToolCall(item, { stream });
  }
  ifDefined(msg.context, assertContext);
}

function assertContext(context: AzureChatExtensionsMessageContextOutput): void {
  ifDefined(context.intent, assert.isString);
  ifDefined(context.citations, (arr) => assertArray(arr, assertCitations));
}

function assertAzureChatEnhancements(val: AzureChatEnhancementConfiguration): void {
  ifDefined(val.grounding, assertAzureGroundingEnhancement);
  ifDefined(val.ocr, assertAzureOCREnhancement);
}

function assertAzureGroundingEnhancement(val: AzureChatGroundingEnhancementConfiguration): void {
  assert.isBoolean(val.enabled);
}

function assertAzureOCREnhancement(val: AzureChatOCREnhancementConfiguration): void {
  assert.isBoolean(val.enabled);
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
  assert.equal((response.metadata as any).foo, "bar");
  assert.isNotNull(response.tools[0]);
  const tools = assistant.tools || [];
  assert.equal(response.tools[0].type, tools[0].type);
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
