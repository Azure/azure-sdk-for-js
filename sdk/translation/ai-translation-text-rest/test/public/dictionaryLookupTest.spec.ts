// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { TextTranslationClient } from "@azure-rest/ai-translation-text";
import { isUnexpected } from "@azure-rest/ai-translation-text";
import { createTranslationClient, startRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DictionaryLookup tests", () => {
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
    const inputText = [{ text: "fly" }];
    const parameters = {
      to: "es",
      from: "en",
    };
    const response = await client.path("/dictionary/lookup").post({
      body: inputText,
      queryParameters: parameters,
    });

    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const dictionaryEntries = response.body;
    assert.isTrue(dictionaryEntries[0].normalizedSource === "fly");
    assert.isTrue(dictionaryEntries[0].displaySource === "fly");
  });

  it("multiple input elements", async () => {
    const inputText = [{ text: "fly" }, { text: "fox" }];
    const parameters = {
      to: "es",
      from: "en",
    };
    const response = await client.path("/dictionary/lookup").post({
      body: inputText,
      queryParameters: parameters,
    });

    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const dictionaryEntries = response.body;
    assert.isTrue(dictionaryEntries.length === 2);
  });
});
