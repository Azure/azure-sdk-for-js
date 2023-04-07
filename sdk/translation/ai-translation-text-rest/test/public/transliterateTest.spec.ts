// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  InputTextItem,
  TextTranslationClient,
  TransliteratedTextOutput,
  TransliterateQueryParamProperties,
  isUnexpected,
} from "../../src";
import { createTranslationClient, startRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { editDistance } from "./utils/testHelper";

describe("Transliterate tests", () => {
  let recorder: Recorder;
  let client: TextTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("transliterate basic", async () => {
    const inputText: InputTextItem[] = [{ text: "这里怎么一回事?" }];
    const parameters: TransliterateQueryParamProperties & Record<string, unknown> = {
      language: "zh-Hans",
      fromScript: "Hans",
      toScript: "Latn",
    };
    const response = await client.path("/transliterate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TransliteratedTextOutput[];
    assert.isTrue(translations[0].script !== null);
    assert.isTrue(translations[0].text !== null);
  });

  it("multiple text array", async () => {
    const inputText: InputTextItem[] = [
      { text: "यहएककसौटीहैयहएककसौटीहै" },
      { text: "यहएककसौटीहै" },
    ];
    const parameters: TransliterateQueryParamProperties & Record<string, unknown> = {
      language: "hi",
      fromScript: "Deva",
      toScript: "Latn",
    };
    const response = await client.path("/transliterate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TransliteratedTextOutput[];
    assert.isTrue(translations[0].script !== null);
    assert.isTrue(translations[0].text !== null);
  });

  it("with edit distance", async () => {
    const inputText: InputTextItem[] = [
      { text: "gujarat" },
      { text: "hadman" },
      { text: "hukkabar" },
    ];
    const parameters: TransliterateQueryParamProperties & Record<string, unknown> = {
      language: "gu",
      fromScript: "Latn",
      toScript: "gujr",
    };
    const response = await client.path("/transliterate").post({
      body: inputText,
      queryParameters: parameters,
    });
    assert.equal(response.status, "200");

    if (isUnexpected(response)) {
      throw response.body;
    }

    const translations = response.body as TransliteratedTextOutput[];
    assert.isTrue(translations[0].text !== null);
    assert.isTrue(translations[1].text !== null);
    assert.isTrue(translations[2].text !== null);

    const expectedText = ["ગુજરાત", "હદમાં", "હુક્કાબાર"];

    let editDistanceValue = 0;
    for (let i = 0; i < expectedText.length; i++) {
      editDistanceValue = editDistanceValue + editDistance(expectedText[i], translations[i].text);
    }
    assert.isTrue(editDistanceValue < 6);
  });
});
