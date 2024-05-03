import { assert } from "@azure-tools/test-utils";
import { get } from "./utils.js";
import { OpenAI } from "openai";
import { ChatCompletionTokenLogprob, CompletionChoice } from "openai/resources/index.mjs";
import { getImageDimensionsFromResponse } from "./images.js";
import { stringToUint8Array } from "@azure/core-util";
import { Recorder } from "@azure-tools/test-recorder";


export function assertChatCompletions(
  completions: OpenAI.Chat.Completions.ChatCompletion,
  options: ChatCompletionTestOptions = {},
): void {
  assertChatCompletionsNoUsage(completions, options);
  ifDefined(completions.usage, assertUsage);
}

function assertChatCompletionsNoUsage(completions: OpenAI.Chat.Completions.ChatCompletion,
  { allowEmptyChoices, allowEmptyId, ...opts }: ChatCompletionTestOptions,): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, (choice) => assertChoice(choice, opts));
  }
  assert.isNumber(completions.created);
  assert.isString(completions.id);
  assert.isString(completions.model);
  ifDefined(completions.system_fingerprint, assert.isString);
  ifDefined(completions.usage, assertUsage);
}

export function assertCompletions(completions: OpenAI.Completions.Completion): void {
  assertCompletionsNoUsage(completions);
  ifDefined(completions.usage, assertUsage);
  // TODO: add content filter results assertion
  // assertContentFilterResultsForPrompt(completions.promptFilterResults ?? []);
}

function assertCompletionsNoUsage(
  completions: Omit<OpenAI.Completions.Completion, "usage">,
  { allowEmptyChoices }: CompletionTestOptions = {},
): void {
  if (!allowEmptyChoices || completions.choices.length > 0) {
    assertNonEmptyArray(completions.choices, assertCompletionsChoice);
  }
  assert.isNumber(completions.created);
  assert.isString(completions.id);
  assert.isString(completions.model);
  ifDefined(completions.system_fingerprint, assert.isString);
}

function assertCompletionsChoice(choice: CompletionChoice): void {
  assert.isNumber(choice.index);
  ifDefined(choice.logprobs, assertLogprobs);
  ifDefined(choice.finish_reason, assert.isString);
  assert.isString(choice.text);
  // TODO: add content filter results assertion
  // ifDefined(choice.contentFilterResults, assertContentFilterResultsForChoice);
}

function assertChoice(choice: OpenAI.Chat.Completions.ChatCompletion.Choice, options: ChatCompletionTestOptions): void {
  const stream = options.stream;
  if (stream) {
    // assertMessage(choice.delta, options);
    assert.isUndefined(choice.message);
  } else {
    assertMessage(choice.message, options);
    // assert.isUndefined(choice.delta);
  }
  assert.isNumber(choice.index);
  // TODO: enable the checks
  // ifDefined(choice.contentFilterResults, assertContentFilterResultsForChoice);
  // ifDefined(choice.enhancements, assertAzureChatEnhancements);
  // ifDefined(choice.finishDetails, assertChatFinishDetails);
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
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  { stream }: ChatCompletionTestOptions,
): void {
  assertIf(!stream, toolCall.type, assert.isString);
  assertIf(!stream, toolCall.id, assert.isString);
  // TODO: change for stream
  // assertIf(Boolean(stream), toolCall.index, assert.isNumber);
  switch (toolCall.type) {
    case "function":
      assertFunctionCall(toolCall.function, { stream });
      break;
  }
}

export function assertNonEmptyArray<T>(val: T[], validate: (x: T) => void): void {
  assert.isArray(val);
  assert.isNotEmpty(val);
  for (const x of val) {
    validate(x);
  }
}

export function assertImagesWithURLs(
  image: OpenAI.Images.ImagesResponse,
  height: number,
  width: number,
  recorder: Recorder,
): void {
  assert.isNotNull(image);
  assert.isNumber(image.created);
  assert.isArray(image.data);
  image.data.forEach((img) => {
    ifDefined(img.revised_prompt, assert.isString);
    assert.isUndefined(img.b64_json);
    ifDefined(img.url, async (url) => {
      assert.isString(url);
      const response = await get(url, recorder);
      const dimensions = await getImageDimensionsFromResponse(response);
      assert.equal(dimensions?.height, height, "Height does not match");
      assert.equal(dimensions?.width, width, "Width does not match");
    });
  });
}

export function assertImagesWithStrings(
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

export function assertEmbeddings(embeddings: OpenAI.Embeddings.CreateEmbeddingResponse) {
  assert.isNotNull(embeddings.data);
  assert.equal(embeddings.data.length > 0, true);
  assert.isNotNull(embeddings.data[0].embedding);
  assert.equal(embeddings.data[0].embedding.length > 0, true);
  assert.isNotNull(embeddings.usage);
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
  message: OpenAI.Chat.Completions.ChatCompletionMessage | undefined,
  { functions, stream }: ChatCompletionTestOptions = {},
): void {
  assert.isDefined(message);
  const msg = message as OpenAI.Chat.Completions.ChatCompletionMessage;
  if (!functions) {
    assertIf(!stream, msg.content, assert.isString);
  }
  assertIf(!stream, msg.role, assert.isString);
  ifDefined(msg.function_call, (item) => assertFunctionCall(item, { stream }));
  for (const item of msg.tool_calls ?? []) {
    assertToolCall(item, { stream });
  }
  // TODO: enable these
  // ifDefined(msg.context, assertContext);
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
