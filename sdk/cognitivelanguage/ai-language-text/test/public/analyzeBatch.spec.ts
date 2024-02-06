// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeBatchActionNames,
  KnownExtractiveSummarizationOrderingCriteria,
  KnownPiiEntityCategory,
  KnownPiiEntityDomain,
  KnownStringIndexType,
  KnownTextAnalysisErrorCode,
  TextAnalysisClient,
} from "../../src";
import { AuthMethod, createClient, startRecorder } from "./utils/recordedClient";
import { Context, Suite } from "mocha";
import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
import { assertActionsResults, assertRestError } from "./utils/resultHelper";
import {
  expectation10,
  expectation11,
  expectation12,
  expectation13,
  expectation14,
  expectation15,
  expectation16,
  expectation17,
  expectation18,
  expectation19,
  expectation20,
  expectation22,
  expectation23,
  expectation24,
  expectation26,
  expectation27,
  expectation28,
  expectation29,
  expectation3,
  expectation5,
  expectation6,
  expectation7,
  expectation8,
  expectation9,
  expectation30,
  expectation31,
} from "./expectations";
import { authModes, windows365ArticlePart1, windows365ArticlePart2 } from "./inputs";

const excludedSummarizationProperties = {
  excludedAdditionalProps: ["text", "rankScore", "offset", "length"],
};

