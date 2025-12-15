// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { TextTranslationClient } from "../../src/index.js";
import { isUnexpected } from "../../src/index.js";
import { createTranslationClient, startRecorder } from "./utils/recordedClient.js";
import { editDistance } from "./utils/testHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Transliterate tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("transliterate basic", async () => {
    const inputText = [{ text: "这里怎么一回事?" }];
    const parameters = {
      language: "zh-Hans",
      fromScript: "Hans",
      toScript: "Latn",
    };
    const response = await client.path("/transliterate").post({
      body: { inputs: inputText },
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const transliterations = response.body.value;
    assert.isTrue(transliterations[0].script !== null);
    assert.isTrue(transliterations[0].text !== null);
  });

  it("multiple text array", async () => {
    const inputText = [{ text: "यहएककसौटीहैयहएककसौटीहै" }, { text: "यहएककसौटीहै" }];
    const parameters = {
      language: "hi",
      fromScript: "Deva",
      toScript: "Latn",
    };
    const response = await client.path("/transliterate").post({
      body: { inputs: inputText },
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const transliterations = response.body.value;
    assert.isTrue(transliterations[0].script !== null);
    assert.isTrue(transliterations[0].text !== null);
  });

  it("with edit distance", async () => {
    const inputText = [{ text: "gujarat" }, { text: "hadman" }, { text: "hukkabar" }];
    const parameters = {
      language: "gu",
      fromScript: "Latn",
      toScript: "gujr",
    };
    const response = await client.path("/transliterate").post({
      body: { inputs: inputText },
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const transliterations = response.body.value;
    assert.isTrue(transliterations[0].text !== null);
    assert.isTrue(transliterations[1].text !== null);
    assert.isTrue(transliterations[2].text !== null);

    const expectedText = ["ગુજરાત", "હદમાં", "હુક્કાબાર"];

    let editDistanceValue = 0;
    for (let i = 0; i < expectedText.length; i++) {
      editDistanceValue =
        editDistanceValue + editDistance(expectedText[i], transliterations[i].text);
    }
    assert.isTrue(editDistanceValue < 6);
  });
});
