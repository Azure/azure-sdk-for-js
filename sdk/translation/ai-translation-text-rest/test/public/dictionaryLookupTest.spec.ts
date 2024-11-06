// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import type { TextTranslationClient } from "../../src";
import { isUnexpected } from "../../src";
import { createTranslationClient, startRecorder } from "./utils/recordedClient";
import type { Context } from "mocha";

describe("DictionaryLookup tests", () => {
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