matrix(authModes, async (authMethod: AuthMethod) => {
  describe(`[${authMethod}] TextAnalysisClient`, function (this: Suite) {
    let recorder: Recorder;
    let client: TextAnalysisClient;

    beforeEach(async function (this: Context) {
      recorder = await startRecorder(this.currentTest);
      client = createClient(authMethod, {
        recorder,
      });
    });

    afterEach(async function () {
      await recorder.stop();
    });

    describe("analyzeBatch", function () {
      const pollingInterval = isPlaybackMode() ? 0 : 2000;

      describe("actions", function () {
        describe("prebuilt", function () {
          it("entity recognition", async function () {
            const docs = [
              {
                id: "1",
                language: "en",
                text: "Microsoft was founded by Bill Gates and Paul Allen",
              },
              {
                id: "2",
                language: "es",
                text: "Microsoft fue fundado por Bill Gates y Paul Allen",
              },
            ];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.EntityRecognition,
                  modelVersion: "latest",
                },
              ],
              docs,
              {
                updateIntervalInMs: pollingInterval,
              }
            );

            await assertActionsResults(await poller.pollUntilDone(), expectation3);
          });

          it("key phrase extraction", async function () {
            const docs = [
              {
                id: "1",
                language: "en",
                text: "Microsoft was founded by Bill Gates and Paul Allen",
              },
              {
                id: "2",
                language: "es",
                text: "Microsoft fue fundado por Bill Gates y Paul Allen",
              },
            ];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
                  modelVersion: "latest",
                },
              ],
              docs,
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation5);
          });

          // The operation never starts and stay stuck in "notStarted" state
          it.skip("entity linking", async function () {
            const docs = [
              "Microsoft moved its headquarters to Bellevue, Washington in January 1979.",
              "Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.",
            ];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.EntityLinking,
                  modelVersion: "latest",
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation6);
          });

          it("pii entity recognition", async function () {
            const docs = [
              "My SSN is 859-98-0987.",
              "Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
              "Is 998.214.865-68 your Brazilian CPF number?",
            ];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                  modelVersion: "latest",
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation7);
          });

          it("pii entity recognition with filtered categories", async function () {
            const docs = [
              "My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
              "Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
            ];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                  modelVersion: "latest",
                  categoriesFilter: [KnownPiiEntityCategory.USSocialSecurityNumber],
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation8);
          });

          it("pii entity recognition with phi domain", async function () {
            const docs = [
              "My SSN is 859-98-0987 and your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
              "Your ABA number - 111000025 - is the first 9 digits in the lower left hand corner of your personal check.",
            ];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                  modelVersion: "latest",
                  domainFilter: KnownPiiEntityDomain.Phi,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation24);
          });

          it("sentiment analysis with opinion mining", async function () {
            const docs = [
              "The food was unacceptable",
              "The rooms were beautiful. The AC was good and quiet.",
              "The breakfast was good, but the toilet was smelly.",
              "Loved this hotel - good breakfast - nice shuttle service - clean rooms.",
              "I had a great unobstructed view of the Microsoft campus.",
              "Nice rooms but bathrooms were old and the toilet was dirty when we arrived.",
              "The toilet smelled.",
            ];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.SentimentAnalysis,
                  modelVersion: "latest",
                  includeOpinionMining: true,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation9);
          });

          it.skip("healthcare", async function () {
            const docs = [
              "Patient does not suffer from high blood pressure.",
              "Prescribed 100mg ibuprofen, taken twice daily.",
              "Baby not likely to have Meningitis. in case of fever in the mother, consider Penicillin for the baby too.",
            ];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.Healthcare,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation20);
          });

          it("extractive summarization", async function () {
            const docs = [windows365ArticlePart1, windows365ArticlePart2];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.ExtractiveSummarization,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );

            await assertActionsResults(
              await poller.pollUntilDone(),
              expectation27,
              excludedSummarizationProperties
            );
          });

          it("extractive summarization with maxSentenceCount", async function () {
            const docs = [windows365ArticlePart1, windows365ArticlePart2];
            const maxSentenceCount = 2;
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.ExtractiveSummarization,
                  maxSentenceCount,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            const results = await poller.pollUntilDone();

            // The max sentence count is 2, so the number of sentences should be 2 or less
            for await (const actionResult of results) {
              if (actionResult.kind === "ExtractiveSummarization" && !actionResult.error) {
                for (const result of actionResult.results) {
                  if (!result.error) {
                    assert.isAtMost(
                      result.sentences.length,
                      maxSentenceCount,
                      `Exceeded maximum sentence count, expected ${maxSentenceCount}`
                    );
                  }
                }
              }
            }

            await assertActionsResults(results, expectation28, excludedSummarizationProperties);
          });

          it("extractive summarization with orderBy", async function () {
            const docs = [windows365ArticlePart1, windows365ArticlePart2];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.ExtractiveSummarization,
                  orderBy: KnownExtractiveSummarizationOrderingCriteria.Rank,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            const results = await poller.pollUntilDone();

            // Assert that the sentences are in descending rankScore order
            for await (const actionResult of results) {
              if (actionResult.kind === "ExtractiveSummarization" && !actionResult.error) {
                for (const result of actionResult.results) {
                  if (!result.error) {
                    assert.isTrue(
                      result.sentences.every(
                        (sentence, i) =>
                          i === 0 || sentence.rankScore <= result.sentences[i - 1].rankScore
                      ),
                      "Expected the sentences to be in descending order"
                    );
                  }
                }
              }
            }
            await assertActionsResults(results, expectation29, excludedSummarizationProperties);
          });

          it("abstractive summarization", async function () {
            const docs = [windows365ArticlePart1, windows365ArticlePart2];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.AbstractiveSummarization,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation30, {
              ...excludedSummarizationProperties,
            });
          });

          it("abstractive summarization with sentenceCount", async function () {
            const docs = [windows365ArticlePart1, windows365ArticlePart2];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.AbstractiveSummarization,
                  sentenceCount: 1,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation31, {
              ...excludedSummarizationProperties,
            });
          });
        });
      });

      describe("general behavior", function () {
        describe("errors and warnings", function () {
          it("bad request empty string", async function () {
            const docs = [""];
            await assertRestError(
              client.beginAnalyzeBatch(
                [{ kind: AnalyzeBatchActionNames.EntityRecognition }],
                docs,
                "en",
                {
                  updateIntervalInMs: pollingInterval,
                }
              ),
              {
                code: KnownTextAnalysisErrorCode.InvalidDocumentBatch,
                statusCode: 400,
              }
            );
          });

          it("malformed action", async function () {
            const docs = ["I will go to the park."];
            await assertRestError(
              client.beginAnalyzeBatch(
                [
                  {
                    kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                    modelVersion: "bad",
                  },
                ],
                docs,
                "en",
                {
                  updateIntervalInMs: pollingInterval,
                }
              ),
              {
                code: KnownTextAnalysisErrorCode.InvalidParameterValue,
                statusCode: 400,
              }
            );
          });

          it("duplicate actions of the same type are disallowed", async function () {
            const docs = ["I will go to the park."];
            await assertRestError(
              client.beginAnalyzeBatch(
                [
                  {
                    kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                  },
                  {
                    kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                  },
                ],
                docs,
                "en",
                {
                  updateIntervalInMs: pollingInterval,
                }
              ),
              {
                code: KnownTextAnalysisErrorCode.InvalidRequestBodyFormat,
                statusCode: 400,
                messagePattern: /Duplicate task name/,
              }
            );
          });

          it("too many documents", async function () {
            const docs = Array(26).fill("random text");
            await assertRestError(
              client.beginAnalyzeBatch(
                [
                  {
                    kind: AnalyzeBatchActionNames.Healthcare,
                  },
                ],
                docs,
                "en",
                {
                  updateIntervalInMs: pollingInterval,
                }
              ),
              {
                code: KnownTextAnalysisErrorCode.InvalidDocumentBatch,
                statusCode: 400,
                messagePattern: /Batch request contains too many records/,
              }
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
              client.beginAnalyzeBatch(
                [
                  {
                    kind: AnalyzeBatchActionNames.Healthcare,
                  },
                ],
                docs,
                "en",
                {
                  updateIntervalInMs: pollingInterval,
                }
              ),
              {
                code: KnownTextAnalysisErrorCode.InvalidDocumentBatch,
                statusCode: 413,
                messagePattern: /Request Payload sent is too large to be processed/,
              }
            );
          });
        });

        it("unique multiple actions per type are allowed", async function () {
          const docs = ["I will go to the park."];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                actionName: "action1",
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                actionName: "action2",
              },
            ],
            docs,
            "en",
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation19);
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
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation10);
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
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation11);
        });

        it("output order is same as the input's one with multiple actions", async function () {
          const docs = [
            { id: "1", text: "one" },
            { id: "2", text: "two" },
            { id: "3", text: "three" },
            { id: "4", text: "four" },
            { id: "5", text: "five" },
          ];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation12);
        });

        it("out of order input IDs with multiple actions", async function () {
          const docs = [
            { id: "56", text: ":)" },
            { id: "0", text: ":(" },
            { id: "22", text: "w" },
            { id: "19", text: ":P" },
            { id: "1", text: ":D" },
          ];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation13);
        });

        // The service says there is 6 documents instead of 5
        it.skip("statistics", async function () {
          const docs = [":)", ":(", "", ":P", ":D"];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            "en",
            {
              updateIntervalInMs: pollingInterval,
              includeStatistics: true,
            }
          );
          const actions = await poller.pollUntilDone();
          for await (const action of actions) {
            const actionStats = action.statistics;
            if (!actionStats) {
              assert.fail(`statistics are missing`);
            }
            assert.equal(actionStats.documentCount, 5);
            assert.equal(actionStats.transactionCount, 4);
            assert.equal(actionStats.validDocumentCount, 4);
            assert.equal(actionStats.erroneousDocumentCount, 1);
            if (!action.error) {
              for (const doc of action.results) {
                if (!doc.error) {
                  const docStats = doc.statistics!;
                  assert.equal(docStats.characterCount, 2);
                  assert.equal(docStats.transactionCount, 1);
                }
              }
            }
          }
        });

        it("whole batch with a language hint", async function () {
          const docs = [
            "This was the best day of my life.",
            "I did not like the hotel we stayed at. It was too expensive.",
            "The restaurant was not as good as I hoped.",
          ];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            "en",
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation14);
        });

        it("whole batch input with no language hint", async function () {
          const docs = [
            { id: "1", text: "I will go to the park." },
            { id: "2", text: "Este es un document escrito en Español." },
            { id: "3", text: "猫は幸せ" },
          ];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation15);
        });

        it("invalid language hint", async function () {
          const docs = ["This should fail because we're passing in an invalid language hint"];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            "notalanguage",
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation16);
        });

        it("paged results with custom page size", async function () {
          const totalDocs = 25;
          const docs = Array(totalDocs - 1).fill("random text");
          docs.push("Microsoft was founded by Bill Gates and Paul Allen");
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.KeyPhraseExtraction,
              },
            ],
            docs,
            "en",
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          await assertActionsResults(await poller.pollUntilDone(), expectation17, {
            maxPageSize: 10,
          });
        });

        it("operation metadata", async function () {
          const docs = ["I will go to the park."];
          const poller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
            ],
            docs,
            "end",
            {
              updateIntervalInMs: pollingInterval,
              displayName: "testJob",
            }
          );
          poller.onProgress((state) => {
            assert.ok(state.createdOn, "createdOn is undefined!");
            assert.ok(state.expiresOn, "expiresOn is undefined!");
            assert.ok(state.modifiedOn, "modifiedOn is undefined!");
            assert.ok(state.status, "status is undefined!");
            assert.ok(state.id, "id is undefined!");
            assert.equal(state.displayName, "testJob");
            assert.isDefined(state.actionSucceededCount, "actionSucceededCount is undefined!");
            assert.equal(state.actionFailedCount, 0);
            assert.isDefined(state.actionInProgressCount, "actionInProgressCount is undefined!");
          });
          await poller.pollUntilDone();
        });

        // FIXME: see https://github.com/Azure/azure-sdk-for-js/issues/23616
        it.skip("cancel after progress", async function () {
          const docs = [
            "Patient does not suffer from high blood pressure.",
            "Prescribed 100mg ibuprofen, taken twice daily.",
          ];
          const actions = [
            {
              kind: AnalyzeBatchActionNames.Healthcare,
            },
            {
              kind: AnalyzeBatchActionNames.EntityRecognition,
            },
            {
              kind: AnalyzeBatchActionNames.PiiEntityRecognition,
            },
            {
              kind: AnalyzeBatchActionNames.SentimentAnalysis,
              includeOpinionMining: true,
            },
          ];
          const poller = await client.beginAnalyzeBatch(actions, docs, "en", {
            updateIntervalInMs: 100,
          });
          const pollPromise = poller.pollUntilDone();
          poller.onProgress(async (state) => {
            if (state.actionInProgressCount < actions.length) {
              await poller.sendCancellationRequest();
            }
          });
          await assert.isRejected(pollPromise, /Operation was canceled/);
          assert.equal(poller.getOperationState().status, "canceled");
          const results = poller.getResult();
          if (results === undefined) {
            assert.fail(`No results found`);
          }
          let nonEmptyResult = false;
          for await (const actionResult of results) {
            nonEmptyResult = true;
            if (actionResult.error) {
              assert.fail("Unexpected failed action");
            }
          }
          assert.isTrue(nonEmptyResult);
        });

        it("rehydrated polling", async function () {
          const docs = [
            { id: "0", language: "en", text: "Patient does not suffer from high blood pressure." },
            { id: "1", language: "en", text: "Prescribed 100mg ibuprofen, taken twice daily." },
          ];
          const originalPoller = await client.beginAnalyzeBatch(
            [
              {
                kind: AnalyzeBatchActionNames.Healthcare,
              },
              {
                kind: AnalyzeBatchActionNames.EntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.PiiEntityRecognition,
              },
              {
                kind: AnalyzeBatchActionNames.SentimentAnalysis,
                includeOpinionMining: true,
              },
            ],
            docs,
            {
              updateIntervalInMs: pollingInterval,
            }
          );
          if (originalPoller.isDone()) {
            assert.fail("Operation finished processing before creating a new poller");
          }
          const serializedState = originalPoller.toString();
          assert.deepEqual(
            JSON.parse(serializedState).state.docIds,
            docs.map(({ id }) => id)
          );
          const rehydratedPoller = await client.restoreAnalyzeBatchPoller(serializedState, {
            updateIntervalInMs: pollingInterval,
          });
          await assertActionsResults(await rehydratedPoller.pollUntilDone(), expectation26);
          await assertActionsResults(await originalPoller.pollUntilDone(), expectation26);
        });

        describe("stringIndexType", function () {
          it("family emoji with skin tone modifier", async function () {
            const docs = ["👩🏻‍👩🏽‍👧🏾‍👦🏿 SSN: 859-98-0987"];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.PiiEntityRecognition,
                  stringIndexType: KnownStringIndexType.UnicodeCodePoint,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation18);
          });

          it("family emoji with skin tone modifier with Utf16CodeUnit", async function () {
            const docs = ["👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen"];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.Healthcare,
                  stringIndexType: KnownStringIndexType.Utf16CodeUnit,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation22);
          });

          it("family emoji with skin tone modifier with UnicodeCodePoint", async function () {
            const docs = ["👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen"];
            const poller = await client.beginAnalyzeBatch(
              [
                {
                  kind: AnalyzeBatchActionNames.Healthcare,
                  stringIndexType: KnownStringIndexType.UnicodeCodePoint,
                },
              ],
              docs,
              "en",
              {
                updateIntervalInMs: pollingInterval,
              }
            );
            await assertActionsResults(await poller.pollUntilDone(), expectation23);
          });
        });
      });
    });
  });
});
