// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient, testEnv } from "./utils/recordedClient";
import { TextAnalyticsClient, AzureKeyCredential } from "../src/index";
import { assertAllSuccess } from "./utils/resultHelper";

const testDataEn = [
  "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
  "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
  "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
  "I didn't like the last book I read at all."
];

describe("[API Key] TextAnalyticsClient", function() {
  let recorder: Recorder;
  let client: TextAnalyticsClient;

  const apiKey = new AzureKeyCredential(testEnv.TEXT_ANALYTICS_API_KEY);

  // eslint-disable-next-line no-invalid-this
  this.timeout(10000);

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ client, recorder } = createRecordedClient(this, apiKey));
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("#analyzeSentiment", async () => {
    const results = await client.analyzeSentiment(testDataEn);
    assert.equal(results.length, testDataEn.length);
    assertAllSuccess(results);
  });

  it("#detectLanguage", async () => {
    const results = await client.detectLanguage(["impossible"], "fr");
    assert.equal(results.length, 1);
    assertAllSuccess(results);
  });

  it("#extractKeyPhrases", async () => {
    const results = await client.extractKeyPhrases([
      "I had a wonderful trip to Seattle last weekend"
    ]);
    assert.equal(results.length, 1);
    assertAllSuccess(results);
  });

  it("#recognizeEntities", async () => {
    const results = await client.recognizeEntities([
      "I had a wonderful trip to Seattle last weekend."
    ]);
    assert.equal(results.length, 1);
    assertAllSuccess(results);
  });

  it("#recognizeLinkedEntities", async () => {
    const results = await client.recognizeLinkedEntities(["the Roman god Mars"]);
    assert.equal(results.length, 1);
    assertAllSuccess(results);
  });
});
