// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { assert, use as chaiUse } from "chai";
import { Context, Suite } from "mocha";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { matrix } from "@azure-tools/test-utils";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";

import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient";
import {
  AnalyzeSentimentResultArray,
  AnalyzeSentimentSuccessResult,
  AssessmentSentiment,
  DetectLanguageInput,
  DetectLanguageSuccessResult,
  Opinion,
  PiiEntityDomain,
  SentenceSentiment,
  TextAnalyticsClient,
  TextDocumentInput,
} from "../../src";
import { assertAllSuccess, assertRestError, isSuccess } from "./utils/resultHelper";
import { checkEntityTextOffset, checkOffsetAndLength } from "./utils/stringIndexTypeHelpers";

const testDataEn = [
  "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
  "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
  "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
  "I didn't like the last book I read at all.",
];

const testDataEs = [
  "Los caminos que llevan hasta Monte Rainier son espectaculares y hermosos.",
  "La carretera estaba atascada. Había mucho tráfico el día de ayer.",
];

matrix([["AAD", "APIKey"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] TextAnalyticsClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: TextAnalyticsClient;
    const CLITimeout = this.timeout();
    const fastTimeout = 10000;

    let getId: () => string;

    beforeEach(async function (this: Context) {
      recorder = await startRecorder(this.currentTest);
      client = createClient({ authMethod, recorder });
      let nextId = 0;
      getId = function () {
        nextId += 1;
        return nextId.toString();
      };
    });

    afterEach(async function () {
      await recorder.stop();
    });

    describe("fast tests", function () {
      before(function (this: Context) {
        this.timeout(fastTimeout);
      });

      describe("#analyzeSentiment", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(client.analyzeSentiment([]), /non-empty array/);
        });

        it("client accepts string[] and language", async function () {
          const results = await client.analyzeSentiment(testDataEn, "en");
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.analyzeSentiment(testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("service returns error for invalid language", async function () {
          const [result] = await client.analyzeSentiment(["Hello world!"], "notalanguage");
          if (result.error === undefined) {
            assert.fail("Expected an error from the service.");
          }
          assert.equal(result.error.code, "UnsupportedLanguageCode");
        });

        it("service has a bug when referencing assessments in doc #6 or greater", async function () {
          const documents = [
            "The food was unacceptable",
            "The rooms were beautiful. The AC was good and quiet.",
            "The breakfast was good, but the toilet was smelly.",
            "Loved this hotel - good breakfast - nice shuttle service - clean rooms.",
            "I had a great unobstructed view of the Microsoft campus.",
            "Nice rooms but bathrooms were old and the toilet was dirty when we arrived.",
            "The toilet smelled.",
          ];
          const results = await client.analyzeSentiment(documents, "en", {
            includeOpinionMining: true,
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
                      opinion.assessments.map((assessment: AssessmentSentiment) => assessment.text),
                    ),
                  [],
                ),
              );
            const allAssessments1 = result1.sentences.reduce(listAllAssessments, []);
            assert.deepEqual(allAssessments1, ["unacceptable"]);
            const allAssessments2 = result6.sentences.reduce(listAllAssessments, []);
            assert.deepEqual(allAssessments2, ["Nice", "old", "dirty"]);
            const allAssessments7 = result7.sentences.reduce(listAllAssessments, []);
            assert.deepEqual(allAssessments7, ["smelled"]);
          }
        });

        it("service returns an error for an empty document", async function () {
          const data = [...testDataEn];
          data.splice(1, 0, "");
          const results = await client.analyzeSentiment(data);
          const errorResult = results[1];
          if (errorResult.error === undefined) {
            assert.fail("Expected an error from the service");
          }
          assert.equal(
            results.filter((result) => result.error === undefined).length,
            testDataEn.length,
          );
          assert.equal(errorResult.error.code, "InvalidDocument");
        });

        it("client accepts TextDocumentInput[]", async function () {
          const enInputs = testDataEn.map(
            (text): TextDocumentInput => ({
              id: getId(),
              language: "en",
              text,
            }),
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              language: "es",
              text,
            }),
          );
          const allInputs = enInputs.concat(esInputs);
          const results = await client.analyzeSentiment(allInputs);
          assert.equal(results.length, testDataEn.length + testDataEs.length);
          assertAllSuccess(results);
          results.map((result) =>
            (result as AnalyzeSentimentSuccessResult).sentences.map((sentence) =>
              assert.isEmpty(sentence.opinions),
            ),
          );
        });

        it("client gets positive mined assessments", async function () {
          const documents = [
            {
              text: "It has a sleek premium aluminum design that makes it beautiful to look at.",
              id: "0",
              language: "en",
            },
          ];
          const results: AnalyzeSentimentResultArray = await client.analyzeSentiment(documents, {
            includeOpinionMining: true,
          });
          assert.equal(results.length, 1);
          assertAllSuccess(results);
          const documentSentiment: AnalyzeSentimentSuccessResult =
            results[0] as AnalyzeSentimentSuccessResult;
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

              const beautifulAssessment = opinion.assessments[1];
              assert.equal("beautiful", beautifulAssessment.text);
              assert.equal("positive", beautifulAssessment.sentiment);
              assert.isAtLeast(beautifulAssessment.confidenceScores.positive, 0);
              assert.isAtLeast(beautifulAssessment.confidenceScores.positive, 0);
              assert.isFalse(beautifulAssessment.isNegated);
              assert.equal(beautifulAssessment.offset, 53);
              assert.equal(beautifulAssessment.length, 9);
              assert.equal(beautifulAssessment.text.length, beautifulAssessment.length);
            }),
          );
        });

        it.skip("client gets negative mined assessments", async function () {
          const documents = [
            {
              text: "The food and service is not good",
              id: "0",
              language: "en",
            },
          ];
          const results: AnalyzeSentimentResultArray = await client.analyzeSentiment(documents, {
            includeOpinionMining: true,
          });
          assert.equal(results.length, 1);
          assertAllSuccess(results);
          const documentSentiment: AnalyzeSentimentSuccessResult =
            results[0] as AnalyzeSentimentSuccessResult;
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

        it("client gets no mined assessments", async function () {
          const documents = [
            {
              text: "today is a hot day",
              id: "0",
              language: "en",
            },
          ];
          const results: AnalyzeSentimentResultArray = await client.analyzeSentiment(documents, {
            includeOpinionMining: true,
          });
          assert.equal(results.length, 1);
          assertAllSuccess(results);
          const documentSentiment: AnalyzeSentimentSuccessResult =
            results[0] as AnalyzeSentimentSuccessResult;
          assert.isEmpty(documentSentiment.sentences[0].opinions);
        });
      });

      describe("#detectLanguage", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(client.detectLanguage([]), /non-empty array/);
        });

        it("client accepts no countryHint", async function () {
          const results = await client.detectLanguage(testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts a countryHint", async function () {
          const results = await client.detectLanguage(["impossible"], "fr");
          assert.equal(results.length, 1);
          assertAllSuccess(results);
        });

        it('client accepts "none" country hint with string[] input', async function () {
          const results = await client.detectLanguage(
            ["I use Azure Functions to develop my service."],
            "none",
          );
          assert.equal(results.length, 1);
          assertAllSuccess(results);
          const result = results[0] as DetectLanguageSuccessResult;
          assert.equal(result.primaryLanguage.iso6391Name, "en");
        });

        it('client accepts "none" country hint with DetectLanguageInput[] input', async function () {
          const results = await client.detectLanguage(
            testDataEn.concat(testDataEs).map(
              (input): DetectLanguageInput => ({
                id: getId(),
                countryHint: "none",
                text: input,
              }),
            ),
          );
          assertAllSuccess(results);
        });

        it("service errors on invalid country hint", async function () {
          const [result] = await client.detectLanguage(["hello"], "invalidcountry");
          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, "InvalidCountryHint");
        });

        it("client accepts mixed-country DetectLanguageInput[]", async function () {
          const enInputs = testDataEn.map(
            (text): DetectLanguageInput => ({
              id: getId(),
              text,
            }),
          );
          const esInputs = testDataEs.map(
            (text): DetectLanguageInput => ({
              id: getId(),
              countryHint: "mx",
              text,
            }),
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.detectLanguage(allInputs);
          assert.equal(results.length, testDataEn.length + testDataEs.length);
          assertAllSuccess(results);
        });
      });

      describe("#recognizeEntities", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(client.recognizeEntities([]), /non-empty array/);
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.recognizeEntities(testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with a language specified", async function () {
          const results = await client.recognizeEntities(testDataEn, "en");
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.recognizeEntities(
            ["This is some text, but it doesn't matter."],
            "notalanguage",
          );

          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, "UnsupportedLanguageCode");
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const enInputs = testDataEn.slice(0, -1).map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            }),
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            }),
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.recognizeEntities(allInputs);
          assert.equal(results.length, testDataEn.length - 1 + testDataEs.length);
          assertAllSuccess(results);
        });

        it("client throws exception for too many inputs", async function () {
          const enInputs = testDataEn.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            }),
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            }),
          );
          const allInputs = enInputs.concat(esInputs);
          await assertRestError(client.recognizeEntities(allInputs), {
            messagePattern: /Max 5 records are permitted/,
            code: "InvalidDocumentBatch",
            statusCode: 400,
          });
        });
      });

      describe("#extractKeyPhrases", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(client.extractKeyPhrases([]), /non-empty array/);
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.extractKeyPhrases(testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with a language specified", async function () {
          const results = await client.extractKeyPhrases(testDataEn, "en");
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.extractKeyPhrases(
            ["This is some text, but it doesn't matter."],
            "notalanguage",
          );

          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, "UnsupportedLanguageCode");
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const enInputs = testDataEn.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            }),
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            }),
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.extractKeyPhrases(allInputs);
          assert.equal(results.length, testDataEn.length + testDataEs.length);
          assertAllSuccess(results);
        });
      });

      describe("#recognizePiiEntities", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(client.recognizePiiEntities([]));
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.recognizePiiEntities(testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with a language specified", async function () {
          const results = await client.recognizePiiEntities(testDataEn, "en");
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client correctly reports recognition of PII-like pattern", async function () {
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

        it("service errors on unsupported language", async function () {
          const [result] = await client.recognizePiiEntities(
            ["This is some text, but it doesn't matter."],
            "notalanguage",
          );

          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, "UnsupportedLanguageCode");
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const sliceSize = 3;
          const enInputs = testDataEn.slice(0, sliceSize).map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            }),
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            }),
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.recognizePiiEntities(allInputs);
          assert.equal(results.length, sliceSize + testDataEs.length);
          // TA NER public preview currently supports only english
          assert.ok(results.slice(0, sliceSize).every(isSuccess));
        });

        it("accepts domain filter", async function () {
          const [result] = await client.recognizePiiEntities(
            [
              {
                id: "0",
                text: "I work at Microsoft and my phone number is 333-333-3333",
                language: "en",
              },
            ],
            { domainFilter: PiiEntityDomain.PROTECTED_HEALTH_INFORMATION },
          );
          if (!result.error) {
            assert.equal(result.entities.length, 2);
            assert.equal(result.entities[0].text, "Microsoft");
            assert.equal(result.entities[0].category, "Organization");
            assert.equal(result.entities[1].text, "333-333-3333");
            assert.equal(result.entities[1].category, "PhoneNumber");
            assert.equal(
              result.redactedText,
              "I work at ********* and my phone number is ************",
            );
          }
        });

        it("accepts pii categories", async function () {
          const [result] = await client.recognizePiiEntities(
            [
              {
                id: "0",
                text: "Patient name is Joe and SSN is 859-98-0987",
                language: "en",
              },
            ],
            { categoriesFilter: ["USSocialSecurityNumber"] },
          );
          if (!result.error) {
            assert.equal(result.entities.length, 1);
            assert.equal(result.entities[0].text, "859-98-0987");
            assert.equal(result.entities[0].category, "USSocialSecurityNumber");
            assert.equal(result.redactedText, "Patient name is Joe and SSN is ***********");
          }
        });

        it("output pii categories are accepted as input", async function () {
          const [result1] = await client.recognizePiiEntities([
            {
              id: "0",
              text: "Patient name is Joe and SSN is 859-98-0987",
              language: "en",
            },
          ]);
          if (!result1.error) {
            const entity2 = result1.entities[1];
            const [result2] = await client.recognizePiiEntities(
              [
                {
                  id: "0",
                  text: "Patient name is Joe and SSN is 859-98-0987",
                  language: "en",
                },
              ],
              { categoriesFilter: [entity2.category] },
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

      describe("#recognizeLinkedEntities", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(client.recognizeLinkedEntities([]), /non-empty array/);
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.recognizeLinkedEntities(testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with a language specified", async function () {
          const results = await client.recognizeLinkedEntities(testDataEn, "en");
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.recognizeLinkedEntities(
            ["This is some text, but it doesn't matter."],
            "notalanguage",
          );

          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, "UnsupportedLanguageCode");
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const enInputs = testDataEn.slice(0, -1).map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            }),
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            }),
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.recognizeLinkedEntities(allInputs);
          assert.equal(results.length, testDataEn.length - 1 + testDataEs.length);
          assertAllSuccess(results);
        });

        it("client throws exception for too many inputs", async function () {
          const enInputs = testDataEn.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            }),
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            }),
          );
          const allInputs = enInputs.concat(esInputs);
          await assertRestError(client.recognizeEntities(allInputs), {
            code: "InvalidDocumentBatch",
            messagePattern: /Max 5 records are permitted/,
            statusCode: 400,
          });
        });
      });

      describe("#String encoding", function () {
        describe("#Default encoding (utf16CodeUnit)", function () {
          it("emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩 SSN: 859-98-0987",
              "Utf16CodeUnit",
              8,
              11,
              checkEntityTextOffset,
            );
          });

          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻 SSN: 859-98-0987",
              "Utf16CodeUnit",
              10,
              11,
              checkEntityTextOffset,
            );
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩‍👩‍👧‍👧 SSN: 859-98-0987",
              "Utf16CodeUnit",
              17,
              11,
              checkEntityTextOffset,
            );
          });

          it("family emoji with skin tone modifier", async function (this: Context) {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              "Utf16CodeUnit",
              25,
              11,
              checkEntityTextOffset,
            );
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              "Utf16CodeUnit",
              9,
              11,
              checkEntityTextOffset,
            );
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              "Utf16CodeUnit",
              10,
              11,
              checkEntityTextOffset,
            );
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              "Utf16CodeUnit",
              8,
              11,
              checkEntityTextOffset,
            );
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              "Utf16CodeUnit",
              8,
              11,
              checkEntityTextOffset,
            );
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(
              client,
              "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987",
              "Utf16CodeUnit",
              121,
              11,
              checkEntityTextOffset,
            );
          });
        });
        describe("#UnicodeCodePoint", function () {
          it("emoji", async function () {
            await checkOffsetAndLength(client, "👩 SSN: 859-98-0987", "UnicodeCodePoint", 7, 11); // offset was 8 with UTF16
          });

          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(client, "👩🏻 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11); // offset was 10 with UTF16
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(client, "👩‍👩‍👧‍👧 SSN: 859-98-0987", "UnicodeCodePoint", 13, 11); // offset was 17 with UTF16
          });

          it("family emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              "UnicodeCodePoint",
              17,
              11,
            ); // offset was 25 with UTF16
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(client, "año SSN: 859-98-0987", "UnicodeCodePoint", 9, 11);
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(client, "año SSN: 859-98-0987", "UnicodeCodePoint", 10, 11);
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11);
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "UnicodeCodePoint", 8, 11);
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(client, "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987", "UnicodeCodePoint", 121, 11);
          });
        });
        describe("#TextElement_v8", function () {
          it("emoji", async function () {
            await checkOffsetAndLength(client, "👩 SSN: 859-98-0987", "TextElement_v8", 7, 11); // offset was 8 with UTF16
          });

          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(client, "👩🏻 SSN: 859-98-0987", "TextElement_v8", 7, 11); // offset was 10 with UTF16
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(client, "👩‍👩‍👧‍👧 SSN: 859-98-0987", "TextElement_v8", 7, 11); // offset was 17 with UTF16
          });

          it("family emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              "TextElement_v8",
              7,
              11,
            ); // offset was 25 with UTF16
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(client, "año SSN: 859-98-0987", "TextElement_v8", 9, 11);
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(client, "año SSN: 859-98-0987", "TextElement_v8", 9, 11); // offset was 10 with UTF16
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "TextElement_v8", 8, 11);
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(client, "아가 SSN: 859-98-0987", "TextElement_v8", 8, 11);
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(client, "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987", "TextElement_v8", 9, 11); // offset was 121 with UTF16
          });
        });
      });
    });

    describe("LROs", function () {
      const pollingInterval = isPlaybackMode() ? 0 : 2000;

      before(function (this: Context) {
        this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
      });

      describe("#analyze", function () {
        it("single entity recognition action", async function () {
          const docs = [
            { id: "1", language: "en", text: "Microsoft was founded by Bill Gates and Paul Allen" },
            { id: "2", language: "es", text: "Microsoft fue fundado por Bill Gates y Paul Allen" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("single key phrases action", async function () {
          const docs = [
            { id: "1", language: "en", text: "Microsoft was founded by Bill Gates and Paul Allen" },
            { id: "2", language: "es", text: "Microsoft fue fundado por Bill Gates y Paul Allen" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("single entities recognition action", async function () {
          const docs = [
            {
              id: "1",
              text: "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975.",
              language: "en",
            },
            {
              id: "2",
              text: "Microsoft fue fundado por Bill Gates y Paul Allen el 4 de abril de 1975.",
              language: "es",
            },
            {
              id: "3",
              text: "Microsoft wurde am 4. April 1975 von Bill Gates und Paul Allen gegründet.",
              language: "de",
            },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("single entities linking action", async function () {
          const docs = [
            "Microsoft moved its headquarters to Bellevue, Washington in January 1979.",
            "Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.",
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeLinkedEntitiesActions: [{}],
            },
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          const result = await poller.pollUntilDone();
          for await (const page of result) {
            const entitiesResult = page.recognizeLinkedEntitiesResults;
            if (entitiesResult.length === 1) {
              const action = entitiesResult[0];
              if (!action.error) {
                assert.equal(action.results.length, 2);
                for (const doc of action.results) {
                  if (!doc.error) {
                    assert.notEqual(doc.entities.length, 0);
                    for (const entity of doc.entities) {
                      assert.isDefined(entity.name);
                      assert.isDefined(entity.url);
                      assert.isDefined(entity.dataSource);
                      assert.isDefined(entity.dataSourceEntityId);
                    }
                  }
                }
              }
            } else {
              assert.fail("expected an array of entity linking results but did not get one.");
            }
          }
        });

        it("single pii entities recognition action", async function () {
          const docs = [
            { id: "1", text: "My SSN is 859-98-0987." },
            {
              id: "2",
              text: "Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
            },
            { id: "3", text: "Is 998.214.865-68 your Brazilian CPF number?" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("single pii entities recognition action with categories filtered", async function () {
          const docs = [
            {
              id: "1",
              text: "My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
            },
            {
              id: "2",
              text: "Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
            },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizePiiEntitiesActions: [
                { modelVersion: "latest", categoriesFilter: ["USSocialSecurityNumber"] },
              ],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          const result = await poller.pollUntilDone();
          for await (const page of result) {
            const entitiesResult = page.recognizePiiEntitiesResults;
            if (entitiesResult.length === 1) {
              const action = entitiesResult[0];
              if (!action.error) {
                const actionResults = action.results;
                assert.equal(actionResults.length, 2);
                const doc1 = actionResults[0];
                const doc2 = actionResults[1];
                if (!doc1.error) {
                  assert.equal(doc1.entities.length, 1);
                  assert.equal(doc1.entities[0].text, "859-98-0987");
                  assert.equal(doc1.entities[0].category, "USSocialSecurityNumber");
                }
                if (!doc2.error) {
                  assert.equal(doc2.entities.length, 0);
                }
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

        it("single sentiment analysis action", async function () {
          const docs = [
            "The food was unacceptable",
            "The rooms were beautiful. The AC was good and quiet.",
            "The breakfast was good, but the toilet was smelly.",
            "Loved this hotel - good breakfast - nice shuttle service - clean rooms.",
            "I had a great unobstructed view of the Microsoft campus.",
            "Nice rooms but bathrooms were old and the toilet was dirty when we arrived.",
            "The toilet smelled.",
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              analyzeSentimentActions: [{ includeOpinionMining: true }],
            },
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          const result = await poller.pollUntilDone();
          for await (const page of result) {
            const entitiesResult = page.analyzeSentimentResults;
            if (entitiesResult.length === 1) {
              const action = entitiesResult[0];
              if (!action.error) {
                const actionResults = action.results;
                assert.equal(actionResults.length, 7);
                const result1 = actionResults[0];
                const result6 = actionResults[5];
                const result7 = actionResults[6];
                if (
                  result1.error === undefined &&
                  result6.error === undefined &&
                  result7.error === undefined
                ) {
                  const Assessment1 = result1.sentences[0].opinions[0].assessments[0];
                  const Assessment2 = result6.sentences[0].opinions[0].assessments[0];
                  assert.notDeepEqual(Assessment1, Assessment2);

                  const listAllAssessments = (
                    acc: string[],
                    sentence: SentenceSentiment,
                  ): string[] =>
                    acc.concat(
                      sentence.opinions.reduce(
                        (assessments: string[], opinion: Opinion) =>
                          assessments.concat(
                            opinion.assessments.map(
                              (assessment: AssessmentSentiment) => assessment.text,
                            ),
                          ),
                        [],
                      ),
                    );
                  const allAssessments1 = result1.sentences.reduce(listAllAssessments, []);
                  assert.deepEqual(allAssessments1, ["unacceptable"]);
                  const allAssessments2 = result6.sentences.reduce(listAllAssessments, []);
                  assert.deepEqual(allAssessments2, ["Nice", "old", "dirty"]);
                  const allAssessments7 = result7.sentences.reduce(listAllAssessments, []);
                  assert.deepEqual(allAssessments7, ["smelled"]);
                }
              }
            }
          }
        });

        it("bad request empty string", async function () {
          const docs = [""];
          await assertRestError(
            client.beginAnalyzeActions(
              docs,
              {
                recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              },
              "en",
              {
                updateIntervalInMs: pollingInterval,
              },
            ),
            {
              statusCode: 400,
            },
          );
        });

        it("some documents with errors and multiple actions", async function () {
          const docs = [
            { id: "1", language: "", text: "" },
            {
              id: "2",
              language: "english",
              text: "I did not like the hotel we stayed at. It was too expensive.",
            },
            {
              id: "3",
              language: "en",
              text: "The restaurant had really good food. I recommend you try it.",
            },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("all documents with errors and multiple actions", async function () {
          const docs = [
            { id: "1", language: "", text: "" },
            {
              id: "2",
              language: "english",
              text: "I did not like the hotel we stayed at. It was too expensive.",
            },
            {
              id: "3",
              language: "en",
              text: "",
            },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("output order is same as the input's one with multiple actions", async function () {
          const docs = [
            { id: "1", text: "one" },
            { id: "2", text: "two" },
            { id: "3", text: "three" },
            { id: "4", text: "four" },
            { id: "5", text: "five" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("out of order input IDs with multiple actions", async function () {
          const docs = [
            { id: "56", text: ":)" },
            { id: "0", text: ":(" },
            { id: "22", text: "w" },
            { id: "19", text: ":P" },
            { id: "1", text: ":D" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        // the service's statistics says the number of documents is 6 instead of 5.
        it.skip("statistics", async function () {
          const docs = [
            { id: "56", text: ":)" },
            { id: "0", text: ":(" },
            { id: "22", text: "" },
            { id: "19", text: ":P" },
            { id: "1", text: ":D" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            {
              includeStatistics: true,
              updateIntervalInMs: pollingInterval,
            },
          );
          const response = await poller.pollUntilDone();
          const results = (await response.next()).value;
          const recognizeEntitiesResults = results.recognizeEntitiesResults[0];
          if (!recognizeEntitiesResults.error) {
            assert.equal(recognizeEntitiesResults.results.statistics?.documentCount, 5);
            assert.equal(recognizeEntitiesResults.results.statistics?.transactionCount, 4);
            assert.equal(recognizeEntitiesResults.results.statistics?.validDocumentCount, 4);
            assert.equal(recognizeEntitiesResults.results.statistics?.erroneousDocumentCount, 1);
          }
          const recognizePiiEntitiesResults = results.recognizePiiEntitiesResults[0];
          if (!recognizePiiEntitiesResults.error) {
            assert.equal(recognizePiiEntitiesResults.results.statistics?.documentCount, 5);
            assert.equal(recognizePiiEntitiesResults.results.statistics?.transactionCount, 4);
            assert.equal(recognizePiiEntitiesResults.results.statistics?.validDocumentCount, 4);
            assert.equal(recognizePiiEntitiesResults.results.statistics?.erroneousDocumentCount, 1);
          }
          const extractKeyPhrasesResults = results.extractKeyPhrasesResults[0];
          if (!extractKeyPhrasesResults.error) {
            assert.equal(extractKeyPhrasesResults.results.statistics?.documentCount, 5);
            assert.equal(extractKeyPhrasesResults.results.statistics?.transactionCount, 4);
            assert.equal(extractKeyPhrasesResults.results.statistics?.validDocumentCount, 4);
            assert.equal(extractKeyPhrasesResults.results.statistics?.erroneousDocumentCount, 1);
          }
        });

        it("whole batch language hint", async function () {
          const docs = [
            "This was the best day of my life.",
            "I did not like the hotel we stayed at. It was too expensive.",
            "The restaurant was not as good as I hoped.",
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("whole batch with no language hint", async function () {
          const docs = [
            "This was the best day of my life.",
            "I did not like the hotel we stayed at. It was too expensive.",
            "The restaurant was not as good as I hoped.",
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            "",
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("each doc has a language hint", async function () {
          const docs = [
            { id: "1", language: "", text: "I will go to the park." },
            { id: "2", language: "", text: "I did not like the hotel we stayed at." },
            { id: "3", text: "The restaurant had really good food." },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("whole batch input with a language hint", async function () {
          const docs = [
            { id: "1", text: "I will go to the park." },
            { id: "2", text: "Este es un document escrito en Español." },
            { id: "3", text: "猫は幸せ" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("invalid language hint", async function () {
          const docs = ["This should fail because we're passing in an invalid language hint"];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            "notalanguage",
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("paged results with custom page size", async function () {
          const totalDocs = 25;
          const docs = Array(totalDocs - 1).fill("random text");
          docs.push("Microsoft was founded by Bill Gates and Paul Allen");
          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizeEntitiesActions: [{ modelVersion: "latest" }],
              extractKeyPhrasesActions: [{ modelVersion: "latest" }],
            },
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("pii redacted test is not empty", async function () {
          const docs = [
            { id: "1", text: "I will go to the park." },
            { id: "2", text: "Este es un document escrito en Español." },
            { id: "3", text: "猫は幸せ" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("operation metadata", async function () {
          const docs = [
            { id: "1", text: "I will go to the park." },
            { id: "2", text: "Este es un document escrito en Español." },
            { id: "3", text: "猫は幸せ" },
          ];

          const poller = await client.beginAnalyzeActions(
            docs,
            {
              recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
            },
            {
              updateIntervalInMs: pollingInterval,
              displayName: "testJob",
            },
          );
          poller.onProgress((state) => {
            assert.ok(state.createdOn, "createdOn is undefined!");
            assert.ok(state.expiresOn, "expiresOn is undefined!");
            assert.ok(state.lastModifiedOn, "lastModifiedOn is undefined!");
            assert.ok(state.status, "status is undefined!");
            assert.isDefined(state.actionsSucceededCount, "actionsSucceededCount is undefined!");
            assert.equal(state.actionsFailedCount, 0);
            assert.isDefined(state.actionsInProgressCount, "actionsInProgressCount is undefined!");
            assert.equal(state.displayName, "testJob");
          });
          const result = await poller.pollUntilDone();
          assert.ok(result);
        });

        it("family emoji wit skin tone modifier", async function () {
          const poller = await client.beginAnalyzeActions(
            [{ id: "0", text: "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987", language: "en" }],
            {
              recognizePiiEntitiesActions: [
                { modelVersion: "latest", stringIndexType: "UnicodeCodePoint" },
              ],
            },
            {
              updateIntervalInMs: pollingInterval,
            },
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

        it("malformed actions", async function () {
          const docs = [{ id: "1", text: "I will go to the park." }];
          await assertRestError(
            client.beginAnalyzeActions(
              docs,
              {
                //  the service currently supports up to one action only per type.
                recognizePiiEntitiesActions: [
                  // { modelVersion: "bad" },
                  // { modelVersion: "latest" },
                  { modelVersion: "bad", stringIndexType: "TextElement_v8" },
                ],
              },
              {
                updateIntervalInMs: pollingInterval,
              },
            ),
            {
              statusCode: 400,
              code: "InvalidRequest",
            },
          );
        });

        it("multiple actions per type are disallowed", async function () {
          const docs = [{ id: "1", text: "I will go to the park." }];
          await assertRestError(
            client.beginAnalyzeActions(
              docs,
              {
                recognizePiiEntitiesActions: [
                  { modelVersion: "latest", stringIndexType: "UnicodeCodePoint" },
                  { modelVersion: "latest", stringIndexType: "TextElement_v8" },
                ],
              },
              {
                updateIntervalInMs: pollingInterval,
              },
            ),
            {
              messagePattern: /Duplicate task name/,
            },
          );
        });
      });

      describe("#health", function () {
        it("input strings", async function () {
          const poller = await client.beginAnalyzeHealthcareEntities(
            [
              "Patient does not suffer from high blood pressure.",
              "Prescribed 100mg ibuprofen, taken twice daily.",
            ],
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          const result = await poller.pollUntilDone();
          const doc1 = (await result.next()).value;
          if (!doc1.error) {
            assert.ok(doc1.id);
            assert.ok(doc1.entities);
            const doc1Entity1 = doc1.entities[0];
            assert.equal(doc1Entity1.text, "high blood pressure");
            assert.equal(doc1Entity1.assertion?.certainty, "negative");
          }

          const doc2 = (await result.next()).value;
          if (!doc2.error) {
            assert.ok(doc2.id);
            assert.ok(doc2.entities);
            const doc2Entity1 = doc2.entities[0];
            assert.equal(doc2Entity1.text, "100mg");
            assert.deepEqual(doc2.entityRelations[0], {
              relationType: "DosageOfMedication",
              roles: [
                {
                  entity: doc2.entities[0],
                  name: "Dosage",
                },
                {
                  entity: doc2.entities[1],
                  name: "Medication",
                },
              ],
            });
            assert.deepEqual(doc2.entityRelations[1], {
              relationType: "FrequencyOfMedication",
              roles: [
                {
                  entity: doc2.entities[1],
                  name: "Medication",
                },
                {
                  entity: doc2.entities[2],
                  name: "Frequency",
                },
              ],
            });

            const doc2Entity2 = doc2.entities[1];
            assert.equal(doc2Entity2.text, "ibuprofen");

            const doc2Entity3 = doc2.entities[2];
            assert.equal(doc2Entity3.text, "twice daily");
          }
        });

        it("entity assertions", async function () {
          const poller = await client.beginAnalyzeHealthcareEntities(
            [
              "Baby not likely to have Meningitis. in case of fever in the mother, consider Penicillin for the baby too.",
            ],
            "en",
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          const result = await poller.pollUntilDone();
          const doc1 = (await result.next()).value;
          if (!doc1.error) {
            assert.ok(doc1.id);
            assert.ok(doc1.entities);
            const doc1Entity1 = doc1.entities[0];
            assert.equal(doc1Entity1.text, "Baby");
            assert.equal(doc1Entity1.category, "FamilyRelation");
            assert.equal(doc1Entity1.normalizedText, "Infant");
            assert.isUndefined(doc1Entity1.assertion?.association);
            assert.isUndefined(doc1Entity1.assertion?.conditionality);

            const doc1Entity2 = doc1.entities[1];
            assert.equal(doc1Entity2.text, "Meningitis");
            assert.equal(doc1Entity2.category, "Diagnosis");
            assert.equal(doc1Entity2.assertion?.certainty, "negativePossible");
            assert.equal(doc1Entity2.normalizedText, "Meningitis");
            assert.equal(doc1Entity2.assertion?.association, "other");
            assert.isUndefined(doc1Entity2.assertion?.conditionality);

            const doc1Entity3 = doc1.entities[2];
            assert.equal(doc1Entity3.text, "fever");
            assert.equal(doc1Entity3.normalizedText, "Fever");
            assert.equal(doc1Entity3.category, "SymptomOrSign");
            assert.isUndefined(doc1Entity3.assertion?.association);
            assert.equal(doc1Entity3.assertion?.conditionality, "hypothetical");

            const doc1Entity4 = doc1.entities[3];
            assert.equal(doc1Entity4.text, "mother");
            assert.equal(doc1Entity4.normalizedText, "Mother (person)");
            assert.equal(doc1Entity4.category, "FamilyRelation");
            assert.isUndefined(doc1Entity4.assertion?.association);
            assert.isUndefined(doc1Entity4.assertion?.conditionality);

            const doc1Entity5 = doc1.entities[4];
            assert.equal(doc1Entity5.text, "Penicillin");
            assert.equal(doc1Entity5.category, "MedicationName");
            assert.equal(doc1Entity5.normalizedText, "penicillins");
            assert.equal(doc1Entity5.assertion?.certainty, "neutralPossible");
            assert.isUndefined(doc1Entity5.assertion?.association);
            assert.equal(doc1Entity5.assertion?.conditionality, "conditional");

            const doc1Entity6 = doc1.entities[5];
            assert.equal(doc1Entity6.text, "baby");
            assert.equal(doc1Entity6.category, "FamilyRelation");
            assert.equal(doc1Entity6.normalizedText, "Infant");
            assert.isUndefined(doc1Entity6.assertion?.association);
            assert.isUndefined(doc1Entity6.assertion?.conditionality);

            assert.isEmpty(doc1.entityRelations);
          }
        });

        it("input documents", async function () {
          const poller = await client.beginAnalyzeHealthcareEntities(
            [
              {
                id: "1",
                text: "Patient does not suffer from high blood pressure.",
                language: "en",
              },
              { id: "2", text: "Prescribed 100mg ibuprofen, taken twice daily.", language: "en" },
            ],
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          const result = await poller.pollUntilDone();
          for await (const doc of result) {
            if (!doc.error) {
              assert.ok(doc.id);
              assert.ok(doc.entities);
            }
          }
        });

        it("some inputs with errors", async function () {
          const docs = [
            { id: "1", language: "en", text: "" },
            {
              id: "2",
              language: "english",
              text: "Patient does not suffer from high blood pressure.",
            },
            { id: "3", language: "en", text: "Prescribed 100mg ibuprofen, taken twice daily." },
          ];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          const result1 = (await result.next()).value;
          const result2 = (await result.next()).value;
          const result3 = (await result.next()).value;
          if (!result3.error) {
            assert.ok(result3.id);
            assert.ok(result3.entities);
          }
          assert.ok(result1.error);
          assert.ok(result2.error);
        });

        it("all inputs with errors", async function () {
          const docs = [
            { id: "1", language: "en", text: "" },
            {
              id: "2",
              language: "english",
              text: "Patient does not suffer from high blood pressure.",
            },
            { id: "3", language: "en", text: "" },
          ];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          const result1 = (await result.next()).value;
          const result2 = (await result.next()).value;
          const result3 = (await result.next()).value;
          assert.ok(result1.error);
          assert.ok(result2.error);
          assert.ok(result3.error);
        });

        it("too many documents", async function () {
          const docs = Array(11).fill("random text");
          await assertRestError(
            client.beginAnalyzeHealthcareEntities(docs, "en", {
              updateIntervalInMs: pollingInterval,
            }),
            {
              code: "InvalidDocumentBatch",
              statusCode: 400,
              messagePattern: /Max 10 records are permitted/,
            },
          );
        });

        it("payload too large", async function () {
          const large_doc =
            "RECORD #333582770390100 | MH | 85986313 | | 054351 | 2/14/2001 12:00:00 AM | \
                CORONARY ARTERY DISEASE | Signed | DIS | Admission Date: 5/22/2001 \
                Report Status: Signed Discharge Date: 4/24/2001 ADMISSION DIAGNOSIS: \
                CORONARY ARTERY DISEASE. HISTORY OF PRESENT ILLNESS: \
                The patient is a 54-year-old gentleman with a history of progressive angina over the past several months. \
                The patient had a cardiac catheterization in July of this year revealing total occlusion of the RCA and \
                50% left main disease , with a strong family history of coronary artery disease with a brother dying at \
                the age of 52 from a myocardial infarction and another brother who is status post coronary artery bypass grafting. \
                The patient had a stress echocardiogram done on July , 2001 , which showed no wall motion abnormalities ,\
                but this was a difficult study due to body habitus. The patient went for six minutes with minimal ST depressions \
                in the anterior lateral leads , thought due to fatigue and wrist pain , his anginal equivalent. Due to the patient's \
                increased symptoms and family history and history left main disease with total occasional of his RCA was referred \
                for revascularization with open heart surgery.";
          const docs = Array(500).fill(large_doc);
          await assertRestError(
            client.beginAnalyzeHealthcareEntities(docs, "en", {
              updateIntervalInMs: pollingInterval,
            }),
            {
              code: "InvalidDocumentBatch",
              statusCode: 413,
              messagePattern: /Limit request size to: 524288/,
            },
          );
        });

        it("document warnings", async function () {
          const docs = [{ id: "1", text: "This won't actually create a warning :'(" }];
          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          for await (const doc of result) {
            if (!doc.error) {
              assert.equal(doc.warnings.length, 0);
            }
          }
        });

        it("output has the same order as input", async function () {
          const docs = [
            { id: "1", text: "one" },
            { id: "2", text: "two" },
            { id: "3", text: "three" },
            { id: "4", text: "four" },
            { id: "5", text: "five" },
          ];
          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          let i = 0;
          for await (const doc of result) {
            assert.equal(parseInt(doc.id), ++i);
          }
        });

        it("output has the same order as input with out of order IDs", async function () {
          const docs = [
            { id: "56", text: ":)" },
            { id: "0", text: ":(" },
            { id: "22", text: "" },
            { id: "19", text: ":P" },
            { id: "1", text: ":D" },
          ];
          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          const in_order = [56, 0, 22, 19, 1];
          let i = 0;
          for await (const doc of result) {
            assert.equal(parseInt(doc.id), in_order[i++]);
          }
        });

        it.skip("show stats and model version", async function () {
          const docs = [
            { id: "56", text: ":)" },
            { id: "0", text: ":(" },
            { id: "22", text: "" },
            { id: "19", text: ":P" },
            { id: "1", text: ":D" },
          ];
          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            modelVersion: "latest",
            includeStatistics: true,
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          assert.ok(result);
          assert.ok(result.modelVersion);
          assert.equal(result.statistics?.documentCount, 5);
          assert.equal(result.statistics?.transactionCount, 4);
          assert.equal(result.statistics?.validDocumentCount, 4);
          assert.equal(result.statistics?.erroneousDocumentCount, 1);
        });

        it("whole batch language hint", async function () {
          const docs = [
            "This was the best day of my life.",
            "I did not like the hotel we stayed at. It was too expensive.",
            "The restaurant was not as good as I hoped.",
          ];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, "en", {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          for await (const doc of result) {
            assert.isUndefined(doc.error);
          }
        });

        it("whole batch empty language hint", async function () {
          const docs = [
            "This was the best day of my life.",
            "I did not like the hotel we stayed at. It was too expensive.",
            "The restaurant was not as good as I hoped.",
          ];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, "", {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          for await (const doc of result) {
            assert.isUndefined(doc.error);
          }
        });

        it("whole batch empty language hint per doc", async function () {
          const docs = [
            { id: "1", language: "", text: "I will go to the park." },
            { id: "2", language: "", text: "I did not like the hotel we stayed at." },
            { id: "3", text: "The restaurant had really good food." },
          ];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          for await (const doc of result) {
            assert.isUndefined(doc.error);
          }
        });

        it("whole batch with multiple languages", async function () {
          const docs = [
            { id: "1", text: "I should take my cat to the veterinarian." },
            { id: "2", text: "Este es un document escrito en Español." },
            { id: "3", text: "猫は幸せ" },
          ];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          for await (const doc of result) {
            assert.isUndefined(doc.error);
          }
        });

        it("invalid language hint", async function () {
          const docs = ["This should fail because we're passing in an invalid language hint"];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, "notalanguage", {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          const firstResult = (await result.next()).value;
          assert.equal(firstResult.error?.code, "UnsupportedLanguageCode");
        });

        it("invalid language hint in doc", async function () {
          const docs = [
            {
              id: "1",
              language: "notalanguage",
              text: "This should fail because we're passing in an invalid language hint",
            },
          ];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          const firstResult = (await result.next()).value;
          assert.equal(firstResult.error?.code, "UnsupportedLanguageCode");
        });

        /**
         * The service accepts bad model names
         */
        it.skip("bad model", async function () {
          const docs = [
            {
              id: "1",
              language: "en",
              text: "This should fail because we're passing in an invalid language hint",
            },
          ];
          await assertRestError(
            client.beginAnalyzeHealthcareEntities(docs, {
              modelVersion: "bad",
              updateIntervalInMs: pollingInterval,
            }),
            {
              code: "ModelVersionIncorrect",
            },
          );
        });

        it("all documents have errors", async function () {
          let text = "";
          for (let i = 0; i < 5121; ++i) {
            text = text + "x";
          }
          const docs = [
            { id: "1", text: "" },
            { id: "2", language: "english", text: "I did not like the hotel we stayed at." },
            { id: "3", text: text },
          ];

          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const doc_errors = await poller.pollUntilDone();
          assert.equal((await doc_errors.next()).value.error?.code, "InvalidDocument");
          assert.equal((await doc_errors.next()).value.error?.code, "UnsupportedLanguageCode");
          assert.equal((await doc_errors.next()).value.warnings[0].code, "DocumentTruncated");
        });

        it("documents with duplicate IDs", async function () {
          const docs = [
            { id: "1", text: "hello world" },
            { id: "1", text: "I did not like the hotel we stayed at." },
          ];
          await assertRestError(
            client.beginAnalyzeHealthcareEntities(docs, {
              updateIntervalInMs: pollingInterval,
            }),
            {
              code: "InvalidRequest",
            },
          );
        });

        /**
         * the service by default returns pages of 20 documents each and this test
         * makes sure we get all the results and not just the first page.
         *
         * EDIT: the service decided to process only 10 documents max per request so
         * pagination became unneeded. Once the service raises the limit on
         * the number of input documents, we should re-enable these tests.
         */
        it.skip("paged results one loop", async function () {
          const docs = Array(40).fill("random text");
          docs.push("Prescribed 100mg ibuprofen, taken twice daily.");
          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          let count = 0;
          for await (const doc of result) {
            assert.isUndefined(doc.error);
            ++count;
            if (!doc.error) {
              if (count === 41) {
                assert.equal(doc.entities.length, 3);
              } else {
                assert.equal(doc.entities.length, 0);
              }
            }
          }
          assert.equal(docs.length, count);
        });

        it.skip("paged results nested loop", async function () {
          const docs = Array(40).fill("random text");
          docs.push("Prescribed 100mg ibuprofen, taken twice daily.");
          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          let docCount = 0,
            pageCount = 0;
          for await (const pageDocs of result.byPage()) {
            ++pageCount;
            for (const doc of pageDocs) {
              assert.isUndefined(doc.error);
              ++docCount;
              if (!doc.error) {
                if (docCount === 41) {
                  assert.equal(doc.entities.length, 3);
                } else {
                  assert.equal(doc.entities.length, 0);
                }
              }
            }
          }
          assert.equal(docs.length, docCount);
          assert.equal(Math.ceil(docs.length / 20), pageCount);
        });

        it.skip("paged results with custom page size", async function () {
          const docs = Array(40).fill("random text");
          docs.push("Prescribed 100mg ibuprofen, taken twice daily.");
          const poller = await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval,
          });
          const result = await poller.pollUntilDone();
          let docCount = 0;
          let pageCount = 0;
          const pageSize = 10;
          for await (const pageDocs of result.byPage({ maxPageSize: pageSize })) {
            ++pageCount;
            for (const doc of pageDocs) {
              assert.isUndefined(doc.error);
              ++docCount;
              if (!doc.error) {
                if (docCount === 41) {
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

        it("operation metadata", async function () {
          const poller = await client.beginAnalyzeHealthcareEntities(
            [
              {
                id: "1",
                text: "Patient does not suffer from high blood pressure.",
                language: "en",
              },
              { id: "2", text: "Prescribed 100mg ibuprofen, taken twice daily.", language: "en" },
            ],
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          poller.onProgress((state) => {
            assert.ok(state.createdOn, "createdOn is undefined!");
            assert.ok(state.expiresOn, "expiresOn is undefined!");
            assert.ok(state.lastModifiedOn, "lastModifiedOn is undefined!");
            assert.ok(state.status, "status is undefined!");
          });
          const result = await poller.pollUntilDone();
          assert.ok(result);
        });

        it("family emoji wit skin tone modifier with Utf16CodeUnit", async function () {
          const doc = "👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen";
          const poller = await client.beginAnalyzeHealthcareEntities(
            [{ id: "0", text: doc, language: "en" }],
            {
              updateIntervalInMs: pollingInterval,
            },
          );
          const pollerResult = await poller.pollUntilDone();
          const result = (await pollerResult.next()).value;
          if (!result.error) {
            const entity = result.entities[0];
            const offset = 20;
            const length = 9;
            assert.equal(entity.offset, 20);
            assert.equal(entity.length, 9);
            checkEntityTextOffset(doc, entity, offset, length);
          }
        });

        it("family emoji wit skin tone modifier with UnicodeCodePoint", async function () {
          const poller = await client.beginAnalyzeHealthcareEntities(
            [{ id: "0", text: "👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen", language: "en" }],
            {
              updateIntervalInMs: pollingInterval,
              stringIndexType: "UnicodeCodePoint",
            },
          );
          const pollerResult = await poller.pollUntilDone();
          const result = (await pollerResult.next()).value;
          if (!result.error) {
            assert.equal(result.entities[0].offset, 12); // 20 with UTF16
            assert.equal(result.entities[0].length, 9);
            assert.equal(result.entities[0].text.length, result.entities[0].length);
          }
        });
      });
    });
  });
});
