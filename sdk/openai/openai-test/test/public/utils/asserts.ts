import { assert } from "@azure-tools/test-utils";
import { get } from "./utils.js";
import { OpenAI } from "openai";
import { ChatCompletionTokenLogprob, CompletionChoice } from "openai/resources/index.mjs";
import { getImageDimensionsFromResponse } from "./images.js";
import { stringToUint8Array } from "@azure/core-util";
import { Recorder } from "@azure-tools/test-recorder";

export function assertChatCompletions(completions: OpenAI.Chat.Completions.ChatCompletion): void {
  assertNonEmptyArray(completions.choices, assertChoice);
  assert.isNumber(completions.created);
  assert.isString(completions.id);
  assert.isString(completions.model);
  ifDefined(completions.system_fingerprint, assert.isString);
  ifDefined(completions.usage, assertUsage);
}

export function assertCompletions(completions: OpenAI.Completions.Completion): void {
  assertNonEmptyArray(completions.choices, assertCompletionsChoice);
  assert.isNumber(completions.created);
  assert.isString(completions.id);
  assert.isString(completions.model);
  ifDefined(completions.system_fingerprint, assert.isString);
  ifDefined(completions.usage, assertUsage);
}

function assertCompletionsChoice(choice: CompletionChoice): void {
  assert.isDefined(choice.index);
  ifDefined(choice.logprobs, assertLogprobs);
  ifDefined(choice.finish_reason, assert.isString);
  assert.isDefined(choice.text);
}

function assertChoice(choice: OpenAI.Chat.Completions.ChatCompletion.Choice): void {
  assert.isNumber(choice.index);
  ifDefined(choice.logprobs, assertLogProbability);
  ifDefined(choice.finish_reason, assert.isString);
  assert.isDefined(choice.message.role);
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
