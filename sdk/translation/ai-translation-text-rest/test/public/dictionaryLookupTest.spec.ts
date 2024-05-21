// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  InputTextItem,
  TextTranslationClient,
  isUnexpected,
} from "../../src";
import { createTranslationClient, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

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
    const inputText: InputTextItem[] = [{ text: "fly" }];
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
    const inputText: InputTextItem[] = [{ text: "fly" }, { text: "fox" }];
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
