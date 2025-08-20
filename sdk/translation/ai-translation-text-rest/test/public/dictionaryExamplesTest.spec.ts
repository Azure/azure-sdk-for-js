// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { TextTranslationClient } from "@azure-rest/ai-translation-text";
import { isUnexpected } from "@azure-rest/ai-translation-text";
import { createTranslationClient, startRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DictionaryExamples tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("single input element", async () => {
    const inputText = [{ text: "fly", translation: "volar" }];
    const parameters = {
      to: "es",
      from: "en",
    };
    const response = await client.path("/dictionary/examples").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const dictionaryExamples = response.body;
    assert.equal(dictionaryExamples[0].normalizedSource, "fly");
    assert.isTrue(dictionaryExamples[0].normalizedTarget === "volar");
  });

  it("multiple input elements", async () => {
    const inputText = [
      { text: "fly", translation: "volar" },
      { text: "beef", translation: "came" },
    ];
    const parameters = {
      to: "es",
      from: "en",
    };
    const response = await client.path("/dictionary/examples").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const dictionaryExamples = response.body;
    assert.isTrue(dictionaryExamples.length === 2);
  });
});
