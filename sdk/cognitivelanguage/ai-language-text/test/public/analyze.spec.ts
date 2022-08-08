// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeActionNames,
  KnownPiiEntityCategory,
  KnownPiiEntityDomain,
  KnownStringIndexType,
  KnownTextAnalysisErrorCode,
  LanguageDetectionInput,
  Opinion,
  SentenceSentiment,
  TextAnalysisClient,
  TextDocumentInput,
} from "../../src";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient";
import { Context, Suite } from "mocha";
import { assert, matrix } from "@azure/test-utils";
import { assertAllSuccess, assertRestError, getSuccRes, isSuccess } from "./utils/resultHelper";
import { checkEntityTextOffset, checkOffsetAndLength } from "./utils/stringIndexTypeHelpers";
import { Recorder } from "@azure-tools/test-recorder";

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

matrix([["APIKey", "AAD"]] as const, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] TextAnalysisClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: TextAnalysisClient;

    let getId: () => string;

    beforeEach(async function (this: Context) {
      recorder = await startRecorder(this.currentTest);
      client = createClient({
        authMethod,
        recorder,
      });
      let nextId = 0;
      getId = function () {
        nextId += 1;
        return nextId.toString();
      };
    });

    afterEach(async function () {
      await recorder.stop();
    });

    describe("analyze", function () {
      describe("#SentimentAnalysis", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(
            client.analyze(AnalyzeActionNames.SentimentAnalysis, []),
            /non-empty array/
          );
        });

        it("client accepts string[] and language", async function () {
          const results = await client.analyze(
            AnalyzeActionNames.SentimentAnalysis,
            testDataEn,
            "en"
          );
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.analyze(AnalyzeActionNames.SentimentAnalysis, testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("service returns error for invalid language", async function () {
          const [result] = await client.analyze(
            AnalyzeActionNames.SentimentAnalysis,
            ["Hello world!"],
            "notalanguage"
          );
          if (result.error === undefined) {
            assert.fail("Expected an error from the service.");
          }
          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
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
          const results = await client.analyze(
            AnalyzeActionNames.SentimentAnalysis,
            documents,
            "en",
            {
              includeOpinionMining: true,
            }
          );
          const result1 = getSuccRes(results[0]);
          const result6 = getSuccRes(results[5]);
          const result7 = getSuccRes(results[6]);
          const Assessment1 = result1.sentences[0].opinions[0].assessments[0];
          const Assessment2 = result6.sentences[0].opinions[0].assessments[0];
          assert.notDeepEqual(Assessment1, Assessment2);

          const listAllAssessments = (acc: string[], sentence: SentenceSentiment): string[] =>
            acc.concat(
              sentence.opinions.reduce(
                (assessments: string[], opinion: Opinion) =>
                  assessments.concat(opinion.assessments.map((assessment) => assessment.text)),
                []
              )
            );
          const allAssessments1 = result1.sentences.reduce(listAllAssessments, []);
          assert.deepEqual(allAssessments1, ["unacceptable"]);
          const allAssessments2 = result6.sentences.reduce(listAllAssessments, []);
          assert.deepEqual(allAssessments2, ["Nice", "old", "dirty"]);
          const allAssessments7 = result7.sentences.reduce(listAllAssessments, []);
          assert.deepEqual(allAssessments7, ["smelled"]);
        });

        it("service returns an error for an empty document", async function () {
          const data = [...testDataEn];
          data.splice(1, 0, "");
          const results = await client.analyze(AnalyzeActionNames.SentimentAnalysis, data);
          const errorResult = results[1];
          if (errorResult.error === undefined) {
            assert.fail("Expected an error from the service");
          }
          assert.equal(
            results.filter((result) => result.error === undefined).length,
            testDataEn.length
          );
          assert.equal(errorResult.error.code, KnownTextAnalysisErrorCode.InvalidDocument);
        });

        it("client accepts TextDocumentInput[]", async function () {
          const enInputs = testDataEn.map(
            (text): TextDocumentInput => ({
              id: getId(),
              language: "en",
              text,
            })
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              language: "es",
              text,
            })
          );
          const allInputs = enInputs.concat(esInputs);
          const results = await client.analyze(AnalyzeActionNames.SentimentAnalysis, allInputs);
          assert.equal(results.length, testDataEn.length + testDataEs.length);
          assertAllSuccess(results);
          results.map((result) =>
            getSuccRes(result).sentences.map((sentence) => assert.isEmpty(sentence.opinions))
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
          const results = await client.analyze(AnalyzeActionNames.SentimentAnalysis, documents, {
            includeOpinionMining: true,
          });
          assert.equal(results.length, 1);
          assertAllSuccess(results);
          const documentSentiment = getSuccRes(results[0]);
          documentSentiment.sentences.map((sentence) =>
            sentence.opinions.map((opinion) => {
              const Target = opinion.target;
              assert.equal(Target.text, "design");
              assert.equal(Target.sentiment, "positive");
              assert.isAtLeast(Target.confidenceScores.positive, 0);
              assert.isAtLeast(Target.confidenceScores.negative, 0);
              assert.equal(Target.offset, 32);
              assert.equal(Target.length, 6);
              assert.equal(Target.text.length, Target.length);

              const sleekAssessment = opinion.assessments[0];
              assert.equal(sleekAssessment.text, "sleek");
              assert.equal(sleekAssessment.sentiment, "positive");
              assert.isAtLeast(sleekAssessment.confidenceScores.positive, 0);
              assert.isAtLeast(sleekAssessment.confidenceScores.negative, 0);
              assert.isFalse(sleekAssessment.isNegated);
              assert.equal(sleekAssessment.offset, 9);
              assert.equal(sleekAssessment.length, 5);
              assert.equal(sleekAssessment.text.length, sleekAssessment.length);

              const beautifulAssessment = opinion.assessments[1];
              assert.equal(beautifulAssessment.text, "beautiful");
              assert.equal(beautifulAssessment.sentiment, "positive");
              assert.isAtLeast(beautifulAssessment.confidenceScores.positive, 0);
              assert.isAtLeast(beautifulAssessment.confidenceScores.negative, 0);
              assert.isFalse(beautifulAssessment.isNegated);
              assert.equal(beautifulAssessment.offset, 53);
              assert.equal(beautifulAssessment.length, 9);
              assert.equal(beautifulAssessment.text.length, beautifulAssessment.length);
            })
          );
        });

        /** TODO, unskip when the service fix the bug */
        it.skip("client gets negative mined assessments", async function () {
          const documents = [
            {
              text: "The food and service are not good",
              id: "0",
              language: "en",
            },
          ];
          const results = await client.analyze(AnalyzeActionNames.SentimentAnalysis, documents, {
            includeOpinionMining: true,
          });
          assert.equal(results.length, 1);
          assertAllSuccess(results);
          const documentSentiment = getSuccRes(results[0]);
          documentSentiment.sentences.map((sentence) => {
            const foodTarget = sentence.opinions[0].target;
            assert.equal(foodTarget.text, "food");
            assert.equal(foodTarget.sentiment, "negative");

            const foodTargetPositiveScore = foodTarget.confidenceScores.positive;
            const foodTargetNegativeScore = foodTarget.confidenceScores.negative;

            assert.isAtLeast(foodTargetPositiveScore, 0);
            assert.isAtLeast(foodTargetNegativeScore, 0);
            assert.equal(foodTargetPositiveScore + foodTargetNegativeScore, 1);

            const serviceTarget = sentence.opinions[1].target;
            assert.equal(serviceTarget.text, "service");
            assert.equal(serviceTarget.sentiment, "negative");

            const serviceTargetPositiveScore = serviceTarget.confidenceScores.positive;
            const serviceTargetNegativeScore = serviceTarget.confidenceScores.negative;

            assert.isAtLeast(serviceTargetPositiveScore, 0);
            assert.isAtLeast(serviceTargetNegativeScore, 0);
            assert.equal(serviceTargetPositiveScore + serviceTargetNegativeScore, 1);

            const foodAssessment = sentence.opinions[0].assessments[0];
            const serviceAssessment = sentence.opinions[1].assessments[0];

            assert.deepEqual(foodAssessment, serviceAssessment);

            assert.equal(foodAssessment.text, "good");
            assert.equal(foodAssessment.sentiment, "negative");

            const foodAssessmentPositiveScore = foodAssessment.confidenceScores.positive;
            const foodAssessmentNegativeScore = foodAssessment.confidenceScores.negative;

            assert.isAtLeast(foodAssessmentPositiveScore, 0);
            assert.isAtLeast(foodAssessmentNegativeScore, 0);
            assert.equal(foodAssessmentPositiveScore + foodAssessmentNegativeScore, 1);
            assert.isTrue(foodAssessment.isNegated);
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
          const results = await client.analyze(AnalyzeActionNames.SentimentAnalysis, documents, {
            includeOpinionMining: true,
          });
          assert.equal(results.length, 1);
          assertAllSuccess(results);
          const documentSentiment = getSuccRes(results[0]);
          assert.isEmpty(documentSentiment.sentences[0].opinions);
        });
      });

      describe("#LanguageDetection", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(
            client.analyze(AnalyzeActionNames.LanguageDetection, []),
            /non-empty array/
          );
        });

        it("client accepts no countryHint", async function () {
          const results = await client.analyze(AnalyzeActionNames.LanguageDetection, testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts a countryHint", async function () {
          const results = await client.analyze(
            AnalyzeActionNames.LanguageDetection,
            ["impossible"],
            "fr"
          );
          assert.equal(results.length, 1);
          assertAllSuccess(results);
        });

        it('client accepts "none" country hint with string[] input', async function () {
          const results = await client.analyze(
            AnalyzeActionNames.LanguageDetection,
            ["I use Azure Functions to develop my service."],
            "none"
          );
          assert.equal(results.length, 1);
          assertAllSuccess(results);
          const result = getSuccRes(results[0]);
          assert.equal(result.primaryLanguage.iso6391Name, "en");
        });

        it('client accepts "none" country hint with DetectLanguageInput[] input', async function () {
          const results = await client.analyze(
            AnalyzeActionNames.LanguageDetection,
            testDataEn.concat(testDataEs).map(
              (input): LanguageDetectionInput => ({
                id: getId(),
                countryHint: "none",
                text: input,
              })
            )
          );
          assertAllSuccess(results);
        });

        it("service errors on invalid country hint", async function () {
          const [result] = await client.analyze(
            AnalyzeActionNames.LanguageDetection,
            ["hello"],
            "invalidcountry"
          );
          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, KnownTextAnalysisErrorCode.InvalidCountryHint);
        });

        it("client accepts mixed-country DetectLanguageInput[]", async function () {
          const enInputs = testDataEn.map(
            (text): LanguageDetectionInput => ({
              id: getId(),
              text,
            })
          );
          const esInputs = testDataEs.map(
            (text): LanguageDetectionInput => ({
              id: getId(),
              countryHint: "mx",
              text,
            })
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.analyze(AnalyzeActionNames.LanguageDetection, allInputs);
          assert.equal(results.length, testDataEn.length + testDataEs.length);
          assertAllSuccess(results);
        });
      });

      describe("#EntityRecognition", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(
            client.analyze(AnalyzeActionNames.EntityRecognition, []),
            /non-empty array/
          );
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.analyze(AnalyzeActionNames.EntityRecognition, testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with a language specified", async function () {
          const results = await client.analyze(
            AnalyzeActionNames.EntityRecognition,
            testDataEn,
            "en"
          );
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.analyze(
            AnalyzeActionNames.EntityRecognition,
            ["This is some text, but it doesn't matter."],
            "notalanguage"
          );

          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const enInputs = testDataEn.slice(0, -1).map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            })
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            })
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.analyze(AnalyzeActionNames.EntityRecognition, allInputs);
          assert.equal(results.length, testDataEn.length - 1 + testDataEs.length);
          assertAllSuccess(results);
        });

        it("client throws exception for too many inputs", async function () {
          const enInputs = testDataEn.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            })
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            })
          );
          const allInputs = enInputs.concat(esInputs);
          await assertRestError(client.analyze(AnalyzeActionNames.EntityRecognition, allInputs), {
            code: KnownTextAnalysisErrorCode.InvalidDocumentBatch,
            statusCode: 400,
            messagePattern: /Max 5 records are permitted/,
          });
        });
      });

      describe("#KeyPhraseExtraction", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(
            client.analyze(AnalyzeActionNames.KeyPhraseExtraction, []),
            /non-empty array/
          );
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.analyze(AnalyzeActionNames.KeyPhraseExtraction, testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with a language specified", async function () {
          const results = await client.analyze(
            AnalyzeActionNames.KeyPhraseExtraction,
            testDataEn,
            "en"
          );
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.analyze(
            AnalyzeActionNames.KeyPhraseExtraction,
            ["This is some text, but it doesn't matter."],
            "notalanguage"
          );

          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const enInputs = testDataEn.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            })
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            })
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.analyze(AnalyzeActionNames.KeyPhraseExtraction, allInputs);
          assert.equal(results.length, testDataEn.length + testDataEs.length);
          assertAllSuccess(results);
        });
      });

      describe("#PiiEntityRecognition", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(client.analyze(AnalyzeActionNames.PiiEntityRecognition, []));
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.analyze(AnalyzeActionNames.PiiEntityRecognition, testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with a language specified", async function () {
          const results = await client.analyze(
            AnalyzeActionNames.PiiEntityRecognition,
            testDataEn,
            "en"
          );
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client correctly reports recognition of PII-like pattern", async function () {
          // 078-05-1120 is an invalid social security number due to its use in advertising
          // throughout the late 1930s
          const fakeSSNDocument = "Your Social Security Number is 859-98-0987.";
          const [result] = await client.analyze(
            AnalyzeActionNames.PiiEntityRecognition,
            [fakeSSNDocument],
            "en"
          );
          assert.equal(getSuccRes(result).entities.length, 1);
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.analyze(
            AnalyzeActionNames.PiiEntityRecognition,
            ["This is some text, but it doesn't matter."],
            "notalanguage"
          );

          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const sliceSize = 3;
          const enInputs = testDataEn.slice(0, sliceSize).map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            })
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            })
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.analyze(AnalyzeActionNames.PiiEntityRecognition, allInputs);
          assert.equal(results.length, sliceSize + testDataEs.length);
          // TA NER public preview currently supports only english
          assert.ok(results.slice(0, sliceSize).every(isSuccess));
        });

        it("accepts domain filter", async function () {
          const response = await client.analyze(
            AnalyzeActionNames.PiiEntityRecognition,
            [
              {
                id: "0",
                text: "I work at Microsoft and my phone number is 333-333-3333",
                language: "en",
              },
            ],
            { domainFilter: KnownPiiEntityDomain.Phi }
          );
          const result = getSuccRes(response[0]);
          assert.equal(result.entities.length, 2);
          assert.equal(result.entities[0].text, "Microsoft");
          assert.equal(result.entities[0].category, "Organization");
          assert.equal(result.entities[1].text, "333-333-3333");
          assert.equal(result.entities[1].category, "PhoneNumber");
          assert.equal(
            result.redactedText,
            "I work at ********* and my phone number is ************"
          );
        });

        it("accepts pii categories", async function () {
          const response = await client.analyze(
            AnalyzeActionNames.PiiEntityRecognition,
            [
              {
                id: "0",
                text: "Patient name is Joe and SSN is 859-98-0987",
                language: "en",
              },
            ],
            { categoriesFilter: [KnownPiiEntityCategory.USSocialSecurityNumber] }
          );
          const result = getSuccRes(response[0]);
          assert.equal(result.entities.length, 1);
          assert.equal(result.entities[0].text, "859-98-0987");
          assert.equal(result.entities[0].category, KnownPiiEntityCategory.USSocialSecurityNumber);
          assert.equal(result.redactedText, "Patient name is Joe and SSN is ***********");
        });

        it("output pii categories are accepted as input", async function () {
          const response1 = await client.analyze(AnalyzeActionNames.PiiEntityRecognition, [
            {
              id: "0",
              text: "Patient name is Joe and SSN is 859-98-0987",
              language: "en",
            },
          ]);
          const result1 = getSuccRes(response1[0]);
          const entity2 = result1.entities[1];
          const response2 = await client.analyze(
            AnalyzeActionNames.PiiEntityRecognition,
            [
              {
                id: "0",
                text: "Patient name is Joe and SSN is 859-98-0987",
                language: "en",
              },
            ],
            { categoriesFilter: [entity2.category] }
          );
          const result2 = getSuccRes(response2[0]);
          assert.equal(result2.entities.length, 1);
          assert.equal(result2.entities[0].text, entity2.text);
          assert.equal(result2.entities[0].category, entity2.category);
          assert.equal(result2.redactedText, "Patient name is Joe and SSN is ***********");
        });
      });

      describe("#EntityLinking", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(
            client.analyze(AnalyzeActionNames.EntityLinking, []),
            /non-empty array/
          );
        });

        it("client accepts string[] with no language", async function () {
          const results = await client.analyze(AnalyzeActionNames.EntityLinking, testDataEn);
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("client accepts string[] with a language specified", async function () {
          const results = await client.analyze(AnalyzeActionNames.EntityLinking, testDataEn, "en");
          assert.equal(results.length, testDataEn.length);
          assertAllSuccess(results);
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.analyze(
            AnalyzeActionNames.EntityLinking,
            ["This is some text, but it doesn't matter."],
            "notalanguage"
          );

          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }

          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const enInputs = testDataEn.slice(0, -1).map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            })
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            })
          );
          const allInputs = enInputs.concat(esInputs);

          const results = await client.analyze(AnalyzeActionNames.EntityLinking, allInputs);
          assert.equal(results.length, testDataEn.length - 1 + testDataEs.length);
          assertAllSuccess(results);
        });

        it("client throws exception for too many inputs", async function () {
          const enInputs = testDataEn.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "en",
            })
          );
          const esInputs = testDataEs.map(
            (text): TextDocumentInput => ({
              id: getId(),
              text,
              language: "es",
            })
          );
          const allInputs = enInputs.concat(esInputs);

          await assertRestError(client.analyze(AnalyzeActionNames.EntityRecognition, allInputs), {
            code: KnownTextAnalysisErrorCode.InvalidDocumentBatch,
            statusCode: 400,
            messagePattern: /Max 5 records are permitted/,
          });
        });
      });

      describe("#String encoding", function () {
        describe("#Default encoding (utf16CodeUnit)", function () {
          it("emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              8,
              11,
              checkEntityTextOffset
            );
          });

          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              10,
              11,
              checkEntityTextOffset
            );
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩‍👩‍👧‍👧 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              17,
              11,
              checkEntityTextOffset
            );
          });

          it("family emoji with skin tone modifier", async function (this: Context) {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              25,
              11,
              checkEntityTextOffset
            );
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              9,
              11,
              checkEntityTextOffset
            );
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              10,
              11,
              checkEntityTextOffset
            );
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              8,
              11,
              checkEntityTextOffset
            );
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              8,
              11,
              checkEntityTextOffset
            );
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(
              client,
              "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              121,
              11,
              checkEntityTextOffset
            );
          });
        });
        describe("#UnicodeCodePoint", function () {
          it("emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              7,
              11
            ); // offset was 8 with UTF16
          });

          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              8,
              11
            ); // offset was 10 with UTF16
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩‍👩‍👧‍👧 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              13,
              11
            ); // offset was 17 with UTF16
          });

          it("family emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              17,
              11
            ); // offset was 25 with UTF16
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              9,
              11
            );
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              10,
              11
            );
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              8,
              11
            );
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              8,
              11
            );
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(
              client,
              "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              121,
              11
            );
          });
        });
        describe("#TextElementsV8", function () {
          it("emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              7,
              11
            ); // offset was 8 with UTF16
          });

          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              8,
              11
            ); // offset was 10 with UTF16
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩‍👩‍👧‍👧 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              13,
              11
            ); // offset was 17 with UTF16
          });

          it("family emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              17,
              11
            ); // offset was 25 with UTF16
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              9,
              11
            );
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              9,
              11
            ); // offset was 10 with UTF16
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              8,
              11
            );
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              8,
              11
            );
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(
              client,
              "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              9,
              11
            ); // offset was 121 with UTF16
          });
        });
      });
    });
  });
});
