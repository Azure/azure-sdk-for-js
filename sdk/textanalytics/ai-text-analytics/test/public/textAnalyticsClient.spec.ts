// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { isRecordMode, Recorder } from "@azure/test-utils-recorder";

import { createRecordedClient } from "../utils/recordedClient";
import {
  TextAnalyticsClient,
  TextDocumentInput,
  DetectLanguageInput,
  DetectLanguageSuccessResult,
  ExtractKeyPhrasesSuccessResult,
  AnalyzeSentimentResultArray,
  AnalyzeSentimentSuccessResult,
  SentenceSentiment,
  MinedOpinion,
  OpinionSentiment
} from "../../src";
import { assertAllSuccess, isSuccess } from "../utils/resultHelper";
import { PiiEntityDomainType } from "../../src";

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

    it("service has a bug when referencing opinions in doc #6 or greater", async () => {
      const documents = [
        "The food was unacceptable",
        "The rooms were beautiful. The AC was good and quiet.",
        "The breakfast was good, but the toilet was smelly.",
        "Loved this hotel - good breakfast - nice shuttle service - clean rooms.",
        "I had a great unobstructed view of the Microsoft campus.",
        "Nice rooms but bathrooms were old and the toilet was dirty when we arrived.",
        "The toilet smelled."
      ];
      const results = await client.analyzeSentiment(documents, "en", {
        includeOpinionMining: true
      });
      const result1 = results[0];
      const result6 = results[5];
      const result7 = results[6];
      if (
        result1.error === undefined &&
        result6.error === undefined &&
        result7.error === undefined
      ) {
        const opinion1 = result1.sentences[0].minedOpinions[0].opinions[0];
        const opinion2 = result6.sentences[0].minedOpinions[0].opinions[0];
        assert.notDeepEqual(opinion1, opinion2);

        const listAllOpinions = (acc: string[], sentence: SentenceSentiment): string[] =>
          acc.concat(
            sentence.minedOpinions.reduce(
              (acc: string[], aspect: MinedOpinion) =>
                acc.concat(aspect.opinions.map((opinion: OpinionSentiment) => opinion.text)),
              []
            )
          );
        const allOpinions1 = result1.sentences.reduce(listAllOpinions, []);
        assert.deepEqual(allOpinions1, ["unacceptable"]);
        const allOpinions2 = result6.sentences.reduce(listAllOpinions, []);
        assert.deepEqual(allOpinions2, ["nice", "old", "dirty"]);
        const allOpinions7 = result7.sentences.reduce(listAllOpinions, []);
        assert.deepEqual(allOpinions7, ["smelled"]);
      }
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
      results.map((result) =>
        (result as AnalyzeSentimentSuccessResult).sentences.map((sentence) =>
          assert.isEmpty(sentence.minedOpinions)
        )
      );
    });

    it("client gets positive mined opinions", async () => {
      const documents = [
        {
          text: "It has a sleek premium aluminum design that makes it beautiful to look at.",
          id: "0",
          language: "en"
        }
      ];
      const results: AnalyzeSentimentResultArray = await client.analyzeSentiment(documents, {
        includeOpinionMining: true
      });
      assert.equal(results.length, 1);
      assertAllSuccess(results);
      const documentSentiment: AnalyzeSentimentSuccessResult = results[0] as AnalyzeSentimentSuccessResult;
      documentSentiment.sentences.map((sentence) =>
        sentence.minedOpinions?.map((opinion) => {
          const aspect = opinion.aspect;
          assert.equal("design", aspect.text);
          assert.equal("positive", aspect.sentiment);
          assert.isAtLeast(aspect.confidenceScores.positive, 0);
          assert.isAtLeast(aspect.confidenceScores.negative, 0);
          assert.equal(aspect.offset, 32);
          assert.equal(aspect.text.length, 6);

          const sleekOpinion = opinion.opinions[0];
          assert.equal("sleek", sleekOpinion.text);
          assert.equal("positive", sleekOpinion.sentiment);
          assert.isAtLeast(sleekOpinion.confidenceScores.positive, 0);
          assert.isAtLeast(sleekOpinion.confidenceScores.positive, 0);
          assert.isFalse(sleekOpinion.isNegated);
          assert.equal(sleekOpinion.offset, 9);
          assert.equal(sleekOpinion.text.length, 5);

          const premiumOpinion = opinion.opinions[1];
          assert.equal("premium", premiumOpinion.text);
          assert.equal("positive", premiumOpinion.sentiment);
          assert.isAtLeast(premiumOpinion.confidenceScores.positive, 0);
          assert.isAtLeast(premiumOpinion.confidenceScores.positive, 0);
          assert.isFalse(premiumOpinion.isNegated);
          assert.equal(premiumOpinion.offset, 15);
          assert.equal(premiumOpinion.text.length, 7);
        })
      );
    });

    it("client gets negative mined opinions", async () => {
      const documents = [
        {
          text: "The food and service is not good",
          id: "0",
          language: "en"
        }
      ];
      const results: AnalyzeSentimentResultArray = await client.analyzeSentiment(documents, {
        includeOpinionMining: true
      });
      assert.equal(results.length, 1);
      assertAllSuccess(results);
      const documentSentiment: AnalyzeSentimentSuccessResult = results[0] as AnalyzeSentimentSuccessResult;
      documentSentiment.sentences.map((sentence) => {
        const foodAspect = sentence.minedOpinions?.[0].aspect;
        assert.equal("food", foodAspect?.text);
        assert.equal("negative", foodAspect?.sentiment);

        const foodAspectPositiveScore = foodAspect?.confidenceScores.positive!;
        const foodAspectNegativeScore = foodAspect?.confidenceScores.negative!;

        assert.isAtLeast(foodAspectPositiveScore, 0);
        assert.isAtLeast(foodAspectNegativeScore, 0);
        assert.equal(foodAspectPositiveScore + foodAspectNegativeScore, 1);

        const serviceAspect = sentence.minedOpinions?.[1].aspect;
        assert.equal("service", serviceAspect?.text);
        assert.equal("negative", serviceAspect?.sentiment);

        const serviceAspectPositiveScore = serviceAspect?.confidenceScores.positive!;
        const serviceAspectNegativeScore = serviceAspect?.confidenceScores.negative!;

        assert.isAtLeast(serviceAspectPositiveScore, 0);
        assert.isAtLeast(serviceAspectNegativeScore, 0);
        assert.equal(serviceAspectPositiveScore + serviceAspectNegativeScore, 1);

        const foodOpinion = sentence.minedOpinions?.[0].opinions[0];
        const serviceOpinion = sentence.minedOpinions?.[1].opinions[0];

        assert.deepEqual(foodOpinion!, serviceOpinion!);

        assert.equal("good", foodOpinion?.text);
        assert.equal("negative", foodOpinion?.sentiment);

        const foodOpinionPositiveScore = foodOpinion?.confidenceScores.positive!;
        const foodOpinionNegativeScore = foodOpinion?.confidenceScores.negative!;

        assert.isAtLeast(foodOpinionPositiveScore, 0);
        assert.isAtLeast(foodOpinionNegativeScore, 0);
        assert.equal(foodOpinionPositiveScore + foodOpinionNegativeScore, 1);
        assert.isTrue(foodOpinion?.isNegated);
      });
    });

    it("client gets no mined opinions", async () => {
      const documents = [
        {
          text: "today is a hot day",
          id: "0",
          language: "en"
        }
      ];
      const results: AnalyzeSentimentResultArray = await client.analyzeSentiment(documents, {
        includeOpinionMining: true
      });
      assert.equal(results.length, 1);
      assertAllSuccess(results);
      const documentSentiment: AnalyzeSentimentSuccessResult = results[0] as AnalyzeSentimentSuccessResult;
      assert.isEmpty(documentSentiment.sentences[0].minedOpinions);
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
        assert.equal(
          e.message,
          "Batch request contains too many records. Max 5 records are permitted."
        );
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

  describe("#recognizePiiEntities", () => {
    it("client throws on empty list", async () => {
      return assert.isRejected(client.recognizePiiEntities([]));
    });

    it("client accepts string[] with no language", async () => {
      const results = await client.recognizePiiEntities(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client accepts string[] with a language specified", async () => {
      const results = await client.recognizePiiEntities(testDataEn, "en");
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("client correctly reports recognition of PII-like pattern", async () => {
      // 078-05-1120 is an invalid social security number due to its use in advertising
      // throughout the late 1930s
      const fakeSSNDocument = "Your Social Security Number is 859-98-0987.";
      const [result] = await client.recognizePiiEntities([fakeSSNDocument], "en");
      assert.ok(isSuccess(result));
      if (!result.error) {
        assert.equal(result.entities.length, 1);
      } else {
        assert.fail("Service returned an error.");
      }
    });

    it("service errors on unsupported language", async () => {
      const [result] = await client.recognizePiiEntities(
        ["This is some text, but it doesn't matter."],
        "notalanguage"
      );

      if (result.error === undefined) {
        assert.fail("Expected an error from the service");
        return;
      }

      assert.equal(result.error.code, "UnsupportedLanguageCode");
    });

    it("client accepts mixed-language TextDocumentInput[]", async () => {
      const sliceSize = 3;
      const enInputs = testDataEn.slice(0, sliceSize).map(
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

      const results = await client.recognizePiiEntities(allInputs);
      assert.equal(results.length, sliceSize + testDataEs.length);
      // TA NER public preview currently supports only english
      assert.ok(results.slice(0, sliceSize).every(isSuccess));
    });

    it("accepts domain filter", async () => {
      const [result] = await client.recognizePiiEntities(
        [
          {
            id: "0",
            text: "I work at Microsoft and my phone number is 333-333-3333",
            language: "en"
          }
        ],
        { domainFilter: PiiEntityDomainType.PROTECTED_HEALTH_INFORMATION }
      );
      if (!result.error) {
        assert.equal(result.entities.length, 1);
        assert.equal(result.entities[0].text, "333-333-3333");
        assert.equal(result.entities[0].category, "Phone Number");
        assert.equal(
          result.redactedText,
          "I work at Microsoft and my phone number is ************"
        );
      }
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
        assert.equal(
          e.message,
          "Batch request contains too many records. Max 5 records are permitted."
        );
      }
    });
  });

  describe("#String encoding", () => {
    it("emoji", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "👩 SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 8);
        assert.equal(result.entities[0].text.length, 11);
      }
    });

    it("emoji with skin tone modifier", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "👩🏻 SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 10);
        assert.equal(result.entities[0].text.length, 11);
      }
    });

    it("family emoji", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "👩‍👩‍👧‍👧 SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 17);
        assert.equal(result.entities[0].text.length, 11);
      }
    });

    it("family emoji wit skin tone modifier", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 25);
        assert.equal(result.entities[0].text.length, 11);
      }
    });

    it("diacritics nfc", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "año SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 9);
        assert.equal(result.entities[0].text.length, 11);
      }
    });

    it("diacritics nfd", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "año SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 10);
        assert.equal(result.entities[0].text.length, 11);
      }
    });

    it("korean nfc", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "아가 SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 8);
        assert.equal(result.entities[0].text.length, 11);
      }
    });

    it("korean nfd", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "아가 SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 8);
        assert.equal(result.entities[0].text.length, 11);
      }
    });

    it("zalgo", async () => {
      const [result] = await client.recognizePiiEntities([
        { id: "0", text: "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987", language: "en" }
      ]);
      if (!result.error) {
        assert.equal(result.entities[0].offset, 121);
        assert.equal(result.entities[0].text.length, 11);
      }
    });
  });

  describe("#analyze", () => {
    let pollingInterval = 2000;
    if (isRecordMode() || process.env.TEST_MODE === "live") {
      // eslint-disable-next-line no-invalid-this
      this.timeout(1000000);
    } else {
      pollingInterval = 0;
    }
    it("single entity recognition task", async () => {
      const docs = [
        { id: "1", language: "en", text: "Microsoft was founded by Bill Gates and Paul Allen" },
        { id: "2", language: "es", text: "Microsoft fue fundado por Bill Gates y Paul Allen" }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults;
        if (entitiesResult && entitiesResult.length === 1) {
          const task = entitiesResult[0];
          for (const result of task) {
            if (!result.error) {
              assert.ok(result.id);
              assert.ok(result.entities);
            } else {
              assert.fail("did not expect document errors but got one.");
            }
          }
        } else {
          assert.fail("expected an array of entities results but did not get one.");
        }
      }
    });

    it("single key phrases task", async () => {
      const docs = [
        { id: "1", language: "en", text: "Microsoft was founded by Bill Gates and Paul Allen" },
        { id: "2", language: "es", text: "Microsoft fue fundado por Bill Gates y Paul Allen" }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const keyPhrasesResult = page.keyPhrasesExtractionResults;
        if (keyPhrasesResult && keyPhrasesResult.length === 1) {
          const task = keyPhrasesResult[0];
          assert.equal(task.length, 2);
          for (const result of task) {
            if (!result.error) {
              assert.include(result.keyPhrases, "Paul Allen");
              assert.include(result.keyPhrases, "Bill Gates");
              assert.include(result.keyPhrases, "Microsoft");
              assert.ok(result.id);
            }
          }
        } else {
          assert.fail("expected an array of key phrases results but did not get one.");
        }
      }
    });

    it("single entities recognition task", async () => {
      const docs = [
        {
          id: "1",
          text: "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.",
          language: "en"
        },
        {
          id: "2",
          text: "Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.",
          language: "es"
        },
        {
          id: "3",
          text: "Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.",
          language: "de"
        }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults;
        if (entitiesResult && entitiesResult.length === 1) {
          const task = entitiesResult[0];
          assert.equal(task.length, 3);
          for (const doc of task) {
            if (!doc.error) {
              assert.equal(doc.entities.length, 4);
              for (const entity of doc.entities) {
                assert.isDefined(entity.text);
                assert.isDefined(entity.category);
                assert.isDefined(entity.offset);
                assert.isDefined(entity.confidenceScore);
              }
            }
          }
        } else {
          assert.fail("expected an array of entities results but did not get one.");
        }
      }
    });

    it("single pii entities recognition task", async () => {
      const docs = [
        { id: "1", text: "My SSN is 859-98-0987." },
        {
          id: "2",
          text:
            "Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."
        },
        { id: "3", text: "Is 998.214.865-68 your Brazilian CPF number?" }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.piiEntitiesRecognitionResults;
        if (entitiesResult && entitiesResult.length === 1) {
          const task = entitiesResult[0];
          assert.equal(task.length, 3);
          const doc1 = task[0];
          const doc2 = task[1];
          const doc3 = task[2];
          if (!doc1.error) {
            assert.equal(doc1.entities[0].text, "859-98-0987");
            assert.equal(doc1.entities[0].category, "U.S. Social Security Number (SSN)");
          }
          if (!doc2.error) {
            assert.equal(doc2.entities[0].text, "111000025");
            // assert.equal(doc2.entities[0].category, "ABA Routing Number")  # Service is currently returning PhoneNumber here
          }
          if (!doc3.error) {
            assert.equal(doc3.entities[0].text, "998.214.865-68");
            assert.equal(doc3.entities[0].category, "Brazil CPF Number");
          }
          for (const doc of task) {
            if (!doc.error) {
              for (const entity of doc.entities) {
                assert.isDefined(entity.text);
                assert.isDefined(entity.category);
                assert.isDefined(entity.offset);
                assert.isDefined(entity.confidenceScore);
              }
            }
          }
        } else {
          assert.fail("expected an array of pii entities results but did not get one.");
        }
      }
    });

    it("bad request empty string", async () => {
      const docs = [""];
      try {
        const poller = await client.beginAnalyze(
          docs,
          {
            entityRecognitionPiiTasks: [{ modelVersion: "latest" }]
          },
          "en",
          {
            polling: {
              updateIntervalInMs: pollingInterval
            }
          }
        );
        await poller.pollUntilDone();
      } catch (e) {
        assert.equal(e.statusCode, 400);
      }
    });

    /**
     * Analyze responds with an InvalidArgument error instead of an InvalidDocument one
     */
    it.skip("some documents with errors and multiple tasks", async () => {
      const docs = [
        { id: "1", language: "", text: "" },
        {
          id: "2",
          language: "english",
          text: "I did not like the hotel we stayed at. It was too expensive."
        },
        {
          id: "3",
          language: "en",
          text: "The restaurant had really good food. I recommend you try it."
        }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults;
        if (entitiesResult && entitiesResult.length === 1) {
          const docs = entitiesResult[0];
          assert.equal(docs.length, 3);
          assert.isDefined(docs[0].error);
          assert.isDefined(docs[1].error);
          assert.isUndefined(docs[2].error);
        } else {
          assert.fail("expected an array of entities results but did not get one.");
        }

        const piiEntitiesResult = page.piiEntitiesRecognitionResults;
        if (piiEntitiesResult && piiEntitiesResult.length === 1) {
          const docs = piiEntitiesResult[0];
          assert.equal(docs.length, 3);
          assert.isDefined(docs[0].error);
          assert.isDefined(docs[1].error);
          assert.isUndefined(docs[2].error);
        } else {
          assert.fail("expected an array of pii entities results but did not get one.");
        }

        const keyPhrasesResult = page.keyPhrasesExtractionResults;
        if (keyPhrasesResult && keyPhrasesResult.length === 1) {
          const docs = keyPhrasesResult[0];
          assert.equal(docs.length, 3);
          assert.isDefined(docs[0].error);
          assert.isDefined(docs[1].error);
          assert.isUndefined(docs[2].error);
        } else {
          assert.fail("expected an array of key phrases results but did not get one.");
        }
      }
    });

    /**
     * Analyze responds with an InvalidArgument error instead of an InvalidDocument one
     */
    it.skip("all documents with errors and multiple tasks", async () => {
      const docs = [
        { id: "1", language: "", text: "" },
        {
          id: "2",
          language: "english",
          text: "I did not like the hotel we stayed at. It was too expensive."
        },
        {
          id: "3",
          language: "en",
          text: ""
        }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults;
        if (entitiesResult && entitiesResult.length === 1) {
          const docs = entitiesResult[0];
          assert.equal(docs.length, 3);
          assert.isDefined(docs[0].error);
          assert.isDefined(docs[1].error);
          assert.isDefined(docs[2].error);
        } else {
          assert.fail("expected an array of entities results but did not get one.");
        }

        const piiEntitiesResult = page.piiEntitiesRecognitionResults;
        if (piiEntitiesResult && piiEntitiesResult.length === 1) {
          const docs = piiEntitiesResult[0];
          assert.equal(docs.length, 3);
          assert.isDefined(docs[0].error);
          assert.isDefined(docs[1].error);
          assert.isDefined(docs[2].error);
        } else {
          assert.fail("expected an array of pii entities results but did not get one.");
        }

        const keyPhrasesResult = page.keyPhrasesExtractionResults;
        if (keyPhrasesResult && keyPhrasesResult.length === 1) {
          const docs = keyPhrasesResult[0];
          assert.equal(docs.length, 3);
          assert.isDefined(docs[0].error);
          assert.isDefined(docs[1].error);
          assert.isDefined(docs[2].error);
        } else {
          assert.fail("expected an array of key phrases results but did not get one.");
        }
      }
    });

    it("output order is same as the input's one with multiple tasks", async () => {
      const docs = [
        { id: "1", text: "one" },
        { id: "2", text: "two" },
        { id: "3", text: "three" },
        { id: "4", text: "four" },
        { id: "5", text: "five" }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults;
        if (entitiesResult && entitiesResult.length === 1) {
          const docs = entitiesResult[0];
          assert.equal(docs.length, 5);
          let i = 1;
          for (const doc of docs) {
            assert.equal(parseInt(doc.id), i++);
          }
        } else {
          assert.fail("expected an array of entities results but did not get one.");
        }

        const piiEntitiesResult = page.piiEntitiesRecognitionResults;
        if (piiEntitiesResult && piiEntitiesResult.length === 1) {
          const docs = piiEntitiesResult[0];
          assert.equal(docs.length, 5);
          let i = 1;
          for (const doc of docs) {
            assert.equal(parseInt(doc.id), i++);
          }
        } else {
          assert.fail("expected an array of pii entities results but did not get one.");
        }

        const keyPhrasesResult = page.keyPhrasesExtractionResults;
        if (keyPhrasesResult && keyPhrasesResult.length === 1) {
          const docs = keyPhrasesResult[0];
          assert.equal(docs.length, 5);
          let i = 1;
          for (const doc of docs) {
            assert.equal(parseInt(doc.id), i++);
          }
        } else {
          assert.fail("expected an array of key phrases results but did not get one.");
        }
      }
    });

    it("out of order input IDs with multiple tasks", async () => {
      const docs = [
        { id: "56", text: ":)" },
        { id: "0", text: ":(" },
        { id: "22", text: "w" },
        { id: "19", text: ":P" },
        { id: "1", text: ":D" }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      const in_order = ["56", "0", "22", "19", "1"];
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults;
        if (entitiesResult && entitiesResult.length === 1) {
          const docs = entitiesResult[0];
          assert.equal(docs.length, 5);
          let i = 0;
          for (const doc of docs) {
            assert.equal(doc.id, in_order[i++]);
          }
        } else {
          assert.fail("expected an array of entities results but did not get one.");
        }

        const piiEntitiesResult = page.piiEntitiesRecognitionResults;
        if (piiEntitiesResult && piiEntitiesResult.length === 1) {
          const docs = piiEntitiesResult[0];
          assert.equal(docs.length, 5);
          let i = 0;
          for (const doc of docs) {
            assert.equal(doc.id, in_order[i++]);
          }
        } else {
          assert.fail("expected an array of pii entities results but did not get one.");
        }

        const keyPhrasesResult = page.keyPhrasesExtractionResults;
        if (keyPhrasesResult && keyPhrasesResult.length === 1) {
          const docs = keyPhrasesResult[0];
          assert.equal(docs.length, 5);
          let i = 0;
          for (const doc of docs) {
            assert.equal(doc.id, in_order[i++]);
          }
        } else {
          assert.fail("expected an array of key phrases results but did not get one.");
        }
      }
    });

    /**
     * The service does not returns statistics
     */
    it.skip("statistics", async () => {
      const docs = [
        { id: "56", text: ":)" },
        { id: "0", text: ":(" },
        { id: "22", text: "" },
        { id: "19", text: ":P" },
        { id: "1", text: ":D" }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        {
          analyze: { includeStatistics: true },
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      assert.equal(result.statistics?.documentCount, 5);
      assert.equal(result.statistics?.transactionCount, 4);
      assert.equal(result.statistics?.validDocumentCount, 4);
      assert.equal(result.statistics?.erroneousDocumentCount, 1);
    });

    it("whole batch language hint", async () => {
      const docs = [
        "This was the best day of my life.",
        "I did not like the hotel we stayed at. It was too expensive.",
        "The restaurant was not as good as I hoped."
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        "en",
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults!;
        assert.equal(entitiesResult.length, 1);
        for (const docs of entitiesResult) {
          assert.equal(docs.length, 3);
          for (const doc of docs) {
            assert.isUndefined(doc.error);
          }
        }
      }
    });

    it("whole batch with no language hint", async () => {
      const docs = [
        "This was the best day of my life.",
        "I did not like the hotel we stayed at. It was too expensive.",
        "The restaurant was not as good as I hoped."
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        "",
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults!;
        assert.equal(entitiesResult.length, 1);
        for (const docs of entitiesResult) {
          assert.equal(docs.length, 3);
          for (const doc of docs) {
            assert.isUndefined(doc.error);
          }
        }
      }
    });

    it("each doc has a language hint", async () => {
      const docs = [
        { id: "1", language: "", text: "I will go to the park." },
        { id: "2", language: "", text: "I did not like the hotel we stayed at." },
        { id: "3", text: "The restaurant had really good food." }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults!;
        assert.equal(entitiesResult.length, 1);
        for (const docs of entitiesResult) {
          assert.equal(docs.length, 3);
          for (const doc of docs) {
            assert.isUndefined(doc.error);
          }
        }
      }
    });

    it("whole batch input with a language hint", async () => {
      const docs = [
        { id: "1", text: "I will go to the park." },
        { id: "2", text: "Este es un document escrito en Español." },
        { id: "3", text: "猫は幸せ" }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const entitiesResult = page.entitiesRecognitionResults!;
        assert.equal(entitiesResult.length, 1);
        for (const docs of entitiesResult) {
          assert.equal(docs.length, 3);
          for (const doc of docs) {
            assert.isUndefined(doc.error);
          }
        }
      }
    });

    it("invalid language hint", async () => {
      const docs = ["This should fail because we're passing in an invalid language hint"];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        "notalanguage",
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      const firstResult = (await result.next()).value;
      const entitiesTaskDocs = firstResult?.entitiesRecognitionResults![0];
      for (const doc of entitiesTaskDocs) {
        assert.equal(doc.error?.code, "InvalidArgument");
      }
      const piiEntitiesTaskDocs = firstResult?.piiEntitiesRecognitionResults![0];
      for (const doc of piiEntitiesTaskDocs) {
        assert.equal(doc.error?.code, "InvalidArgument");
      }
      const keyPhrasesTaskDocs = firstResult?.keyPhrasesExtractionResults![0];
      for (const doc of keyPhrasesTaskDocs) {
        assert.equal(doc.error?.code, "InvalidArgument");
      }
    });

    it.skip("bad model", async () => {
      const docs = [
        {
          id: "1",
          language: "en",
          text: "This should fail because we're passing in an invalid language hint"
        }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "bad" }],
          entityRecognitionPiiTasks: [{ modelVersion: "bad" }],
          keyPhraseExtractionTasks: [{ modelVersion: "bad" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      const firstResult = (await result.next()).value;
      const entitiesTaskDocs = firstResult?.entitiesRecognitionResults![0];
      for (const doc of entitiesTaskDocs) {
        assert.equal(doc.error?.code, "UnknownError");
      }
      const piiEntitiesTaskDocs = firstResult?.piiEntitiesRecognitionResults![0];
      for (const doc of piiEntitiesTaskDocs) {
        assert.equal(doc.error?.code, "UnknownError");
      }
      const keyPhrasesTaskDocs = firstResult?.keyPhrasesExtractionResults![0];
      for (const doc of keyPhrasesTaskDocs) {
        assert.equal(doc.error?.code, "UnknownError");
      }
    });

    it("paged results with custom page size", async () => {
      const totalDocs = 25;
      const docs = Array(totalDocs - 1).fill("random text");
      docs.push("Microsoft was founded by Bill Gates and Paul Allen");
      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionTasks: [{ modelVersion: "latest" }],
          keyPhraseExtractionTasks: [{ modelVersion: "latest" }]
        },
        "en",
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      let docCount = 0;
      let pageCount = 0;
      const pageSize = 10;
      for await (const page of result.byPage({ maxPageSize: pageSize })) {
        const entitiesTaskDocs = page.entitiesRecognitionResults![0];
        ++pageCount;
        for (const doc of entitiesTaskDocs) {
          assert.isUndefined(doc.error);
          ++docCount;
          if (!doc.error) {
            if (docCount === totalDocs) {
              assert.equal(doc.entities.length, 3);
            } else {
              assert.equal(doc.entities.length, 0);
            }
          }
        }
      }
      assert.equal(docs.length, docCount);
      assert.equal(Math.ceil(docs.length / pageSize), pageCount);
    });

    it("pii redacted test is not empty", async () => {
      const docs = [
        { id: "1", text: "I will go to the park." },
        { id: "2", text: "Este es un document escrito en Español." },
        { id: "3", text: "猫は幸せ" }
      ];

      const poller = await client.beginAnalyze(
        docs,
        {
          entityRecognitionPiiTasks: [{ modelVersion: "latest" }]
        },
        {
          polling: {
            updateIntervalInMs: pollingInterval
          }
        }
      );
      const result = await poller.pollUntilDone();
      for await (const page of result) {
        const piiEntitiesResult = page.piiEntitiesRecognitionResults!;
        assert.equal(piiEntitiesResult.length, 1);
        for (const docs of piiEntitiesResult) {
          assert.equal(docs.length, 3);
          for (const doc of docs) {
            assert.isUndefined(doc.error);
            if (!doc.error) {
              assert.isNotEmpty(doc.redactedText);
            }
          }
        }
      }
    });
  });
});
