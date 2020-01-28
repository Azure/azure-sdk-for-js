// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient } from "./utils/recordedClient";
import { TextAnalyticsClient, TextDocumentInput } from "../src/index";
import { isAnalyzeSentimentSuccess } from "./utils/resultHelper";

const testDataEn = [
  "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
  "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
  "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
  "I didn't like the last book I read at all."
];

const testDataEs = [
  "Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.",
  "La carretera estaba atascada. Había mucho tráfico el día de ayer."
];

describe("[AAD] TextAnalyticsClient", () => {
  let recorder: Recorder;
  let client: TextAnalyticsClient;

  let getId: () => string;

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this));
    let nextId = 0;
    getId = () => {
      nextId += 1;
      return nextId.toString();
    };
  });

  afterEach(() => {
    recorder.stop();
  });

  describe("#analyzeSentiment", () => {
    it("client throws on empty list", async () => {
      try {
        await client.analyzeSentiment([]);
        assert.fail("expected an exception");
      } catch (error) {
        assert.ok(error);
      }
    });

    it("client accepts string[] and language", async () => {
      const results = await client.analyzeSentiment(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assert.ok(results.every((result) => isAnalyzeSentimentSuccess(result)));
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.analyzeSentiment(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assert.ok(results.every((result) => isAnalyzeSentimentSuccess(result)));
    });

    it("client accepts TextDocumentInput[]", async () => {
      const enInputs = testDataEn.map(
        (text): TextDocumentInput => ({
          id: getId(),
          language: "en",
          text
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          language: "es",
          text
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.analyzeSentiment(allInputs);
      assert.equal(results.length, testDataEn.length + testDataEs.length);
      assert.ok(results.every((result) => isAnalyzeSentimentSuccess(result)));
    });
  });
});
