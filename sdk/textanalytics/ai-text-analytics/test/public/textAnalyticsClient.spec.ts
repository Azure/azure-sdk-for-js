// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert } from "chai";

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";

import { createClient, createRecorder } from "./utils/recordedClient";
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
  OpinionSentiment,
  PiiEntityDomainType
} from "../../src";
import { assertAllSuccess, isSuccess } from "./utils/resultHelper";
import { checkEntityTextOffset, checkOffsetAndLength } from "./utils/stringIndexTypeHelpers";

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
  // eslint-disable-next-line no-invalid-this
  const CLITimeout = this.timeout();
  const fastTimeout = 10000;

  let getId: () => string;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = createRecorder(this);
    client = createClient("AAD");
    let nextId = 0;
    getId = function() {
      nextId += 1;
      return nextId.toString();
    };
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("fast tests", function() {
    before(function() {
      // eslint-disable-next-line no-invalid-this
      this.timeout(fastTimeout);
    });

    describe("#analyzeSentiment", function() {
      it("client throws on empty list", async function() {
        return assert.isRejected(client.analyzeSentiment([]), /non-empty array/);
      });

      it("client accepts string[] and language", async function() {
        const results = await client.analyzeSentiment(testDataEn, "en");
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("client accepts string[] with no language", async function() {
        const results = await client.analyzeSentiment(testDataEn);
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("service returns error for invalid language", async function() {
        const [result] = await client.analyzeSentiment(["Hello world!"], "notalanguage");
        if (result.error === undefined) {
          assert.fail("Expected an error from the service.");
        }
        assert.equal(result.error.code, "UnsupportedLanguageCode");
      });

      it("service has a bug when referencing opinions in doc #6 or greater", async function() {
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
                (opinions: string[], aspect: MinedOpinion) =>
                  opinions.concat(aspect.opinions.map((opinion: OpinionSentiment) => opinion.text)),
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

      it("service returns an error for an empty document", async function() {
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

      it("client accepts TextDocumentInput[]", async function() {
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

      it("client gets positive mined opinions", async function() {
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
            assert.equal(aspect.length, 6);
            assert.equal(aspect.text.length, aspect.length);

            const sleekOpinion = opinion.opinions[0];
            assert.equal("sleek", sleekOpinion.text);
            assert.equal("positive", sleekOpinion.sentiment);
            assert.isAtLeast(sleekOpinion.confidenceScores.positive, 0);
            assert.isAtLeast(sleekOpinion.confidenceScores.positive, 0);
            assert.isFalse(sleekOpinion.isNegated);
            assert.equal(sleekOpinion.offset, 9);
            assert.equal(sleekOpinion.length, 5);
            assert.equal(sleekOpinion.text.length, sleekOpinion.length);

            const premiumOpinion = opinion.opinions[1];
            assert.equal("premium", premiumOpinion.text);
            assert.equal("positive", premiumOpinion.sentiment);
            assert.isAtLeast(premiumOpinion.confidenceScores.positive, 0);
            assert.isAtLeast(premiumOpinion.confidenceScores.positive, 0);
            assert.isFalse(premiumOpinion.isNegated);
            assert.equal(premiumOpinion.offset, 15);
            assert.equal(premiumOpinion.length, 7);
            assert.equal(premiumOpinion.text.length, premiumOpinion.length);
          })
        );
      });

      it("client gets negative mined opinions", async function() {
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

      it("client gets no mined opinions", async function() {
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

    describe("#detectLanguage", function() {
      it("client throws on empty list", async function() {
        return assert.isRejected(client.detectLanguage([]), /non-empty array/);
      });

      it("client accepts no countryHint", async function() {
        const results = await client.detectLanguage(testDataEn);
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("client accepts a countryHint", async function() {
        const results = await client.detectLanguage(["impossible"], "fr");
        assert.equal(results.length, 1);
        assertAllSuccess(results);
      });

      it('client accepts "none" country hint with string[] input', async function() {
        const results = await client.detectLanguage(
          ["I use Azure Functions to develop my service."],
          "none"
        );
        assert.equal(results.length, 1);
        assertAllSuccess(results);
        const result = results[0] as DetectLanguageSuccessResult;
        assert.equal(result.primaryLanguage.iso6391Name, "en");
      });

      it('client accepts "none" country hint with DetectLanguageInput[] input', async function() {
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

      it("service errors on invalid country hint", async function() {
        const [result] = await client.detectLanguage(["hello"], "invalidcountry");
        if (result.error === undefined) {
          assert.fail("Expected an error from the service");
        }

        assert.equal(result.error.code, "InvalidCountryHint");
      });

      it("client accepts mixed-country DetectLanguageInput[]", async function() {
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

    describe("#recognizeEntities", function() {
      it("client throws on empty list", async function() {
        return assert.isRejected(client.recognizeEntities([]), /non-empty array/);
      });

      it("client accepts string[] with no language", async function() {
        const results = await client.recognizeEntities(testDataEn);
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("client accepts string[] with a language specified", async function() {
        const results = await client.recognizeEntities(testDataEn, "en");
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("service errors on unsupported language", async function() {
        const [result] = await client.recognizeEntities(
          ["This is some text, but it doesn't matter."],
          "notalanguage"
        );

        if (result.error === undefined) {
          assert.fail("Expected an error from the service");
        }

        assert.equal(result.error.code, "UnsupportedLanguageCode");
      });

      it("client accepts mixed-language TextDocumentInput[]", async function() {
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

      it("client throws exception for too many inputs", async function() {
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

    describe("#extractKeyPhrases", function() {
      it("client throws on empty list", async function() {
        return assert.isRejected(client.extractKeyPhrases([]), /non-empty array/);
      });

      it("client accepts string[] with no language", async function() {
        const results = await client.extractKeyPhrases(testDataEn);
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("client accepts string[] with a language specified", async function() {
        const results = await client.extractKeyPhrases(testDataEn, "en");
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("service errors on unsupported language", async function() {
        const [result] = await client.extractKeyPhrases(
          ["This is some text, but it doesn't matter."],
          "notalanguage"
        );

        if (result.error === undefined) {
          assert.fail("Expected an error from the service");
        }

        assert.equal(result.error.code, "UnsupportedLanguageCode");
      });

      it("service reports warning for long words", async function() {
        const results = await client.extractKeyPhrases([
          "Hello world, thisisanextremelymassivesequenceoflettersthatislongerthansixtyfourcharacters."
        ]);
        assertAllSuccess(results);
        const result = results[0] as ExtractKeyPhrasesSuccessResult;
        assert.equal(result.warnings[0].code, "LongWordsInDocument");
      });

      it("client accepts mixed-language TextDocumentInput[]", async function() {
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

    describe("#recognizePiiEntities", function() {
      it("client throws on empty list", async function() {
        return assert.isRejected(client.recognizePiiEntities([]));
      });

      it("client accepts string[] with no language", async function() {
        const results = await client.recognizePiiEntities(testDataEn);
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("client accepts string[] with a language specified", async function() {
        const results = await client.recognizePiiEntities(testDataEn, "en");
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("client correctly reports recognition of PII-like pattern", async function() {
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

      it("service errors on unsupported language", async function() {
        const [result] = await client.recognizePiiEntities(
          ["This is some text, but it doesn't matter."],
          "notalanguage"
        );

        if (result.error === undefined) {
          assert.fail("Expected an error from the service");
        }

        assert.equal(result.error.code, "UnsupportedLanguageCode");
      });

      it("client accepts mixed-language TextDocumentInput[]", async function() {
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

      it("accepts domain filter", async function() {
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

    describe("#recognizeLinkedEntities", function() {
      it("client throws on empty list", async function() {
        return assert.isRejected(client.recognizeLinkedEntities([]), /non-empty array/);
      });

      it("client accepts string[] with no language", async function() {
        const results = await client.recognizeLinkedEntities(testDataEn);
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("client accepts string[] with a language specified", async function() {
        const results = await client.recognizeLinkedEntities(testDataEn, "en");
        assert.equal(results.length, testDataEn.length);
        assertAllSuccess(results);
      });

      it("service errors on unsupported language", async function() {
        const [result] = await client.recognizeLinkedEntities(
          ["This is some text, but it doesn't matter."],
          "notalanguage"
        );

        if (result.error === undefined) {
          assert.fail("Expected an error from the service");
        }

        assert.equal(result.error.code, "UnsupportedLanguageCode");
      });

      it("client accepts mixed-language TextDocumentInput[]", async function() {
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

      it("client throws exception for too many inputs", async function() {
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

    describe("#String encoding", function() {
      describe("#Default encoding (utf16CodeUnit)", function() {
        it("emoji", async function() {
          checkOffsetAndLength(
            client,
            "👩 SSN: 859-98-0987",
            "Utf16CodeUnit",
            8,
            11,
            checkEntityTextOffset
          );
        });

        it("emoji with skin tone modifier", async function() {
          checkOffsetAndLength(
            client,
            "👩🏻 SSN: 859-98-0987",
            "Utf16CodeUnit",
            10,
            11,
            checkEntityTextOffset
          );
        });

        it("family emoji", async function() {
          checkOffsetAndLength(
            client,
            "👩‍👩‍👧‍👧 SSN: 859-98-0987",
            "Utf16CodeUnit",
            17,
            11,
            checkEntityTextOffset
          );
        });

        it("family emoji wit skin tone modifier", async function() {
          checkOffsetAndLength(
            client,
            "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
            "Utf16CodeUnit",
            25,
            11,
            checkEntityTextOffset
          );
        });

        it("diacritics nfc", async function() {
          checkOffsetAndLength(
            client,
            "año SSN: 859-98-0987",
            "Utf16CodeUnit",
            9,
            11,
            checkEntityTextOffset
          );
        });

        it("diacritics nfd", async function() {
          checkOffsetAndLength(
            client,
            "año SSN: 859-98-0987",
            "Utf16CodeUnit",
            10,
            11,
            checkEntityTextOffset
          );
        });

        it("korean nfc", async function() {
          checkOffsetAndLength(
            client,
            "아가 SSN: 859-98-0987",
            "Utf16CodeUnit",
            8,
            11,
            checkEntityTextOffset
          );
        });

        it("korean nfd", async function() {
          checkOffsetAndLength(
            client,
            "아가 SSN: 859-98-0987",
            "Utf16CodeUnit",
            8,
            11,
            checkEntityTextOffset
          );
        });

        it("zalgo", async function() {
          checkOffsetAndLength(
            client,
            "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987",
            "Utf16CodeUnit",
            121,
            11,
            checkEntityTextOffset
          );
        });
      });
      describe("#UnicodeCodePoint", function() {
        it("emoji", async function() {
          checkOffsetAndLength(client, "👩 SSN: 859-98-0987", "UnicodeCodePoint", 7, 11); // offset was 8 with UTF16
        });

        it("emoji with skin tone modifier", async function() {
          checkOffsetAndLength(client, "👩🏻 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11); // offset was 10 with UTF16
        });

        it("family emoji", async function() {
          checkOffsetAndLength(client, "👩‍👩‍👧‍👧 SSN: 859-98-0987", "UnicodeCodePoint", 13, 11); // offset was 17 with UTF16
        });

        it("family emoji wit skin tone modifier", async function() {
          checkOffsetAndLength(client, "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987", "UnicodeCodePoint", 17, 11); // offset was 25 with UTF16
        });

        it("diacritics nfc", async function() {
          checkOffsetAndLength(client, "año SSN: 859-98-0987", "UnicodeCodePoint", 9, 11);
        });

        it("diacritics nfd", async function() {
          checkOffsetAndLength(client, "año SSN: 859-98-0987", "UnicodeCodePoint", 10, 11);
        });

        it("korean nfc", async function() {
          checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11);
        });

        it("korean nfd", async function() {
          checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11);
        });

        it("zalgo", async function() {
          checkOffsetAndLength(client, "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987", "UnicodeCodePoint", 121, 11);
        });
      });
      describe("#TextElements_v8", function() {
        it("emoji", async function() {
          checkOffsetAndLength(client, "👩 SSN: 859-98-0987", "TextElements_v8", 7, 11); // offset was 8 with UTF16
        });

        it("emoji with skin tone modifier", async function() {
          checkOffsetAndLength(client, "👩🏻 SSN: 859-98-0987", "TextElements_v8", 8, 11); // offset was 10 with UTF16
        });

        it("family emoji", async function() {
          checkOffsetAndLength(client, "👩‍👩‍👧‍👧 SSN: 859-98-0987", "TextElements_v8", 13, 11); // offset was 17 with UTF16
        });

        it("family emoji wit skin tone modifier", async function() {
          checkOffsetAndLength(client, "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987", "TextElements_v8", 17, 11); // offset was 25 with UTF16
        });

        it("diacritics nfc", async function() {
          checkOffsetAndLength(client, "año SSN: 859-98-0987", "TextElements_v8", 9, 11);
        });

        it("diacritics nfd", async function() {
          checkOffsetAndLength(client, "año SSN: 859-98-0987", "TextElements_v8", 9, 11); // offset was 10 with UTF16
        });

        it("korean nfc", async function() {
          checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "TextElements_v8", 8, 11);
        });

        it("korean nfd", async function() {
          checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "TextElements_v8", 8, 11);
        });

        it("zalgo", async function() {
          checkOffsetAndLength(client, "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987", "TextElements_v8", 9, 11); // offset was 121 with UTF16
        });
      });
    });
  });

  describe("LROs", function() {
    const pollingInterval = isPlaybackMode() ? 0 : 2000;

    before(function() {
      // eslint-disable-next-line no-invalid-this
      this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
    });

    describe("#analyze", function() {
      it("single entity recognition action", async function() {
        const docs = [
          { id: "1", language: "en", text: "Microsoft was founded by Bill Gates and Paul Allen" },
          { id: "2", language: "es", text: "Microsoft fue fundado por Bill Gates y Paul Allen" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const results = await poller.pollUntilDone();
        for await (const page of results) {
          const entitiesResult = page.recognizeEntitiesResults;
          if (entitiesResult.length === 1) {
            const action = entitiesResult[0];
            for (const result of action) {
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

      it("single key phrases action", async function() {
        const docs = [
          { id: "1", language: "en", text: "Microsoft was founded by Bill Gates and Paul Allen" },
          { id: "2", language: "es", text: "Microsoft fue fundado por Bill Gates y Paul Allen" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const results = await poller.pollUntilDone();
        for await (const page of results) {
          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult.length === 1) {
            const action = keyPhrasesResult[0];
            assert.equal(action.length, 2);
            for (const result of action) {
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

      it("single entities recognition action", async function() {
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

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          if (entitiesResult.length === 1) {
            const action = entitiesResult[0];
            assert.equal(action.length, 3);
            for (const doc of action) {
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

      it("single pii entities recognition action", async function() {
        const docs = [
          { id: "1", text: "My SSN is 859-98-0987." },
          {
            id: "2",
            text:
              "Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check."
          },
          { id: "3", text: "Is 998.214.865-68 your Brazilian CPF number?" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizePiiEntitiesResults;
          if (entitiesResult.length === 1) {
            const action = entitiesResult[0];
            assert.equal(action.length, 3);
            const doc1 = action[0];
            const doc2 = action[1];
            const doc3 = action[2];
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
            for (const doc of action) {
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

      it("bad request empty string", async function() {
        const docs = [""];
        try {
          const poller = await client.beginAnalyzeBatchActions(
            docs,
            {
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }]
            },
            "en",
            {
              updateIntervalInMs: pollingInterval
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
      it.skip("some documents with errors and multiple actions", async function() {
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

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          if (entitiesResult.length === 1) {
            const entitiesDocs = entitiesResult[0];
            assert.equal(entitiesDocs.length, 3);
            assert.isDefined(entitiesDocs[0].error);
            assert.isDefined(entitiesDocs[1].error);
            assert.isUndefined(entitiesDocs[2].error);
          } else {
            assert.fail("expected an array of entities results but did not get one.");
          }

          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          if (piiEntitiesResult.length === 1) {
            const piiEntitiesDocs = piiEntitiesResult[0];
            assert.equal(piiEntitiesDocs.length, 3);
            assert.isDefined(piiEntitiesDocs[0].error);
            assert.isDefined(piiEntitiesDocs[1].error);
            assert.isUndefined(piiEntitiesDocs[2].error);
          } else {
            assert.fail("expected an array of pii entities results but did not get one.");
          }

          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult.length === 1) {
            const keyPhrasesDocs = keyPhrasesResult[0];
            assert.equal(keyPhrasesDocs.length, 3);
            assert.isDefined(keyPhrasesDocs[0].error);
            assert.isDefined(keyPhrasesDocs[1].error);
            assert.isUndefined(keyPhrasesDocs[2].error);
          } else {
            assert.fail("expected an array of key phrases results but did not get one.");
          }
        }
      });

      /**
       * Analyze responds with an InvalidArgument error instead of an InvalidDocument one
       */
      it.skip("all documents with errors and multiple actions", async function() {
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

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          if (entitiesResult.length === 1) {
            const entitiesDocs = entitiesResult[0];
            assert.equal(entitiesDocs.length, 3);
            assert.isDefined(entitiesDocs[0].error);
            assert.isDefined(entitiesDocs[1].error);
            assert.isDefined(entitiesDocs[2].error);
          } else {
            assert.fail("expected an array of entities results but did not get one.");
          }

          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          if (piiEntitiesResult.length === 1) {
            const piiEntitiesDocs = piiEntitiesResult[0];
            assert.equal(piiEntitiesDocs.length, 3);
            assert.isDefined(piiEntitiesDocs[0].error);
            assert.isDefined(piiEntitiesDocs[1].error);
            assert.isDefined(piiEntitiesDocs[2].error);
          } else {
            assert.fail("expected an array of pii entities results but did not get one.");
          }

          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult && keyPhrasesResult.length === 1) {
            const keyPhrasesDocs = keyPhrasesResult[0];
            assert.equal(keyPhrasesDocs.length, 3);
            assert.isDefined(keyPhrasesDocs[0].error);
            assert.isDefined(keyPhrasesDocs[1].error);
            assert.isDefined(keyPhrasesDocs[2].error);
          } else {
            assert.fail("expected an array of key phrases results but did not get one.");
          }
        }
      });

      it("output order is same as the input's one with multiple actions", async function() {
        const docs = [
          { id: "1", text: "one" },
          { id: "2", text: "two" },
          { id: "3", text: "three" },
          { id: "4", text: "four" },
          { id: "5", text: "five" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          if (entitiesResult.length === 1) {
            const entitiesDocs = entitiesResult[0];
            assert.equal(entitiesDocs.length, 5);
            let i = 1;
            for (const doc of entitiesDocs) {
              assert.equal(parseInt(doc.id), i++);
            }
          } else {
            assert.fail("expected an array of entities results but did not get one.");
          }

          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          if (piiEntitiesResult.length === 1) {
            const piiEntitiesDocs = piiEntitiesResult[0];
            assert.equal(piiEntitiesDocs.length, 5);
            let i = 1;
            for (const doc of piiEntitiesDocs) {
              assert.equal(parseInt(doc.id), i++);
            }
          } else {
            assert.fail("expected an array of pii entities results but did not get one.");
          }

          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult.length === 1) {
            const keyPhrasesDocs = keyPhrasesResult[0];
            assert.equal(keyPhrasesDocs.length, 5);
            let i = 1;
            for (const doc of keyPhrasesDocs) {
              assert.equal(parseInt(doc.id), i++);
            }
          } else {
            assert.fail("expected an array of key phrases results but did not get one.");
          }
        }
      });

      it("out of order input IDs with multiple actions", async function() {
        const docs = [
          { id: "56", text: ":)" },
          { id: "0", text: ":(" },
          { id: "22", text: "w" },
          { id: "19", text: ":P" },
          { id: "1", text: ":D" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        const in_order = ["56", "0", "22", "19", "1"];
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          if (entitiesResult.length === 1) {
            const entitiesDocs = entitiesResult[0];
            assert.equal(entitiesDocs.length, 5);
            let i = 0;
            for (const doc of entitiesDocs) {
              assert.equal(doc.id, in_order[i++]);
            }
          } else {
            assert.fail("expected an array of entities results but did not get one.");
          }

          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          if (piiEntitiesResult.length === 1) {
            const piiEntitiesDocs = piiEntitiesResult[0];
            assert.equal(piiEntitiesDocs.length, 5);
            let i = 0;
            for (const doc of piiEntitiesDocs) {
              assert.equal(doc.id, in_order[i++]);
            }
          } else {
            assert.fail("expected an array of pii entities results but did not get one.");
          }

          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult.length === 1) {
            const keyPhrasesDocs = keyPhrasesResult[0];
            assert.equal(keyPhrasesDocs.length, 5);
            let i = 0;
            for (const doc of keyPhrasesDocs) {
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
      it.skip("statistics", async function() {
        const docs = [
          { id: "56", text: ":)" },
          { id: "0", text: ":(" },
          { id: "22", text: "" },
          { id: "19", text: ":P" },
          { id: "1", text: ":D" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          {
            includeStatistics: true,
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        assert.equal(result.statistics?.documentCount, 5);
        assert.equal(result.statistics?.transactionCount, 4);
        assert.equal(result.statistics?.validDocumentCount, 4);
        assert.equal(result.statistics?.erroneousDocumentCount, 1);
      });

      it("whole batch language hint", async function() {
        const docs = [
          "This was the best day of my life.",
          "I did not like the hotel we stayed at. It was too expensive.",
          "The restaurant was not as good as I hoped."
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          "en",
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          assert.equal(entitiesResult.length, 1);
          for (const entitiesDocs of entitiesResult) {
            assert.equal(entitiesDocs.length, 3);
            for (const doc of entitiesDocs) {
              assert.isUndefined(doc.error);
            }
          }
        }
      });

      it("whole batch with no language hint", async function() {
        const docs = [
          "This was the best day of my life.",
          "I did not like the hotel we stayed at. It was too expensive.",
          "The restaurant was not as good as I hoped."
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          "",
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          assert.equal(entitiesResult.length, 1);
          for (const entitiesDocs of entitiesResult) {
            assert.equal(entitiesDocs.length, 3);
            for (const doc of entitiesDocs) {
              assert.isUndefined(doc.error);
            }
          }
        }
      });

      it("each doc has a language hint", async function() {
        const docs = [
          { id: "1", language: "", text: "I will go to the park." },
          { id: "2", language: "", text: "I did not like the hotel we stayed at." },
          { id: "3", text: "The restaurant had really good food." }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          assert.equal(entitiesResult.length, 1);
          for (const entitiesDocs of entitiesResult) {
            assert.equal(entitiesDocs.length, 3);
            for (const doc of entitiesDocs) {
              assert.isUndefined(doc.error);
            }
          }
        }
      });

      it("whole batch input with a language hint", async function() {
        const docs = [
          { id: "1", text: "I will go to the park." },
          { id: "2", text: "Este es un document escrito en Español." },
          { id: "3", text: "猫は幸せ" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const entitiesResult = page.recognizeEntitiesResults;
          assert.equal(entitiesResult.length, 1);
          for (const entitiesDocs of entitiesResult) {
            assert.equal(entitiesDocs.length, 3);
            for (const doc of entitiesDocs) {
              assert.isUndefined(doc.error);
            }
          }
        }
      });

      it("invalid language hint", async function() {
        const docs = ["This should fail because we're passing in an invalid language hint"];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          "notalanguage",
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        const firstResult = (await result.next()).value;
        const entitiesTaskDocs = firstResult?.recognizeEntitiesResults[0];
        for (const doc of entitiesTaskDocs) {
          assert.equal(doc.error?.code, "UnsupportedLanguageCode");
        }
        const piiEntitiesTaskDocs = firstResult?.recognizePiiEntitiesResults[0];
        for (const doc of piiEntitiesTaskDocs) {
          assert.equal(doc.error?.code, "UnsupportedLanguageCode");
        }
        const keyPhrasesTaskDocs = firstResult?.extractKeyPhrasesResults[0];
        for (const doc of keyPhrasesTaskDocs) {
          assert.equal(doc.error?.code, "UnsupportedLanguageCode");
        }
      });

      it.skip("bad model", async function() {
        const docs = [
          {
            id: "1",
            language: "en",
            text: "This should fail because we're passing in an invalid language hint"
          }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "bad" }],
            recognizePiiEntitiesActions: [{ modelVersion: "bad" }],
            extractKeyPhrasesActions: [{ modelVersion: "bad" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        const firstResult = (await result.next()).value;
        const entitiesTaskDocs = firstResult?.recognizeEntitiesResults[0];
        for (const doc of entitiesTaskDocs) {
          assert.equal(doc.error?.code, "UnknownError");
        }
        const piiEntitiesTaskDocs = firstResult?.recognizePiiEntitiesResults[0];
        for (const doc of piiEntitiesTaskDocs) {
          assert.equal(doc.error?.code, "UnknownError");
        }
        const keyPhrasesTaskDocs = firstResult?.extractKeyPhrasesResults[0];
        for (const doc of keyPhrasesTaskDocs) {
          assert.equal(doc.error?.code, "UnknownError");
        }
      });

      it("paged results with custom page size", async function() {
        const totalDocs = 25;
        const docs = Array(totalDocs - 1).fill("random text");
        docs.push("Microsoft was founded by Bill Gates and Paul Allen");
        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizeEntitiesActions: [{ modelVersion: "latest" }],
            extractKeyPhrasesActions: [{ modelVersion: "latest" }]
          },
          "en",
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        let docCount = 0;
        let pageCount = 0;
        const pageSize = 10;
        for await (const page of result.byPage({ maxPageSize: pageSize })) {
          const entitiesTaskDocs = page.recognizeEntitiesResults[0];
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

      it("pii redacted test is not empty", async function() {
        const docs = [
          { id: "1", text: "I will go to the park." },
          { id: "2", text: "Este es un document escrito en Español." },
          { id: "3", text: "猫は幸せ" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          assert.equal(piiEntitiesResult.length, 1);
          for (const piiEntitiesDocs of piiEntitiesResult) {
            assert.equal(piiEntitiesDocs.length, 3);
            for (const doc of piiEntitiesDocs) {
              assert.isUndefined(doc.error);
              if (!doc.error) {
                assert.isNotEmpty(doc.redactedText);
              }
            }
          }
        }
      });

      it("operation metadata", async function() {
        const docs = [
          { id: "1", text: "I will go to the park." },
          { id: "2", text: "Este es un document escrito en Español." },
          { id: "3", text: "猫は幸せ" }
        ];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizePiiEntitiesActions: [{ modelVersion: "latest" }]
          },
          {
            updateIntervalInMs: pollingInterval,
            displayName: "testJob"
          }
        );
        poller.onProgress(() => {
          assert.ok(poller.getOperationState().createdOn, "createdOn is undefined!");
          assert.ok(poller.getOperationState().expiresOn, "expiresOn is undefined!");
          assert.ok(poller.getOperationState().lastModifiedOn, "lastModifiedOn is undefined!");
          assert.ok(poller.getOperationState().status, "status is undefined!");
          assert.ok(
            poller.getOperationState().actionsSucceededCount,
            "actionsSucceededCount is undefined!"
          );
          assert.equal(poller.getOperationState().actionsFailedCount, 0);
          assert.isDefined(
            poller.getOperationState().actionsInProgressCount,
            "actionsInProgressCount is undefined!"
          );
          assert.equal(poller.getOperationState().displayName, "testJob");
        });
        const result = await poller.pollUntilDone();
        assert.ok(result);
      });

      it("family emoji wit skin tone modifier", async function() {
        const poller = await client.beginAnalyzeBatchActions(
          [{ id: "0", text: "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987", language: "en" }],
          {
            recognizePiiEntitiesActions: [
              { modelVersion: "latest", stringIndexType: "UnicodeCodePoint" }
            ]
          },
          {
            updateIntervalInMs: pollingInterval,
            displayName: "testJob"
          }
        );
        const pollerResult = await poller.pollUntilDone();
        const firstResult = (await pollerResult.next()).value;
        const result = firstResult.recognizePiiEntitiesResults![0]![0];
        if (!result.error) {
          assert.equal(result.entities[0].offset, 17); // 25 with UTF16
          assert.equal(result.entities[0].length, 11);
          assert.equal(result.entities[0].text.length, result.entities[0].length);
        }
      });
    });
  });
});
