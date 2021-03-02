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
  Opinion,
  AssessmentSentiment,
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

      it("service has a bug when referencing assessments in doc #6 or greater", async function() {
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
          const Assessment1 = result1.sentences[0].opinions[0].assessments[0];
          const Assessment2 = result6.sentences[0].opinions[0].assessments[0];
          assert.notDeepEqual(Assessment1, Assessment2);

          const listAllAssessments = (acc: string[], sentence: SentenceSentiment): string[] =>
            acc.concat(
              sentence.opinions.reduce(
                (assessments: string[], opinion: Opinion) =>
                  assessments.concat(
                    opinion.assessments.map((assessment: AssessmentSentiment) => assessment.text)
                  ),
                []
              )
            );
          const allAssessments1 = result1.sentences.reduce(listAllAssessments, []);
          assert.deepEqual(allAssessments1, ["unacceptable"]);
          const allAssessments2 = result6.sentences.reduce(listAllAssessments, []);
          assert.deepEqual(allAssessments2, ["nice", "old", "dirty"]);
          const allAssessments7 = result7.sentences.reduce(listAllAssessments, []);
          assert.deepEqual(allAssessments7, ["smelled"]);
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
            assert.isEmpty(sentence.opinions)
          )
        );
      });

      it("client gets positive mined assessments", async function() {
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
          sentence.opinions?.map((opinion) => {
            const Target = opinion.target;
            assert.equal("design", Target.text);
            assert.equal("positive", Target.sentiment);
            assert.isAtLeast(Target.confidenceScores.positive, 0);
            assert.isAtLeast(Target.confidenceScores.negative, 0);
            assert.equal(Target.offset, 32);
            assert.equal(Target.length, 6);
            assert.equal(Target.text.length, Target.length);

            const sleekAssessment = opinion.assessments[0];
            assert.equal("sleek", sleekAssessment.text);
            assert.equal("positive", sleekAssessment.sentiment);
            assert.isAtLeast(sleekAssessment.confidenceScores.positive, 0);
            assert.isAtLeast(sleekAssessment.confidenceScores.positive, 0);
            assert.isFalse(sleekAssessment.isNegated);
            assert.equal(sleekAssessment.offset, 9);
            assert.equal(sleekAssessment.length, 5);
            assert.equal(sleekAssessment.text.length, sleekAssessment.length);

            const premiumAssessment = opinion.assessments[1];
            assert.equal("premium", premiumAssessment.text);
            assert.equal("positive", premiumAssessment.sentiment);
            assert.isAtLeast(premiumAssessment.confidenceScores.positive, 0);
            assert.isAtLeast(premiumAssessment.confidenceScores.positive, 0);
            assert.isFalse(premiumAssessment.isNegated);
            assert.equal(premiumAssessment.offset, 15);
            assert.equal(premiumAssessment.length, 7);
            assert.equal(premiumAssessment.text.length, premiumAssessment.length);
          })
        );
      });

      it("client gets negative mined assessments", async function() {
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
          const foodTarget = sentence.opinions?.[0].target;
          assert.equal("food", foodTarget?.text);
          assert.equal("negative", foodTarget?.sentiment);

          const foodTargetPositiveScore = foodTarget?.confidenceScores.positive!;
          const foodTargetNegativeScore = foodTarget?.confidenceScores.negative!;

          assert.isAtLeast(foodTargetPositiveScore, 0);
          assert.isAtLeast(foodTargetNegativeScore, 0);
          assert.equal(foodTargetPositiveScore + foodTargetNegativeScore, 1);

          const serviceTarget = sentence.opinions?.[1].target;
          assert.equal("service", serviceTarget?.text);
          assert.equal("negative", serviceTarget?.sentiment);

          const serviceTargetPositiveScore = serviceTarget?.confidenceScores.positive!;
          const serviceTargetNegativeScore = serviceTarget?.confidenceScores.negative!;

          assert.isAtLeast(serviceTargetPositiveScore, 0);
          assert.isAtLeast(serviceTargetNegativeScore, 0);
          assert.equal(serviceTargetPositiveScore + serviceTargetNegativeScore, 1);

          const foodAssessment = sentence.opinions?.[0].assessments[0];
          const serviceAssessment = sentence.opinions?.[1].assessments[0];

          assert.deepEqual(foodAssessment!, serviceAssessment!);

          assert.equal("good", foodAssessment?.text);
          assert.equal("negative", foodAssessment?.sentiment);

          const foodAssessmentPositiveScore = foodAssessment?.confidenceScores.positive!;
          const foodAssessmentNegativeScore = foodAssessment?.confidenceScores.negative!;

          assert.isAtLeast(foodAssessmentPositiveScore, 0);
          assert.isAtLeast(foodAssessmentNegativeScore, 0);
          assert.equal(foodAssessmentPositiveScore + foodAssessmentNegativeScore, 1);
          assert.isTrue(foodAssessment?.isNegated);
        });
      });

      it("client gets no mined assessments", async function() {
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
        assert.isEmpty(documentSentiment.sentences[0].opinions);
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
          assert.equal(result.entities.length, 2);
          assert.equal(result.entities[0].text, "Microsoft");
          assert.equal(result.entities[0].category, "Organization");
          assert.equal(result.entities[1].text, "333-333-3333");
          assert.equal(result.entities[1].category, "PhoneNumber");
          assert.equal(
            result.redactedText,
            "I work at ********* and my phone number is ************"
          );
        }
      });

      it("accepts pii categories", async function() {
        const [result] = await client.recognizePiiEntities(
          [
            {
              id: "0",
              text: "Patient name is Joe and SSN is 859-98-0987",
              language: "en"
            }
          ],
          { categoriesFilter: ["USSocialSecurityNumber"] }
        );
        if (!result.error) {
          assert.equal(result.entities.length, 1);
          assert.equal(result.entities[0].text, "859-98-0987");
          assert.equal(result.entities[0].category, "USSocialSecurityNumber");
          assert.equal(result.redactedText, "Patient name is Joe and SSN is ***********");
        }
      });

      it("output pii categories are accepted as input", async function() {
        const [result1] = await client.recognizePiiEntities([
          {
            id: "0",
            text: "Patient name is Joe and SSN is 859-98-0987",
            language: "en"
          }
        ]);
        if (!result1.error) {
          const entity2 = result1.entities[1];
          const [result2] = await client.recognizePiiEntities(
            [
              {
                id: "0",
                text: "Patient name is Joe and SSN is 859-98-0987",
                language: "en"
              }
            ],
            { categoriesFilter: [entity2.category] }
          );
          if (!result2.error) {
            assert.equal(result2.entities.length, 1);
            assert.equal(result2.entities[0].text, entity2.text);
            assert.equal(result2.entities[0].category, entity2.category);
            assert.equal(result2.redactedText, "Patient name is Joe and SSN is ***********");
          }
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
          await checkOffsetAndLength(
            client,
            "👩 SSN: 859-98-0987",
            "Utf16CodeUnit",
            8,
            11,
            checkEntityTextOffset
          );
        });

        it("emoji with skin tone modifier", async function() {
          await checkOffsetAndLength(
            client,
            "👩🏻 SSN: 859-98-0987",
            "Utf16CodeUnit",
            10,
            11,
            checkEntityTextOffset
          );
        });

        it("family emoji", async function() {
          await checkOffsetAndLength(
            client,
            "👩‍👩‍👧‍👧 SSN: 859-98-0987",
            "Utf16CodeUnit",
            17,
            11,
            checkEntityTextOffset
          );
        });

        it("family emoji wit skin tone modifier", async function() {
          await checkOffsetAndLength(
            client,
            "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
            "Utf16CodeUnit",
            25,
            11,
            checkEntityTextOffset
          );
        });

        it("diacritics nfc", async function() {
          await checkOffsetAndLength(
            client,
            "año SSN: 859-98-0987",
            "Utf16CodeUnit",
            9,
            11,
            checkEntityTextOffset
          );
        });

        it("diacritics nfd", async function() {
          await checkOffsetAndLength(
            client,
            "año SSN: 859-98-0987",
            "Utf16CodeUnit",
            10,
            11,
            checkEntityTextOffset
          );
        });

        it("korean nfc", async function() {
          await checkOffsetAndLength(
            client,
            "아가 SSN: 859-98-0987",
            "Utf16CodeUnit",
            8,
            11,
            checkEntityTextOffset
          );
        });

        it("korean nfd", async function() {
          await checkOffsetAndLength(
            client,
            "아가 SSN: 859-98-0987",
            "Utf16CodeUnit",
            8,
            11,
            checkEntityTextOffset
          );
        });

        it("zalgo", async function() {
          await checkOffsetAndLength(
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
          await checkOffsetAndLength(client, "👩 SSN: 859-98-0987", "UnicodeCodePoint", 7, 11); // offset was 8 with UTF16
        });

        it("emoji with skin tone modifier", async function() {
          await checkOffsetAndLength(client, "👩🏻 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11); // offset was 10 with UTF16
        });

        it("family emoji", async function() {
          await checkOffsetAndLength(client, "👩‍👩‍👧‍👧 SSN: 859-98-0987", "UnicodeCodePoint", 13, 11); // offset was 17 with UTF16
        });

        it("family emoji wit skin tone modifier", async function() {
          await checkOffsetAndLength(
            client,
            "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
            "UnicodeCodePoint",
            17,
            11
          ); // offset was 25 with UTF16
        });

        it("diacritics nfc", async function() {
          await checkOffsetAndLength(client, "año SSN: 859-98-0987", "UnicodeCodePoint", 9, 11);
        });

        it("diacritics nfd", async function() {
          await checkOffsetAndLength(client, "año SSN: 859-98-0987", "UnicodeCodePoint", 10, 11);
        });

        it("korean nfc", async function() {
          await checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11);
        });

        it("korean nfd", async function() {
          await checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11);
        });

        it("zalgo", async function() {
          await checkOffsetAndLength(client, "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987", "UnicodeCodePoint", 121, 11);
        });
      });
      describe("#TextElements_v8", function() {
        it("emoji", async function() {
          await checkOffsetAndLength(client, "👩 SSN: 859-98-0987", "TextElements_v8", 7, 11); // offset was 8 with UTF16
        });

        it("emoji with skin tone modifier", async function() {
          await checkOffsetAndLength(client, "👩🏻 SSN: 859-98-0987", "TextElements_v8", 8, 11); // offset was 10 with UTF16
        });

        it("family emoji", async function() {
          await checkOffsetAndLength(client, "👩‍👩‍👧‍👧 SSN: 859-98-0987", "TextElements_v8", 13, 11); // offset was 17 with UTF16
        });

        it("family emoji wit skin tone modifier", async function() {
          await checkOffsetAndLength(
            client,
            "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
            "TextElements_v8",
            17,
            11
          ); // offset was 25 with UTF16
        });

        it("diacritics nfc", async function() {
          await checkOffsetAndLength(client, "año SSN: 859-98-0987", "TextElements_v8", 9, 11);
        });

        it("diacritics nfd", async function() {
          await checkOffsetAndLength(client, "año SSN: 859-98-0987", "TextElements_v8", 9, 11); // offset was 10 with UTF16
        });

        it("korean nfc", async function() {
          await checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "TextElements_v8", 8, 11);
        });

        it("korean nfd", async function() {
          await checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "TextElements_v8", 8, 11);
        });

        it("zalgo", async function() {
          await checkOffsetAndLength(client, "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987", "TextElements_v8", 9, 11); // offset was 121 with UTF16
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
            if (!action.error) {
              for (const result of action.results) {
                if (!result.error) {
                  assert.ok(result.id);
                  assert.ok(result.entities);
                } else {
                  assert.fail("did not expect document errors but got one.");
                }
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
            if (!action.error) {
              assert.equal(action.results.length, 2);
              for (const result of action.results) {
                if (!result.error) {
                  assert.include(result.keyPhrases, "Paul Allen");
                  assert.include(result.keyPhrases, "Bill Gates");
                  assert.include(result.keyPhrases, "Microsoft");
                  assert.ok(result.id);
                }
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
            if (!action.error) {
              assert.equal(action.results.length, 3);
              for (const doc of action.results) {
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
            if (!action.error) {
              const actionResults = action.results;
              assert.equal(actionResults.length, 3);
              const doc1 = actionResults[0];
              const doc2 = actionResults[1];
              // const doc3 = actionResults[2];
              if (!doc1.error) {
                assert.equal(doc1.entities[0].text, "859-98-0987");
                assert.equal(doc1.entities[0].category, "USSocialSecurityNumber");
              }
              if (!doc2.error) {
                assert.equal(doc2.entities[0].text, "111000025");
                assert.equal(doc2.entities[1].category, "ABARoutingNumber");
              }
              // the service is not able to detect the brazil cpf number
              // if (!doc3.error) {
              //   assert.equal(doc3.entities[0].text, "998.214.865-68");
              //   assert.equal(doc3.entities[0].category, "Brazil CPF Number");
              // }
              for (const doc of actionResults) {
                if (!doc.error) {
                  for (const entity of doc.entities) {
                    assert.isDefined(entity.text);
                    assert.isDefined(entity.category);
                    assert.isDefined(entity.offset);
                    assert.isDefined(entity.confidenceScore);
                  }
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
            if (!entitiesDocs.error) {
              const entitiesDocsResults = entitiesDocs.results;
              assert.equal(entitiesDocsResults.length, 3);
              assert.isDefined(entitiesDocsResults[0].error);
              assert.isDefined(entitiesDocsResults[1].error);
              assert.isUndefined(entitiesDocsResults[2].error);
            }
          } else {
            assert.fail("expected an array of entities results but did not get one.");
          }

          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          if (piiEntitiesResult.length === 1) {
            const piiEntitiesDocs = piiEntitiesResult[0];
            if (!piiEntitiesDocs.error) {
              const piiEntitiesDocsResults = piiEntitiesDocs.results;
              assert.equal(piiEntitiesDocsResults.length, 3);
              assert.isDefined(piiEntitiesDocsResults[0].error);
              assert.isDefined(piiEntitiesDocsResults[1].error);
              assert.isUndefined(piiEntitiesDocsResults[2].error);
            }
          } else {
            assert.fail("expected an array of pii entities results but did not get one.");
          }

          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult.length === 1) {
            const keyPhrasesDocs = keyPhrasesResult[0];
            if (!keyPhrasesDocs.error) {
              const keyPhrasesDocsResults = keyPhrasesDocs.results;
              assert.equal(keyPhrasesDocsResults.length, 3);
              assert.isDefined(keyPhrasesDocsResults[0].error);
              assert.isDefined(keyPhrasesDocsResults[1].error);
              assert.isUndefined(keyPhrasesDocsResults[2].error);
            }
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
            if (!entitiesDocs.error) {
              const entitiesDocsResults = entitiesDocs.results;
              assert.equal(entitiesDocsResults.length, 3);
              assert.isDefined(entitiesDocsResults[0].error);
              assert.isDefined(entitiesDocsResults[1].error);
              assert.isDefined(entitiesDocsResults[2].error);
            }
          } else {
            assert.fail("expected an array of entities results but did not get one.");
          }

          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          if (piiEntitiesResult.length === 1) {
            const piiEntitiesDocs = piiEntitiesResult[0];
            if (!piiEntitiesDocs.error) {
              const piiEntitiesDocsResults = piiEntitiesDocs.results;
              assert.equal(piiEntitiesDocsResults.length, 3);
              assert.isDefined(piiEntitiesDocsResults[0].error);
              assert.isDefined(piiEntitiesDocsResults[1].error);
              assert.isDefined(piiEntitiesDocsResults[2].error);
            }
          } else {
            assert.fail("expected an array of pii entities results but did not get one.");
          }

          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult && keyPhrasesResult.length === 1) {
            const keyPhrasesDocs = keyPhrasesResult[0];
            if (!keyPhrasesDocs.error) {
              const keyPhrasesDocsResults = keyPhrasesDocs.results;
              assert.equal(keyPhrasesDocsResults.length, 3);
              assert.isDefined(keyPhrasesDocsResults[0].error);
              assert.isDefined(keyPhrasesDocsResults[1].error);
              assert.isDefined(keyPhrasesDocsResults[2].error);
            }
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
            if (!entitiesDocs.error) {
              assert.equal(entitiesDocs.results.length, 5);
              let i = 1;
              for (const doc of entitiesDocs.results) {
                assert.equal(parseInt(doc.id), i++);
              }
            }
          } else {
            assert.fail("expected an array of entities results but did not get one.");
          }

          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          if (piiEntitiesResult.length === 1) {
            const piiEntitiesDocs = piiEntitiesResult[0];
            if (!piiEntitiesDocs.error) {
              assert.equal(piiEntitiesDocs.results.length, 5);
              let i = 1;
              for (const doc of piiEntitiesDocs.results) {
                assert.equal(parseInt(doc.id), i++);
              }
            }
          } else {
            assert.fail("expected an array of pii entities results but did not get one.");
          }

          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult.length === 1) {
            const keyPhrasesDocs = keyPhrasesResult[0];
            if (!keyPhrasesDocs.error) {
              assert.equal(keyPhrasesDocs.results.length, 5);
              let i = 1;
              for (const doc of keyPhrasesDocs.results) {
                assert.equal(parseInt(doc.id), i++);
              }
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
            if (!entitiesDocs.error) {
              assert.equal(entitiesDocs.results.length, 5);
              let i = 0;
              for (const doc of entitiesDocs.results) {
                assert.equal(doc.id, in_order[i++]);
              }
            }
          } else {
            assert.fail("expected an array of entities results but did not get one.");
          }

          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          if (piiEntitiesResult.length === 1) {
            const piiEntitiesDocs = piiEntitiesResult[0];
            if (!piiEntitiesDocs.error) {
              assert.equal(piiEntitiesDocs.results.length, 5);
              let i = 0;
              for (const doc of piiEntitiesDocs.results) {
                assert.equal(doc.id, in_order[i++]);
              }
            }
          } else {
            assert.fail("expected an array of pii entities results but did not get one.");
          }

          const keyPhrasesResult = page.extractKeyPhrasesResults;
          if (keyPhrasesResult.length === 1) {
            const keyPhrasesDocs = keyPhrasesResult[0];
            if (!keyPhrasesDocs.error) {
              assert.equal(keyPhrasesDocs.results.length, 5);
              let i = 0;
              for (const doc of keyPhrasesDocs.results) {
                assert.equal(doc.id, in_order[i++]);
              }
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
            if (!entitiesDocs.error) {
              assert.equal(entitiesDocs.results.length, 3);
              for (const doc of entitiesDocs.results) {
                assert.isUndefined(doc.error);
              }
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
            if (!entitiesDocs.error) {
              assert.equal(entitiesDocs.results.length, 3);
              for (const doc of entitiesDocs.results) {
                assert.isUndefined(doc.error);
              }
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
            if (!entitiesDocs.error) {
              assert.equal(entitiesDocs.results.length, 3);
              for (const doc of entitiesDocs.results) {
                assert.isUndefined(doc.error);
              }
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
            if (!entitiesDocs.error) {
              assert.equal(entitiesDocs.results.length, 3);
              for (const doc of entitiesDocs.results) {
                assert.isUndefined(doc.error);
              }
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
        if (!entitiesTaskDocs.error) {
          for (const doc of entitiesTaskDocs.results) {
            assert.equal(doc.error?.code, "UnsupportedLanguageCode");
          }
        }
        const piiEntitiesTaskDocs = firstResult?.recognizePiiEntitiesResults[0];
        if (!piiEntitiesTaskDocs.error) {
          for (const doc of piiEntitiesTaskDocs.results) {
            assert.equal(doc.error?.code, "UnsupportedLanguageCode");
          }
        }
        const keyPhrasesTaskDocs = firstResult?.extractKeyPhrasesResults[0];
        if (!keyPhrasesTaskDocs.error) {
          for (const doc of keyPhrasesTaskDocs.results) {
            assert.equal(doc.error?.code, "UnsupportedLanguageCode");
          }
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
        if (!entitiesTaskDocs.error) {
          for (const doc of entitiesTaskDocs.results) {
            assert.equal(doc.error?.code, "UnknownError");
          }
        }
        const piiEntitiesTaskDocs = firstResult?.recognizePiiEntitiesResults[0];
        if (!piiEntitiesTaskDocs.error) {
          for (const doc of piiEntitiesTaskDocs.results) {
            assert.equal(doc.error?.code, "UnknownError");
          }
        }
        const keyPhrasesTaskDocs = firstResult?.extractKeyPhrasesResults[0];
        if (!keyPhrasesTaskDocs.error) {
          for (const doc of keyPhrasesTaskDocs.results) {
            assert.equal(doc.error?.code, "UnknownError");
          }
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
          if (!entitiesTaskDocs.error) {
            for (const doc of entitiesTaskDocs.results) {
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
            if (!piiEntitiesDocs.error) {
              assert.equal(piiEntitiesDocs.results.length, 3);
              for (const doc of piiEntitiesDocs.results) {
                assert.isUndefined(doc.error);
                if (!doc.error) {
                  assert.isNotEmpty(doc.redactedText);
                }
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
            updateIntervalInMs: pollingInterval
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
            updateIntervalInMs: pollingInterval
          }
        );
        const pollerResult = await poller.pollUntilDone();
        const firstResult = (await pollerResult.next()).value;
        const actionResult = firstResult.recognizePiiEntitiesResults[0];
        if (!actionResult.error) {
          const docResult = actionResult.results[0];
          if (!docResult.error) {
            assert.equal(docResult.entities[0].offset, 17); // 25 with UTF16
            assert.equal(docResult.entities[0].length, 11);
            assert.equal(docResult.entities[0].text.length, docResult.entities[0].length);
          }
        }
      });

      it("action failures are returned", async function() {
        const docs = [{ id: "1", text: "I will go to the park." }];

        const poller = await client.beginAnalyzeBatchActions(
          docs,
          {
            recognizePiiEntitiesActions: [
              { modelVersion: "bad" },
              { modelVersion: "latest" },
              { modelVersion: "bad", stringIndexType: "TextElements_v8" }
            ]
          },
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const page of result) {
          const piiEntitiesResult = page.recognizePiiEntitiesResults;
          assert.equal(piiEntitiesResult.length, 3);
          assert.isDefined(piiEntitiesResult[0].error);
          assert.isUndefined(piiEntitiesResult[1].error);
          assert.isDefined(piiEntitiesResult[2].error);
        }
      });
    });
  });
});
