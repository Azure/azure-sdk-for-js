// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type {
  AutocompleteResult,
  SearchFieldArray,
  SearchIndex,
  SearchIndexClient,
  SelectArray,
  SelectFields,
} from "../../../src/index.js";
import { AzureKeyCredential, IndexDocumentsBatch, SearchClient } from "../../../src/index.js";
import { defaultServiceVersion } from "../../../src/serviceUtils.js";
import type { Hotel } from "../utils/interfaces.js";
import { createClients } from "../utils/recordedClient.js";
import {
  createIndex,
  createRandomIndexName,
  getMockQueryEmbedding,
  populateIndex,
  WAIT_TIME,
} from "../utils/setup.js";

describe("SearchClient", { timeout: 20_000 }, () => {
  describe("constructor", () => {
    const credential = new AzureKeyCredential("key");

    describe("Passing serviceVersion", () => {
      const [correctServiceVersion, incorrectServiceVersion] = ["correct", "incorrect"];
      it("supports passing serviceVersion", () => {
        const client = new SearchClient<Hotel>("", "", credential, {
          serviceVersion: correctServiceVersion,
        });
        assert.equal(correctServiceVersion, client.serviceVersion);
        assert.equal(correctServiceVersion, client.apiVersion);
      });

      it("supports passing the deprecated apiVersion", () => {
        const client = new SearchClient<Hotel>("", "", credential, {
          apiVersion: correctServiceVersion,
        });
        assert.equal(correctServiceVersion, client.serviceVersion);
        assert.equal(correctServiceVersion, client.apiVersion);
      });

      it("prioritizes `serviceVersion` over `apiVersion`", () => {
        const client = new SearchClient<Hotel>("", "", credential, {
          apiVersion: incorrectServiceVersion,
          serviceVersion: correctServiceVersion,
        });
        assert.equal(correctServiceVersion, client.serviceVersion);
        assert.equal(correctServiceVersion, client.apiVersion);
      });

      it("defaults to the current apiVersion", () => {
        const client = new SearchClient<Hotel>("", "", credential);
        assert.equal(defaultServiceVersion, client.serviceVersion);
        assert.equal(defaultServiceVersion, client.apiVersion);
      });
    });
  });

  describe("search scenarios", () => {
    let recorder: Recorder;
    let searchClient: SearchClient<Hotel>;
    let indexClient: SearchIndexClient;
    let TEST_INDEX_NAME: string;
    let indexDefinition: SearchIndex;

    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      TEST_INDEX_NAME = createRandomIndexName();
      ({
        searchClient,
        indexClient,
        indexName: TEST_INDEX_NAME,
      } = await createClients<Hotel>(defaultServiceVersion, recorder, TEST_INDEX_NAME));
      indexDefinition = await createIndex(indexClient, TEST_INDEX_NAME, defaultServiceVersion);
      await delay(WAIT_TIME);
      await populateIndex(searchClient);
    });

    afterEach(async () => {
      await indexClient.deleteIndex(TEST_INDEX_NAME);
      await delay(WAIT_TIME);
      await recorder?.stop();
    });

    const baseSemanticOptions = () =>
      ({
        queryType: "semantic",
        semanticSearchOptions: {
          configurationName:
            indexDefinition.semanticSearch?.configurations?.[0].name ??
            assert.fail("No semantic configuration in index."),
        },
      }) as const;

    it("search with semantic ranking", async () => {
      const searchResults = await searchClient.search("luxury", {
        ...baseSemanticOptions(),
        skip: 0,
        top: 5,
        includeTotalCount: true,
      });
      assert.equal(searchResults.count, 1);
    });

    it("search with answers", async () => {
      const baseOptions = baseSemanticOptions();
      const options = {
        ...baseOptions,
        semanticSearchOptions: {
          ...baseOptions.semanticSearchOptions,
          answers: { answerType: "extractive", count: 3, threshold: 0.7 },
        },
        top: 3,
        select: ["hotelId"],
      } as const;
      const searchResults = await searchClient.search(
        "What are the most luxurious hotels?",
        options,
      );

      const resultIds = [];
      for await (const result of searchResults.results) {
        resultIds.push(result.document.hotelId);
      }
      assert.deepEqual(["1", "9", "3"], resultIds);
    });

    it("count returns the correct document count", async () => {
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 10);
    });

    it("autocomplete returns the correct autocomplete result", async () => {
      const autoCompleteResult: AutocompleteResult = await searchClient.autocomplete("sec", "sg");
      assert.equal(autoCompleteResult.results.length, 1);
      assert.equal(autoCompleteResult.results[0].text, "secret");
    });

    it("autocomplete returns zero results for invalid query", async () => {
      const autoCompleteResult: AutocompleteResult = await searchClient.autocomplete(
        "garbxyz",
        "sg",
      );
      assert.isTrue(autoCompleteResult.results.length === 0);
    });

    it("search returns the correct search result", async () => {
      const searchResults = await searchClient.search("budget", {
        skip: 0,
        top: 5,
        includeTotalCount: true,
        select: ["address/streetAddress"],
      });
      assert.equal(searchResults.count, 6);
    });

    it("search narrows the result type", async () => {
      // This part of the test is only for types. This doesn't need to be called.
      // eslint-disable-next-line no-unused-expressions
      async () => {
        const response = await searchClient.search("asdf", {
          select: ["address/city"],
        });
        for await (const result of response.results) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          result.document.category = "";
        }
      };

      const hotelKeys: (keyof Hotel)[] = [
        "address",
        "category",
        "description",
        "descriptionFr",
        "hotelId",
        "hotelName",
        "lastRenovationDate",
        "location",
        "parkingIncluded",
        "rating",
        "rooms",
        "smokingAllowed",
        "tags",
      ];
      type Address = NonNullable<NonNullable<Hotel>["address"]>;
      const addressKeys: (keyof Address)[] = [
        "streetAddress",
        "city",
        "stateProvince",
        "postalCode",
        "country",
      ];
      type Room = NonNullable<NonNullable<Hotel>["rooms"]> extends (infer U)[] ? U : never;
      const roomKeys: (keyof Room)[] = [
        "description",
        "descriptionFr",
        "type",
        "baseRate",
        "bedOptions",
        "sleepsCount",
        "smokingAllowed",
        "tags",
      ];

      const select: SelectArray<SelectFields<Hotel>> = ["hotelId", "address/city", "rooms/type"];
      const selectNarrowed = ["hotelId", "address/city", "rooms/type"] as const;

      const selectPromises = [
        searchClient.search("New", {
          select,
        }),
        searchClient.search("New", {
          select: selectNarrowed,
        }),
        searchClient.search("New", {
          select: ["hotelId", "address/city", "rooms/type"],
        }),
      ];

      const selectTestPromises = selectPromises.map(async (selectPromise) => {
        const selectResults = await selectPromise;
        for await (const result of selectResults.results) {
          assert.doesNotHaveAnyKeys(
            result.document,
            hotelKeys.filter((key) => !["hotelId", "address", "rooms"].includes(key)),
          );
          assert.doesNotHaveAnyKeys(
            result.document.address,
            addressKeys.filter((key) => key !== "city"),
          );
          for (const room of result.document.rooms!) {
            assert.doesNotHaveAnyKeys(
              room,
              roomKeys.filter((key) => key !== "type"),
            );
            break;
          }
        }
      });

      await Promise.all(selectTestPromises);

      const searchFields: SearchFieldArray<Hotel> = ["address/city"];
      const searchFieldsNarrowed = ["address/city"] as const;

      const searchFieldsPromises = [
        searchClient.search("New", {
          searchFields,
        }),
        searchClient.search("New", {
          searchFields: searchFieldsNarrowed,
        }),
        searchClient.search("New", {
          searchFields: ["address/city"],
        }),
      ];

      const searchFieldsTestPromises = searchFieldsPromises.map(async (searchFieldsPromise) => {
        const searchFieldsResults = await searchFieldsPromise;
        for await (const result of searchFieldsResults.results) {
          const city = result.document.address?.city;
          if (!city) {
            assert.fail();
          }
          assert.hasAllKeys(result.document, hotelKeys);
          assert.hasAllKeys(result.document.address, addressKeys);
        }
      });

      await Promise.all(searchFieldsTestPromises);
    });

    it("search returns zero results for invalid query", async () => {
      const searchResults = await searchClient.search("garbxyz", {
        skip: 0,
        top: 5,
        includeTotalCount: true,
      });
      assert.equal(searchResults.count, 0);
    });

    it("suggest returns the correct suggestions", async () => {
      const suggestResult = await searchClient.suggest("WiFi", "sg");
      assert.equal(suggestResult.results.length, 1);
      assert.isTrue(
        suggestResult.results[0].text.startsWith("Save up to 50% off traditional hotels"),
      );
    });

    it("suggest returns zero suggestions for invalid input", async () => {
      const suggestResult = await searchClient.suggest("garbxyz", "sg");
      assert.equal(suggestResult.results.length, 0);
    });

    it("getDocument returns the correct document result", async () => {
      const getDocumentResult = await searchClient.getDocument("8");
      assert.equal(
        getDocumentResult.description,
        "Has some road noise and is next to the very police station. Bathrooms had morel coverings.",
      );
      assert.equal(
        getDocumentResult.descriptionFr,
        "Il y a du bruit de la route et se trouve à côté de la station de police. Les salles de bain avaient des revêtements de morilles.",
      );
      assert.equal(getDocumentResult.hotelId, "8");
    });

    it("getDocument throws error for invalid getDocument Value", async () => {
      let errorThrown = false;
      try {
        await searchClient.getDocument("garbxyz");
      } catch (ex: any) {
        errorThrown = true;
      }
      assert.isTrue(errorThrown, "Expected getDocument to fail with an exception");
    });

    it("deleteDocuments delete a document by documents", async () => {
      const getDocumentResult = await searchClient.getDocument("8");
      await searchClient.deleteDocuments([getDocumentResult]);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 9);
    });

    it("deleteDocuments delete a document by key/keyNames", async () => {
      await searchClient.deleteDocuments("hotelId", ["9", "10"]);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 8);
    });

    it("mergeOrUploadDocuments modify & merge an existing document", async () => {
      let getDocumentResult = await searchClient.getDocument("6");
      getDocumentResult.description = "Modified Description";
      await searchClient.mergeOrUploadDocuments([getDocumentResult]);
      await delay(WAIT_TIME);
      getDocumentResult = await searchClient.getDocument("6");
      assert.equal(getDocumentResult.description, "Modified Description");
    });

    it("mergeOrUploadDocuments merge a new document", async () => {
      const document = {
        hotelId: "11",
        description: "New Hotel Description",
        lastRenovationDate: null,
      };
      await searchClient.mergeOrUploadDocuments([document]);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });

    it("mergeDocuments modify & merge an existing document", async () => {
      let getDocumentResult = await searchClient.getDocument("6");
      getDocumentResult.description = "Modified Description";
      await searchClient.mergeDocuments([getDocumentResult]);
      await delay(WAIT_TIME);
      getDocumentResult = await searchClient.getDocument("6");
      assert.equal(getDocumentResult.description, "Modified Description");
    });

    it("uploadDocuments upload a set of documents", async () => {
      const documents = [
        {
          hotelId: "11",
          description: "New Hotel Description",
          lastRenovationDate: null,
        },
        {
          hotelId: "12",
          description: "New Hotel II Description",
          lastRenovationDate: null,
        },
      ];
      await searchClient.uploadDocuments(documents);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 12);
    });

    it("indexDocuments upload a new document", async () => {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
      batch.upload([
        {
          hotelId: "11",
          description: "New Hotel Description",
          lastRenovationDate: null,
        },
      ]);
      await searchClient.indexDocuments(batch);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });

    it("indexDocuments deletes existing documents", async () => {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
      batch.delete([
        {
          hotelId: "9",
        },
        {
          hotelId: "10",
        },
      ]);

      await searchClient.indexDocuments(batch);
      await delay(WAIT_TIME);
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 8);
    });

    it("indexDocuments merges an existing document", async () => {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
      batch.merge([
        {
          hotelId: "8",
          description: "Modified Description",
        },
      ]);

      await searchClient.indexDocuments(batch);
      await delay(WAIT_TIME);
      const getDocumentResult = await searchClient.getDocument("8");
      assert.equal(getDocumentResult.description, "Modified Description");
    });

    it("indexDocuments merge/upload documents", async () => {
      const batch: IndexDocumentsBatch<Hotel> = new IndexDocumentsBatch<Hotel>();
      batch.mergeOrUpload([
        {
          hotelId: "8",
          description: "Modified Description",
        },
        {
          hotelId: "11",
          description: "New Hotel Description",
          lastRenovationDate: null,
        },
      ]);

      await searchClient.indexDocuments(batch);
      await delay(WAIT_TIME);
      const getDocumentResult = await searchClient.getDocument("8");
      assert.equal(getDocumentResult.description, "Modified Description");
      const documentCount = await searchClient.getDocumentsCount();
      assert.equal(documentCount, 11);
    });

    it("search with semantic error handling", async () => {
      const searchResults = await searchClient.search("luxury", {
        ...baseSemanticOptions(),
        select: ["hotelId"],
      });

      const resultIds = [];
      for await (const result of searchResults.results) {
        resultIds.push(result.document.hotelId);
      }
      assert.deepEqual(["1"], resultIds);
    });

    it("search with vector", async () => {
      const embedding = getMockQueryEmbedding();

      const searchResults = await searchClient.search("*", {
        vectorSearchOptions: {
          queries: [
            {
              kind: "vector",
              vector: embedding,
              kNearestNeighborsCount: 3,
              fields: ["vectorDescription"],
            },
          ],
        },
        top: 3,
        select: ["hotelId"],
      });

      const resultIds = [];
      for await (const result of searchResults.results) {
        resultIds.push(result.document.hotelId);
      }
      assert.deepEqual(resultIds, ["1", "3", "4"]);
    });

    it("multi-vector search", async () => {
      const embedding = getMockQueryEmbedding();

      const searchResults = await searchClient.search("*", {
        vectorSearchOptions: {
          queries: [
            {
              kind: "vector",
              vector: embedding,
              kNearestNeighborsCount: 3,
              fields: ["vectorDescription"],
            },
            {
              kind: "vector",
              vector: embedding,
              kNearestNeighborsCount: 3,
              fields: ["vectorDescription"],
            },
          ],
        },
        top: 3,
        select: ["hotelId"],
      });

      const resultIds = [];
      for await (const result of searchResults.results) {
        resultIds.push(result.document.hotelId);
      }
      assert.deepEqual(resultIds, ["1", "3", "4"]);
    });

    it("oversampling compressed vectors", async () => {
      const embedding = getMockQueryEmbedding();

      const searchResults = await searchClient.search("*", {
        vectorSearchOptions: {
          queries: [
            {
              kind: "vector",
              vector: embedding,
              kNearestNeighborsCount: 3,
              fields: ["compressedVectorDescription"],
            },
          ],
        },
        top: 3,
        select: ["hotelId"],
      });

      const resultIds = [];
      for await (const result of searchResults.results) {
        resultIds.push(result.document.hotelId);
      }
      assert.deepEqual(resultIds, ["1", "3", "4"]);
    });
  });
});
