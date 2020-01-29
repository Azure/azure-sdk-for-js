// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
import chaiPromises from "chai-as-promised";
chai.use(chaiPromises);

import { assert, expect } from "chai";

import { Recorder, env } from "@azure/test-utils-recorder";

import { createRecordedClient } from "./utils/recordedClient";
import { TextAnalyticsClient, TextAnalyticsApiKeyCredential } from "../src/index";
import { isSuccess } from "./utils/resultHelper";
import { WebResource } from "@azure/core-http";

const testDataEn = [
  "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
  "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
  "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
  "I didn't like the last book I read at all."
];

describe("TextAnalyticsApiKeyCredential", () => {
  it("credential signRequest throws on undefined webResource", async () => {
    const credential = new TextAnalyticsApiKeyCredential(env.SUBSCRIPTION_KEY);

    return assert.isRejected(
      credential.signRequest((undefined as unknown) as WebResource),
      /null or undefined/
    );
  });
  it("credential constructor throws on invalid key", () => {
    return expect(() => new TextAnalyticsApiKeyCredential("")).to.throw(/non-empty string/);
  });
});

describe("[API Key] TextAnalyticsClient", () => {
  let recorder: Recorder;
  let client: TextAnalyticsClient;

  const apiKey = new TextAnalyticsApiKeyCredential(env.SUBSCRIPTION_KEY);

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this, apiKey));
  });

  afterEach(() => {
    recorder.stop();
  });

  it("#analyzeSentiment", async () => {
    const results = await client.analyzeSentiment(testDataEn);
    assert.equal(results.length, testDataEn.length);
    assert.ok(results.every(isSuccess));
  });

  it("#detectLanguages", async () => {
    const results = await client.detectLanguages(["impossible"], "fr");
    assert.equal(results.length, 1);
    assert.ok(results.every(isSuccess));
  });
});
