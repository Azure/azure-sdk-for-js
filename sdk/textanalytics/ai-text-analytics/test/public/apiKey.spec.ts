// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use as chaiUse } from "chai";
import chaiPromises from "chai-as-promised";
chaiUse(chaiPromises);

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";

import { createClient, createRecorder } from "./utils/recordedClient";
import { TextAnalyticsClient } from "../../src";
import { assertAllSuccess } from "./utils/resultHelper";
import { checkEntityTextOffset } from "./utils/stringIndexTypeHelpers";

const testDataEn = [
  "I had a wonderful trip to Seattle last week and even visited the Space Needle 2 times!",
  "Unfortunately, it rained during my entire trip to Seattle. I didn't even get to visit the Space Needle",
  "I went to see a movie on Saturday and it was perfectly average, nothing more or less than I expected.",
  "I didn't like the last book I read at all."
];

describe("[API Key] TextAnalyticsClient", function() {
  let recorder: Recorder;
  let client: TextAnalyticsClient;
  // eslint-disable-next-line no-invalid-this
  const CLITimeout = this.timeout();
  const fastTimeout = 10000;

  beforeEach(function() {
    // eslint-disable-next-line no-invalid-this
    recorder = createRecorder(this);
    client = createClient("APIKey");
  });

  afterEach(async function() {
    await recorder.stop();
  });

  describe("fast tests", function() {
    before(function() {
      // eslint-disable-next-line no-invalid-this
      this.timeout(fastTimeout);
    });

    it("#analyzeSentiment", async function() {
      const results = await client.analyzeSentiment(testDataEn);
      assert.equal(results.length, testDataEn.length);
      assertAllSuccess(results);
    });

    it("#detectLanguage", async function() {
      const results = await client.detectLanguage(["impossible"], "fr");
      assert.equal(results.length, 1);
      assertAllSuccess(results);
    });

    it("#extractKeyPhrases", async function() {
      const results = await client.extractKeyPhrases([
        "I had a wonderful trip to Seattle last weekend"
      ]);
      assert.equal(results.length, 1);
      assertAllSuccess(results);
    });

    it("#recognizeEntities", async function() {
      const results = await client.recognizeEntities([
        "I had a wonderful trip to Seattle last weekend."
      ]);
      assert.equal(results.length, 1);
      assertAllSuccess(results);
    });

    it("#recognizeLinkedEntities", async function() {
      const results = await client.recognizeLinkedEntities(["the Roman god Mars"]);
      assert.equal(results.length, 1);
      assertAllSuccess(results);
    });

    it("#recognizePiiEntities", async function() {
      const results = await client.recognizePiiEntities([
        "Your social-security number is 078-05-1120."
      ]);
      assert.equal(results.length, 1);
      assertAllSuccess(results);
    });
  });

  describe("LROs", function() {
    const pollingInterval = isPlaybackMode() ? 0 : 2000;

    before(function() {
      // eslint-disable-next-line no-invalid-this
      this.timeout(isPlaybackMode() ? fastTimeout : CLITimeout);
    });

    describe("#health", function() {
      it("input strings", async function() {
        const poller = await client.beginAnalyzeHealthcareEntities(
          [
            "Patient does not suffer from high blood pressure.",
            "Prescribed 100mg ibuprofen, taken twice daily."
          ],
          "en",
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        const doc1 = (await result.next()).value;
        if (!doc1.error) {
          assert.ok(doc1.id);
          assert.ok(doc1.entities);
          const doc1Entity1 = doc1.entities[0];
          assert.equal(doc1Entity1.text, "high blood pressure");
        }

        const doc2 = (await result.next()).value;
        if (!doc2.error) {
          assert.ok(doc2.id);
          assert.ok(doc2.entities);
          const doc2Entity1 = doc2.entities[0];
          assert.equal(doc2Entity1.text, "100mg");
          const doc2Entity1Target1 = doc2Entity1.relatedEntities.keys().next().value;
          const doc2Entity1Edge1Label = doc2Entity1.relatedEntities.values().next().value;
          assert.equal(doc2Entity1Target1.text, "ibuprofen");
          assert.equal(doc2Entity1Edge1Label, "DosageOfMedication");
          assert.deepEqual(doc2.entityRelations[0], {
            relationType: "DosageOfMedication",
            roles: [
              {
                entity: doc2.entities[0],
                role: "Attribute"
              },
              {
                entity: doc2.entities[1],
                role: "Entity"
              }
            ]
          });
          assert.deepEqual(doc2.entityRelations[1], {
            relationType: "FrequencyOfMedication",
            roles: [
              {
                entity: doc2.entities[1],
                role: "Entity"
              },
              {
                entity: doc2.entities[2],
                role: "Attribute"
              }
            ]
          });

          const doc2Entity2 = doc2.entities[1];
          assert.equal(doc2Entity2.text, "ibuprofen");

          const doc2Entity3 = doc2.entities[2];
          assert.equal(doc2Entity3.text, "twice daily");
          const doc2Entity3Target1 = doc2Entity3.relatedEntities.keys().next().value;
          const doc2Entity3Edge1Label = doc2Entity3.relatedEntities.values().next().value;
          assert.equal(doc2Entity3Target1.text, "ibuprofen");
          assert.equal(doc2Entity3Edge1Label, "FrequencyOfMedication");
        }
      });

      it("input documents", async function() {
        const poller = await client.beginAnalyzeHealthcareEntities(
          [
            { id: "1", text: "Patient does not suffer from high blood pressure.", language: "en" },
            { id: "2", text: "Prescribed 100mg ibuprofen, taken twice daily.", language: "en" }
          ],
          {
            updateIntervalInMs: pollingInterval
          }
        );
        const result = await poller.pollUntilDone();
        for await (const doc of result) {
          if (!doc.error) {
            assert.ok(doc.id);
            assert.ok(doc.entities);
          }
        }
      });

      it("some inputs with errors", async function() {
        const docs = [
          { id: "1", language: "en", text: "" },
          {
            id: "2",
            language: "english",
            text: "Patient does not suffer from high blood pressure."
          },
          { id: "3", language: "en", text: "Prescribed 100mg ibuprofen, taken twice daily." }
        ];

        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
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

      it("all inputs with errors", async function() {
        const docs = [
          { id: "1", language: "en", text: "" },
          {
            id: "2",
            language: "english",
            text: "Patient does not suffer from high blood pressure."
          },
          { id: "3", language: "en", text: "" }
        ];

        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        const result1 = (await result.next()).value;
        const result2 = (await result.next()).value;
        const result3 = (await result.next()).value;
        assert.ok(result1.error);
        assert.ok(result2.error);
        assert.ok(result3.error);
      });

      it("too many documents", async function() {
        const docs = Array(11).fill("random text");
        try {
          const response = await client.beginAnalyzeHealthcareEntities(docs, "en", {
            updateIntervalInMs: pollingInterval
          });
          console.log(response);
          assert.fail("Oops, an exception didn't happen.");
        } catch (e) {
          assert.equal(e.statusCode, 400);
          assert.equal(e.code, "InvalidDocumentBatch");
          assert.equal(
            e.message,
            "Batch request contains too many records. Max 10 records are permitted."
          );
        }
      });

      it("payload too large", async function() {
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
        try {
          await client.beginAnalyzeHealthcareEntities(docs, "en", {
            updateIntervalInMs: pollingInterval
          });
          assert.fail("Oops, an exception didn't happen.");
        } catch (e) {
          assert.equal(e.statusCode, 413);
          assert.equal(e.code, "InvalidDocumentBatch");
          assert.equal(
            e.message,
            "Request Payload sent is too large to be processed. Limit request size to: 524288"
          );
        }
      });

      it("document warnings", async function() {
        const docs = [{ id: "1", text: "This won't actually create a warning :'(" }];
        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        for await (const doc of result) {
          if (!doc.error) {
            assert.equal(doc.warnings.length, 0);
          }
        }
      });

      it("output has the same order as input", async function() {
        const docs = [
          { id: "1", text: "one" },
          { id: "2", text: "two" },
          { id: "3", text: "three" },
          { id: "4", text: "four" },
          { id: "5", text: "five" }
        ];
        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        let i = 0;
        for await (const doc of result) {
          assert.equal(parseInt(doc.id), ++i);
        }
      });

      it("output has the same order as input with out of order IDs", async function() {
        const docs = [
          { id: "56", text: ":)" },
          { id: "0", text: ":(" },
          { id: "22", text: "" },
          { id: "19", text: ":P" },
          { id: "1", text: ":D" }
        ];
        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        const in_order = [56, 0, 22, 19, 1];
        let i = 0;
        for await (const doc of result) {
          assert.equal(parseInt(doc.id), in_order[i++]);
        }
      });

      it("show stats and model version", async function() {
        const docs = [
          { id: "56", text: ":)" },
          { id: "0", text: ":(" },
          { id: "22", text: "" },
          { id: "19", text: ":P" },
          { id: "1", text: ":D" }
        ];
        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          modelVersion: "latest",
          includeStatistics: true,
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        assert.ok(result);
        assert.ok(result.modelVersion);
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

        const poller = await client.beginAnalyzeHealthcareEntities(docs, "en", {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        for await (const doc of result) {
          assert.isUndefined(doc.error);
        }
      });

      it("whole batch empty language hint", async function() {
        const docs = [
          "This was the best day of my life.",
          "I did not like the hotel we stayed at. It was too expensive.",
          "The restaurant was not as good as I hoped."
        ];

        const poller = await client.beginAnalyzeHealthcareEntities(docs, "", {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        for await (const doc of result) {
          assert.isUndefined(doc.error);
        }
      });

      it("whole batch empty language hint per doc", async function() {
        const docs = [
          { id: "1", language: "", text: "I will go to the park." },
          { id: "2", language: "", text: "I did not like the hotel we stayed at." },
          { id: "3", text: "The restaurant had really good food." }
        ];

        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        for await (const doc of result) {
          assert.isUndefined(doc.error);
        }
      });

      it("whole batch with multiple languages", async function() {
        const docs = [
          { id: "1", text: "I should take my cat to the veterinarian." },
          { id: "2", text: "Este es un document escrito en Español." },
          { id: "3", text: "猫は幸せ" }
        ];

        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        for await (const doc of result) {
          assert.isUndefined(doc.error);
        }
      });

      it("invalid language hint", async function() {
        const docs = ["This should fail because we're passing in an invalid language hint"];

        const poller = await client.beginAnalyzeHealthcareEntities(docs, "notalanguage", {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        const firstResult = (await result.next()).value;
        assert.equal(firstResult.error?.code, "UnsupportedLanguageCode");
      });

      it("invalid language hint in doc", async function() {
        const docs = [
          {
            id: "1",
            language: "notalanguage",
            text: "This should fail because we're passing in an invalid language hint"
          }
        ];

        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
        });
        const result = await poller.pollUntilDone();
        const firstResult = (await result.next()).value;
        assert.equal(firstResult.error?.code, "UnsupportedLanguageCode");
      });

      /**
       * The service accepts bad model names
       */
      it.skip("bad model", async function() {
        const docs = [
          {
            id: "1",
            language: "en",
            text: "This should fail because we're passing in an invalid language hint"
          }
        ];

        try {
          await client.beginAnalyzeHealthcareEntities(docs, {
            modelVersion: "bad",
            updateIntervalInMs: pollingInterval
          });
          assert.fail("Oops, an exception didn't happen.");
        } catch (e) {
          assert.equal(e.code, "ModelVersionIncorrect");
        }
      });

      it("all documents have errors", async function() {
        let text = "";
        for (let i = 0; i < 5121; ++i) {
          text = text + "x";
        }
        const docs = [
          { id: "1", text: "" },
          { id: "2", language: "english", text: "I did not like the hotel we stayed at." },
          { id: "3", text: text }
        ];

        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
        });
        const doc_errors = await poller.pollUntilDone();
        assert.equal((await doc_errors.next()).value.error?.code, "InvalidDocument");
        assert.equal((await doc_errors.next()).value.error?.code, "UnsupportedLanguageCode");
        assert.equal((await doc_errors.next()).value.error?.code, "InvalidDocument");
      });

      it("documents with duplicate IDs", async function() {
        const docs = [
          { id: "1", text: "hello world" },
          { id: "1", text: "I did not like the hotel we stayed at." }
        ];

        try {
          await client.beginAnalyzeHealthcareEntities(docs, {
            updateIntervalInMs: pollingInterval
          });
          assert.fail("Oops, an exception didn't happen.");
        } catch (e) {
          assert.equal(e.code, "InvalidRequest");
        }
      });

      /**
       * the service by default returns pages of 20 documents each and this test
       * makes sure we get all the results and not just the first page.
       *
       * EDIT: the service decided to process only 10 documents max per request so
       * pagination became unneeded. Once the service raises the limit on
       * the number of input documents, we should re-enable these tests.
       */
      it.skip("paged results one loop", async function() {
        const docs = Array(40).fill("random text");
        docs.push("Prescribed 100mg ibuprofen, taken twice daily.");
        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
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

      it.skip("paged results nested loop", async function() {
        const docs = Array(40).fill("random text");
        docs.push("Prescribed 100mg ibuprofen, taken twice daily.");
        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
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

      it.skip("paged results with custom page size", async function() {
        const docs = Array(40).fill("random text");
        docs.push("Prescribed 100mg ibuprofen, taken twice daily.");
        const poller = await client.beginAnalyzeHealthcareEntities(docs, {
          updateIntervalInMs: pollingInterval
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

      it("cancelled", async function() {
        const poller = await client.beginAnalyzeHealthcareEntities(
          [
            { id: "1", text: "Patient does not suffer from high blood pressure.", language: "en" },
            { id: "2", text: "Prescribed 100mg ibuprofen, taken twice daily.", language: "en" }
          ],
          {
            updateIntervalInMs: pollingInterval
          }
        );
        if (!poller.isDone()) {
          await poller.cancelOperation();
        }
        assert.ok(poller.getOperationState().isCancelled);
      });

      it("operation metadata", async function() {
        const poller = await client.beginAnalyzeHealthcareEntities(
          [
            { id: "1", text: "Patient does not suffer from high blood pressure.", language: "en" },
            { id: "2", text: "Prescribed 100mg ibuprofen, taken twice daily.", language: "en" }
          ],
          {
            updateIntervalInMs: pollingInterval
          }
        );
        poller.onProgress(() => {
          assert.ok(poller.getOperationState().createdOn, "createdOn is undefined!");
          assert.ok(poller.getOperationState().expiresOn, "expiresOn is undefined!");
          assert.ok(poller.getOperationState().lastModifiedOn, "lastModifiedOn is undefined!");
          assert.ok(poller.getOperationState().status, "status is undefined!");
        });
        const result = await poller.pollUntilDone();
        assert.ok(result);
      });

      it("family emoji wit skin tone modifier with Utf16CodeUnit", async function() {
        const doc = "👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen";
        const poller = await client.beginAnalyzeHealthcareEntities(
          [{ id: "0", text: doc, language: "en" }],
          {
            updateIntervalInMs: pollingInterval
          }
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

      it("family emoji wit skin tone modifier with UnicodeCodePoint", async function() {
        const poller = await client.beginAnalyzeHealthcareEntities(
          [{ id: "0", text: "👩🏻‍👩🏽‍👧🏾‍👦🏿 ibuprofen", language: "en" }],
          {
            updateIntervalInMs: pollingInterval,
            stringIndexType: "UnicodeCodePoint"
          }
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
