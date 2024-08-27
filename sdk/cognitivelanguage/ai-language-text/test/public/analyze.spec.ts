// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AnalyzeActionNames,
  KnownPiiEntityCategory,
  KnownPiiEntityDomain,
  KnownStringIndexType,
  KnownTextAnalysisErrorCode,
  TextAnalysisClient,
} from "../../src";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient";
import { Context, Suite } from "mocha";
import { assert, matrix } from "@azure-tools/test-utils";
import { assertActionResults, assertRestError } from "./utils/resultHelper";
import { checkEntityTextOffset, checkOffsetAndLength } from "./utils/stringIndexTypeHelpers";
import { Recorder } from "@azure-tools/test-recorder";
import {
  expectation63,
  expectation65,
  expectation66,
  expectation34,
  expectation35,
  expectation36,
  expectation37,
  expectation38,
  expectation39,
  expectation40,
  expectation41,
  expectation42,
  expectation43,
  expectation44,
  expectation45,
  expectation47,
  expectation48,
  expectation49,
  expectation51,
  expectation52,
  expectation53,
  expectation54,
  expectation56,
  expectation57,
  expectation58,
  expectation59,
  expectation60,
  expectation62,
} from "./expectations";
import { authModes } from "./inputs";

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

matrix(authModes, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] TextAnalysisClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: TextAnalysisClient;

    let getId: () => string;

    beforeEach(async function (this: Context) {
      recorder = await startRecorder(this.currentTest);
      client = createClient(authMethod, {
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
          await assert.isRejected(
            client.analyze(AnalyzeActionNames.SentimentAnalysis, []),
            /non-empty array/,
          );
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts string[] and language", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.SentimentAnalysis, testDataEn, "en"),
            expectation63,
          );
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts string[] with no language", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.SentimentAnalysis, testDataEn),
            expectation63,
          );
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.analyze(
            AnalyzeActionNames.SentimentAnalysis,
            ["Hello world!"],
            "notalanguage",
          );
          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }
          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        it("service has a bug when referencing assessments in doc #6 or greater", async function () {
          const docs = [
            "The food was unacceptable",
            "The rooms were beautiful. The AC was good and quiet.",
            "The breakfast was good, but the toilet was smelly.",
            "Loved this hotel - good breakfast - nice shuttle service - clean rooms.",
            "I had a great unobstructed view of the Microsoft campus.",
            "Nice rooms but bathrooms were old and the toilet was dirty when we arrived.",
            "The toilet smelled.",
          ];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.SentimentAnalysis, docs, "en", {
              includeOpinionMining: true,
            }),
            expectation65,
          );
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("service returns an error for an empty document", async function () {
          const data = [...testDataEn];
          data.splice(1, 0, "");
          assertActionResults(
            await client.analyze(AnalyzeActionNames.SentimentAnalysis, data),
            expectation66,
          );
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts TextDocumentInput[]", async function () {
          const enDocs = testDataEn.map((text) => ({
            id: getId(),
            language: "en",
            text,
          }));
          const esDocs = testDataEs.map((text) => ({
            id: getId(),
            language: "es",
            text,
          }));
          const docs = enDocs.concat(esDocs);
          assertActionResults(
            await client.analyze(AnalyzeActionNames.SentimentAnalysis, docs),
            expectation34,
          );
        });

        it("client gets positive mined assessments", async function () {
          const docs = [
            "It has a sleek premium aluminum design that makes it beautiful to look at.",
          ];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.SentimentAnalysis, docs, "en", {
              includeOpinionMining: true,
            }),
            expectation35,
          );
        });

        it("client gets negative mined assessments", async function () {
          const docs = ["The food and service are not good"];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.SentimentAnalysis, docs, "en", {
              includeOpinionMining: true,
            }),
            expectation36,
          );
        });

        it("client gets no mined assessments", async function () {
          const docs = ["today is a hot day"];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.SentimentAnalysis, docs, "en", {
              includeOpinionMining: true,
            }),
            expectation37,
          );
        });
      });

      describe("#LanguageDetection", function () {
        it("client throws on empty list", async function () {
          await assert.isRejected(
            client.analyze(AnalyzeActionNames.LanguageDetection, []),
            /non-empty array/,
          );
        });

        it("client accepts no countryHint", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.LanguageDetection, testDataEn),
            expectation38,
          );
        });

        // FIXME: Change the expectation once service is fixed
        it("client accepts a countryHint", async function () {
          const docs = ["impossible"];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.LanguageDetection, docs, "fr"),
            expectation39,
          );
        });

        it('client accepts "none" country hint with string[] input', async function () {
          const docs = ["I use Azure Functions to develop my service."];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.LanguageDetection, docs, "none"),
            expectation40,
          );
        });

        it('client accepts "none" country hint with DetectLanguageInput[] input', async function () {
          const docs = testDataEn.concat(testDataEs).map((input) => ({
            id: getId(),
            countryHint: "none",
            text: input,
          }));
          assertActionResults(
            await client.analyze(AnalyzeActionNames.LanguageDetection, docs),
            expectation41,
          );
        });

        it("service errors on invalid country hint", async function () {
          const docs = ["hello"];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.LanguageDetection, docs, "invalidcountry"),
            expectation42,
          );
        });

        it("client accepts mixed-country DetectLanguageInput[]", async function () {
          const enDocs = testDataEn.map((text) => ({
            id: getId(),
            text,
          }));
          const esDocs = testDataEs.map((text) => ({
            id: getId(),
            countryHint: "mx",
            text,
          }));
          const docs = enDocs.concat(esDocs);
          assertActionResults(
            await client.analyze(AnalyzeActionNames.LanguageDetection, docs),
            expectation43,
          );
        });
      });

      describe("#EntityRecognition", function () {
        it("client throws on empty list", async function () {
          await assert.isRejected(
            client.analyze(AnalyzeActionNames.EntityRecognition, []),
            /non-empty array/,
          );
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts string[] with no language", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.EntityRecognition, testDataEn),
            expectation44,
          );
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts string[] with a language specified", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.EntityRecognition, testDataEn, "en"),
            expectation45,
          );
        });

        it("service errors on unsupported language", async function () {
          const docs = ["This is some text, but it doesn't matter."];
          const [result] = await client.analyze(
            AnalyzeActionNames.EntityRecognition,
            docs,
            "notalanguage",
          );
          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }
          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts mixed-language TextDocumentInput[]", async function () {
          const enDocs = testDataEn.slice(0, -1).map((text) => ({
            id: getId(),
            text,
            language: "en",
          }));
          const esDocs = testDataEs.map((text) => ({
            id: getId(),
            text,
            language: "es",
          }));
          const docs = enDocs.concat(esDocs);
          assertActionResults(
            await client.analyze(AnalyzeActionNames.EntityRecognition, docs),
            expectation47,
          );
        });

        it("client throws exception for too many inputs", async function () {
          const enDocs = testDataEn.map((text) => ({
            id: getId(),
            text,
            language: "en",
          }));
          const esDocs = testDataEs.map((text) => ({
            id: getId(),
            text,
            language: "es",
          }));
          const docs = enDocs.concat(esDocs);
          await assertRestError(client.analyze(AnalyzeActionNames.EntityRecognition, docs), {
            code: KnownTextAnalysisErrorCode.InvalidDocumentBatch,
            statusCode: 400,
            messagePattern: /Max 5 records are permitted/,
          });
        });
      });

      describe("#KeyPhraseExtraction", function () {
        it("client throws on empty list", async function () {
          await assert.isRejected(
            client.analyze(AnalyzeActionNames.KeyPhraseExtraction, []),
            /non-empty array/,
          );
        });

        it("client accepts string[] with no language", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.KeyPhraseExtraction, testDataEn),
            expectation48,
          );
        });

        it("client accepts string[] with a language specified", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.KeyPhraseExtraction, testDataEn, "en"),
            expectation49,
          );
        });

        it("service errors on unsupported language", async function () {
          const docs = ["This is some text, but it doesn't matter."];
          const [result] = await client.analyze(
            AnalyzeActionNames.KeyPhraseExtraction,
            docs,
            "notalanguage",
          );
          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }
          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const enDocs = testDataEn.map((text) => ({
            id: getId(),
            text,
            language: "en",
          }));
          const esDocs = testDataEs.map((text) => ({
            id: getId(),
            text,
            language: "es",
          }));
          const docs = enDocs.concat(esDocs);
          assertActionResults(
            await client.analyze(AnalyzeActionNames.KeyPhraseExtraction, docs),
            expectation51,
          );
        });
      });

      describe("#PiiEntityRecognition", function () {
        it("client throws on empty list", async function () {
          await assert.isRejected(client.analyze(AnalyzeActionNames.PiiEntityRecognition, []));
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts string[] with no language", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.PiiEntityRecognition, testDataEn),
            expectation52,
          );
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts string[] with a language specified", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.PiiEntityRecognition, testDataEn, "en"),
            expectation53,
          );
        });

        it("client correctly reports recognition of PII-like pattern", async function () {
          // 078-05-1120 is an invalid social security number due to its use in advertising
          // throughout the late 1930s
          const docs = ["Your Social Security Number is 859-98-0987."];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.PiiEntityRecognition, docs),
            expectation54,
          );
        });

        it("service errors on unsupported language", async function () {
          const docs = ["This is some text, but it doesn't matter."];
          const [result] = await client.analyze(
            AnalyzeActionNames.PiiEntityRecognition,
            docs,
            "notalanguage",
          );
          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }
          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("client accepts mixed-language TextDocumentInput[]", async function () {
          const sliceSize = 3;
          const enDocs = testDataEn.slice(0, sliceSize).map((text) => ({
            id: getId(),
            text,
            language: "en",
          }));
          const esDocs = testDataEs.map((text) => ({
            id: getId(),
            text,
            language: "es",
          }));
          const docs = enDocs.concat(esDocs);
          assertActionResults(
            await client.analyze(AnalyzeActionNames.PiiEntityRecognition, docs),
            expectation56,
          );
        });

        it("accepts domain filter", async function () {
          const docs = ["I work at Microsoft and my phone number is 333-333-3333"];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.PiiEntityRecognition, docs, "en", {
              domainFilter: KnownPiiEntityDomain.Phi,
            }),
            expectation57,
          );
        });

        it("accepts pii categories", async function () {
          const docs = ["Patient name is Joe and SSN is 859-98-0987"];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.PiiEntityRecognition, docs, "en", {
              categoriesFilter: [KnownPiiEntityCategory.USSocialSecurityNumber],
            }),
            expectation58,
          );
        });

        // TODO: Fix the tests. Tracking issue https://github.com/Azure/azure-sdk-for-js/issues/30395
        it.skip("output pii categories are accepted as input", async function () {
          const docs = ["Patient name is Joe and SSN is 859-98-0987"];
          assertActionResults(
            await client.analyze(AnalyzeActionNames.PiiEntityRecognition, docs),
            expectation59,
          );
          assertActionResults(
            await client.analyze(AnalyzeActionNames.PiiEntityRecognition, docs, "en", {
              categoriesFilter: [expectation59[0].entities[1].category],
            }),
            expectation58,
          );
        });
      });

      describe("#EntityLinking", function () {
        it("client throws on empty list", async function () {
          return assert.isRejected(
            client.analyze(AnalyzeActionNames.EntityLinking, []),
            /non-empty array/,
          );
        });

        it("client accepts string[] with no language", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.EntityLinking, testDataEn),
            expectation60,
          );
        });

        it("client accepts string[] with a language specified", async function () {
          assertActionResults(
            await client.analyze(AnalyzeActionNames.EntityLinking, testDataEn, "en"),
            expectation60,
          );
        });

        it("service errors on unsupported language", async function () {
          const [result] = await client.analyze(
            AnalyzeActionNames.EntityLinking,
            ["This is some text, but it doesn't matter."],
            "notalanguage",
          );
          if (result.error === undefined) {
            assert.fail("Expected an error from the service");
          }
          assert.equal(result.error.code, KnownTextAnalysisErrorCode.UnsupportedLanguageCode);
        });

        it("client accepts mixed-language TextDocumentInput[]", async function () {
          const enDocs = testDataEn.slice(2).map((text) => ({
            id: getId(),
            language: "en",
            text,
          }));
          const esDocs = testDataEs.slice(2).map((text) => ({
            id: getId(),
            language: "es",
            text,
          }));
          const docs = enDocs.concat(esDocs);

          assertActionResults(
            await client.analyze(AnalyzeActionNames.EntityLinking, docs),
            expectation62,
          );
        });

        it("client throws exception for too many inputs", async function () {
          const enDocs = testDataEn.map((text) => ({
            id: getId(),
            language: "en",
            text,
          }));
          const esDocs = testDataEs.map((text) => ({
            id: getId(),
            language: "es",
            text,
          }));
          const docs = enDocs.concat(esDocs);

          await assertRestError(client.analyze(AnalyzeActionNames.EntityRecognition, docs), {
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
              checkEntityTextOffset,
            );
          });
          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              10,
              11,
              checkEntityTextOffset,
            );
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩‍👩‍👧‍👧 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              17,
              11,
              checkEntityTextOffset,
            );
          });

          it("family emoji with skin tone modifier", async function (this: Context) {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              25,
              11,
              checkEntityTextOffset,
            );
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              9,
              11,
              checkEntityTextOffset,
            );
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              10,
              11,
              checkEntityTextOffset,
            );
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              8,
              11,
              checkEntityTextOffset,
            );
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              8,
              11,
              checkEntityTextOffset,
            );
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(
              client,
              "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987",
              KnownStringIndexType.Utf16CodeUnit,
              121,
              11,
              checkEntityTextOffset,
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
              11,
            ); // offset was 8 with UTF16
          });

          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              8,
              11,
            ); // offset was 10 with UTF16
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩‍👩‍👧‍👧 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              13,
              11,
            ); // offset was 17 with UTF16
          });

          it("family emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              17,
              11,
            ); // offset was 25 with UTF16
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              9,
              11,
            );
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              10,
              11,
            );
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              8,
              11,
            );
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              8,
              11,
            );
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(
              client,
              "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987",
              KnownStringIndexType.UnicodeCodePoint,
              121,
              11,
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
              11,
            ); // offset was 8 with UTF16
          });

          it("emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              7,
              11,
            ); // offset was 10 with UTF16
          });

          it("family emoji", async function () {
            await checkOffsetAndLength(
              client,
              "👩‍👩‍👧‍👧 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              7,
              11,
            ); // offset was 17 with UTF16
          });

          it("family emoji with skin tone modifier", async function () {
            await checkOffsetAndLength(
              client,
              "👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              7,
              11,
            ); // offset was 25 with UTF16
          });

          it("diacritics nfc", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              9,
              11,
            );
          });

          it("diacritics nfd", async function () {
            await checkOffsetAndLength(
              client,
              "año SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              9,
              11,
            ); // offset was 10 with UTF16
          });

          it("korean nfc", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              8,
              11,
            );
          });

          it("korean nfd", async function () {
            await checkOffsetAndLength(
              client,
              "아가 SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              8,
              11,
            );
          });

          it("zalgo", async function () {
            await checkOffsetAndLength(
              client,
              "ơ̵̧̧̢̳̘̘͕͔͕̭̟̙͎͈̞͔̈̇̒̃͋̇̅͛̋͛̎́͑̄̐̂̎͗͝m̵͍͉̗̄̏͌̂̑̽̕͝͠g̵̢̡̢̡̨̡̧̛͉̞̯̠̤̣͕̟̫̫̼̰͓̦͖̣̣͎̋͒̈́̓̒̈̍̌̓̅͑̒̓̅̅͒̿̏́͗̀̇͛̏̀̈́̀̊̾̀̔͜͠͝ͅ SSN: 859-98-0987",
              KnownStringIndexType.TextElementsV8,
              9,
              11,
            ); // offset was 121 with UTF16
          });
        });
      });
    });
  });
});
