// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { TextTranslationClient, isUnexpected } from "../../src";
import { createTranslationClient, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("DictionaryExamples tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createTranslationClient({ recorder });
  });

  afterEach(async function () {
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
