// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient } from "./utils/recordedClient";
import {
  TextAnalyticsClient,
  TextDocumentInput,
  DetectLanguageInput,
  DetectLanguageSuccessResult,
  ExtractKeyPhrasesSuccessResult
} from "../src/index";
import { assertAllSuccess } from "./utils/resultHelper";

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
describe("[AAD] TextAnalyticsClient", function() {
  let recorder: Recorder;
  let client: TextAnalyticsClient;

  let getId: () => string;

  // eslint-disable-next-line no-invalid-this
  this.timeout(10000);

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    ({ client, recorder } = createRecordedClient(this));
    let nextId = 0;
    getId = () => {
      nextId += 1;
      return nextId.toString();
    };
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("#analyzeSentiment", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.analyzeSentiment([]), /non-empty array/);
    });

    it("client accepts string[] and language", async () => {
      const results = await client.analyzeSentiment(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.analyzeSentiment(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("service returns error for invalid language", async () => {
      const [result] = await client.analyzeSentiment(["Hello world!"], "notalanguage");
      if (result.error === undefined) {
        assert.fail("Expected an error from the service.");
      }
      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("service returns an error for an empty document", async () => {
      const data = [...testDataEn];
      data.splice(1, 0, "");
      const results = await client.analyzeSentiment(data);
      const errorResult = results[1];
      if (errorResult.error === undefined) {
        assert.fail("Expected an error from the service");
      }
      assert.equal(
        results.filter((result) => result.error === undefined).length,
        testDataEn.length
      );
      assert.equal(errorResult.error.code, "InvalidDocument");
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
      assertAllSuccess(results);
    });
  });

  describe("#detectLanguage", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.detectLanguage([]), /non-empty array/);
    });

    it("client accepts no countryHint", async () => {
      const results = await client.detectLanguage(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts a countryHint", async () => {
      const results = await client.detectLanguage(["impossible"], "fr");
      assert.equal(results.length, 1);
      assertAllSuccess(results);
    });

    it('client accepts "none" country hint with string[] input', async () => {
      const results = await client.detectLanguage(
        ["I use Azure Functions to develop my service."],
        "none"
      );
      assert.equal(results.length, 1);
      assertAllSuccess(results);
      const result = results[0] as DetectLanguageSuccessResult;
      assert.equal(result.primaryLanguage.iso6391Name, "en");
    });

    it('client accepts "none" country hint with DetectLanguageInput[] input', async () => {
      const results = await client.detectLanguage(
        testDataEn.concat(testDataEs).map(
          (input): DetectLanguageInput => ({
            id: getId(),
            countryHint: "none",
            text: input
          })
        )
      );
      assertAllSuccess(results);
    });

    it("service errors on invalid country hint", async () => {
      const [result] = await client.detectLanguage(["hello"], "invalidcountry");
      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
      }

      assert.equal(result.error.code, "InvalidCountryHint");
    });

    it("client accepts mixed-country DetectLanguageInput[]", async () => {
      const enInputs = testDataEn.map(
        (text): DetectLanguageInput => ({
          id: getId(),
          text
        })
      );
      const esInputs = testDataEs.map(
        (text): DetectLanguageInput => ({
          id: getId(),
          countryHint: "mx",
          text
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.detectLanguage(allInputs);
      assert.equal(results.length, testDataEn.length + testDataEs.length);
      assertAllSuccess(results);
    });
  });

  describe("#recognizeEntities", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.recognizeEntities([]), /non-empty array/);
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.recognizeEntities(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with a language specified", async () => {
      const results = await client.recognizeEntities(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("service errors on unsupported language", async () => {
      const [result] = await client.recognizeEntities(
        ["This is some text, but it doesn't matter."],
        "notalanguage"
      );

      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
      }

      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("client accepts mixed-language TextDocumentInput[]", async () => {
      const enInputs = testDataEn.slice(0, -1).map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.recognizeEntities(allInputs);
      assert.equal(results.length, testDataEn.length - 1 + testDataEs.length);
      assertAllSuccess(results);
    });

    it("client throws exception for too many inputs", async () => {
      const enInputs = testDataEn.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      try {
        await client.recognizeEntities(allInputs);
        assert.fail("Oops, an exception didn't happen.");
      } catch (e) {
        assert.equal(e.statusCode, 400);
        assert.equal(e.code, "InvalidDocumentBatch");
        assert.match(e.message, /exceeded the data limitations/);
      }
    });
  });

  describe("#extractKeyPhrases", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.extractKeyPhrases([]), /non-empty array/);
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.extractKeyPhrases(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with a language specified", async () => {
      const results = await client.extractKeyPhrases(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("service errors on unsupported language", async () => {
      const [result] = await client.extractKeyPhrases(
        ["This is some text, but it doesn't matter."],
        "notalanguage"
      );

      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
      }

      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("service reports warning for long words", async () => {
      const results = await client.extractKeyPhrases([
        "Hello world, thisisanextremelymassivesequenceoflettersthatislongerthansixtyfourcharacters."
      ]);
      assertAllSuccess(results);
      const result = results[0] as ExtractKeyPhrasesSuccessResult;
      assert.equal(result.warnings[0].code, "LongWordsInDocument");
    });

    it("client accepts mixed-language TextDocumentInput[]", async () => {
      const enInputs = testDataEn.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.extractKeyPhrases(allInputs);
      assert.equal(results.length, testDataEn.length + testDataEs.length);
      assertAllSuccess(results);
    });
  });

  describe("#recognizeLinkedEntities", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.recognizeLinkedEntities([]), /non-empty array/);
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.recognizeLinkedEntities(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with a language specified", async () => {
      const results = await client.recognizeLinkedEntities(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("service errors on unsupported language", async () => {
      const [result] = await client.recognizeLinkedEntities(
        ["This is some text, but it doesn't matter."],
        "notalanguage"
      );

      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
      }

      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("client accepts mixed-language TextDocumentInput[]", async () => {
      const enInputs = testDataEn.slice(0, -1).map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      const results = await client.recognizeLinkedEntities(allInputs);
      assert.equal(results.length, testDataEn.length - 1 + testDataEs.length);
      assertAllSuccess(results);
    });

    it("client throws exception for too many inputs", async () => {
      const enInputs = testDataEn.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "en"
        })
      );
      const esInputs = testDataEs.map(
        (text): TextDocumentInput => ({
          id: getId(),
          text,
          language: "es"
        })
      );
      const allInputs = enInputs.concat(esInputs);

      try {
        await client.recognizeEntities(allInputs);
        assert.fail("Oops, an exception didn't happen.");
      } catch (e) {
        assert.equal(e.statusCode, 400);
        assert.equal(e.code, "InvalidDocumentBatch");
        assert.match(e.message, /exceeded the data limitations/);
      }
    });
  });
});
