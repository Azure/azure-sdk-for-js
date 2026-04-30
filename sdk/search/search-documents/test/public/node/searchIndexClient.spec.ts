// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type {
  SearchIndex,
  SynonymMap,
  VectorSearchAlgorithmConfiguration,
  VectorSearchProfile,
} from "../../../src/index.js";
import { AzureKeyCredential, SearchIndexClient } from "../../../src/index.js";
import { defaultServiceVersion } from "../../../src/serviceUtils.js";
import type { Hotel } from "../utils/interfaces.js";
import { createClients } from "../utils/recordedClient.js";
import {
  createRandomIndexName,
  createIndex,
  createSynonymMaps,
  deleteSynonymMaps,
  WAIT_TIME,
} from "../utils/setup.js";

describe("SearchIndexClient", { timeout: 20_000 }, () => {
  describe("constructor", () => {
    const credential = new AzureKeyCredential("key");

    describe("Passing serviceVersion", () => {
      const [correctServiceVersion, incorrectServiceVersion] = ["correct", "incorrect"];
      it("supports passing serviceVersion", () => {
        const client = new SearchIndexClient("", credential, {
          serviceVersion: correctServiceVersion,
        });
        assert.equal(correctServiceVersion, client.serviceVersion);
        assert.equal(correctServiceVersion, client.apiVersion);
      });

      it("supports passing the deprecated apiVersion", () => {
        const client = new SearchIndexClient("", credential, {
          apiVersion: correctServiceVersion,
        });
        assert.equal(correctServiceVersion, client.serviceVersion);
        assert.equal(correctServiceVersion, client.apiVersion);
      });

      it("prioritizes `serviceVersion` over `apiVersion", () => {
        const client = new SearchIndexClient("", credential, {
          apiVersion: incorrectServiceVersion,
          serviceVersion: correctServiceVersion,
        });
        assert.equal(correctServiceVersion, client.serviceVersion);
        assert.equal(correctServiceVersion, client.apiVersion);
      });

      it("defaults to the current apiVersion", () => {
        const client = new SearchIndexClient("", credential);
        assert.equal(defaultServiceVersion, client.serviceVersion);
        assert.equal(defaultServiceVersion, client.apiVersion);
      });
    });
  });

  describe("CRUD operations", () => {
    let recorder: Recorder;
    let indexClient: SearchIndexClient;
    let TEST_INDEX_NAME: string;

    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      TEST_INDEX_NAME = createRandomIndexName();
      ({ indexClient, indexName: TEST_INDEX_NAME } = await createClients<Hotel>(
        defaultServiceVersion,
        recorder,
        TEST_INDEX_NAME,
      ));

      await createSynonymMaps(indexClient);
      await createIndex(indexClient, TEST_INDEX_NAME, defaultServiceVersion);
      await delay(WAIT_TIME);
    });

    afterEach(async () => {
      await indexClient.deleteIndex(TEST_INDEX_NAME);
      await delay(WAIT_TIME);
      await deleteSynonymMaps(indexClient);
      await recorder?.stop();
    });

    describe("#synonymmaps", () => {
      it("gets the list of synonymmaps", async () => {
        const synonymMaps = await indexClient.listSynonymMaps();
        assert.isAtLeast(synonymMaps.length, 2);
      });

      it("gets the list of synonymmaps names", async () => {
        const synonymMapNames = await indexClient.listSynonymMapsNames();
        assert.isAtLeast(synonymMapNames.length, 2);
        for (let i = 1; i <= 2; i++) {
          assert.include(synonymMapNames, `my-azure-synonymmap-${i}`);
        }
      });

      it("gets the correct synonymmap object", async () => {
        const synonymMap = await indexClient.getSynonymMap("my-azure-synonymmap-1");
        assert.equal(synonymMap.name, "my-azure-synonymmap-1");
        assert.equal(synonymMap.synonyms.length, 2);
        const synonyms = [
          "United States, United States of America => USA",
          "Washington, Wash. => WA",
        ];
        assert.include(synonyms, synonymMap.synonyms[0]);
        assert.include(synonyms, synonymMap.synonyms[1]);
      });

      it("throws error for invalid synonymmap object", async () => {
        let retrievalError: boolean = false;
        try {
          await indexClient.getSynonymMap("garbxyz");
        } catch (ex: any) {
          retrievalError = true;
        }
        assert.isTrue(retrievalError);
      });

      it("creates the synonymmap object using createOrUpdateSynonymMap", async () => {
        let synonymMap: SynonymMap = {
          name: `my-azure-synonymmap-3`,
          synonyms: ["United States, United States of America => USA", "Washington, Wash. => WA"],
        };
        await indexClient.createOrUpdateSynonymMap(synonymMap);
        try {
          synonymMap = await indexClient.getSynonymMap("my-azure-synonymmap-3");
          assert.equal(synonymMap.name, "my-azure-synonymmap-3");
          assert.equal(synonymMap.synonyms.length, 2);
          const synonyms = [
            "United States, United States of America => USA",
            "Washington, Wash. => WA",
          ];
          assert.include(synonyms, synonymMap.synonyms[0]);
          assert.include(synonyms, synonymMap.synonyms[1]);
        } finally {
          await indexClient.deleteSynonymMap(synonymMap);
        }
      });

      it("modify and updates the synonymmap object", async () => {
        let synonymMap = await indexClient.getSynonymMap("my-azure-synonymmap-1");
        synonymMap.synonyms.push("California, Clif. => CA");
        await indexClient.createOrUpdateSynonymMap(synonymMap);
        synonymMap = await indexClient.getSynonymMap("my-azure-synonymmap-1");
        assert.equal(synonymMap.synonyms.length, 3);
        const synonyms = [
          "United States, United States of America => USA",
          "Washington, Wash. => WA",
          "California, Clif. => CA",
        ];
        assert.include(synonyms, synonymMap.synonyms[0]);
        assert.include(synonyms, synonymMap.synonyms[1]);
        assert.include(synonyms, synonymMap.synonyms[2]);
      });
    });

    describe("#indexes", () => {
      it("gets the list of indexes", async () => {
        const result = await indexClient.listIndexes();
        let listOfIndexes = await result.next();
        const indexNames: string[] = [];
        while (!listOfIndexes.done) {
          indexNames.push(listOfIndexes.value.name);
          listOfIndexes = await result.next();
        }
        assert.include(indexNames, TEST_INDEX_NAME);
      });

      it("gets the list of indexes names", async () => {
        const result = await indexClient.listIndexesNames();
        let listOfIndexNames = await result.next();
        const indexNames: string[] = [];
        while (!listOfIndexNames.done) {
          indexNames.push(listOfIndexNames.value);
          listOfIndexNames = await result.next();
        }
        assert.include(indexNames, TEST_INDEX_NAME);
      });

      it("gets the correct index object", async () => {
        const index = await indexClient.getIndex(TEST_INDEX_NAME);
        assert.equal(index.name, TEST_INDEX_NAME);
        assert.equal(index.fields.length, 15);
      });

      it("throws error for invalid index object", async () => {
        let retrievalError: boolean = false;
        try {
          await indexClient.getIndex("garbxyz");
        } catch (ex: any) {
          retrievalError = true;
        }
        assert.isTrue(retrievalError);
      });

      it("creates the index object using createOrUpdateIndex", async () => {
        const indexName: string = isLiveMode() ? createRandomIndexName() : "hotel-live-test4";
        let index: SearchIndex = {
          name: indexName,
          fields: [
            {
              type: "Edm.String",
              name: "id",
              key: true,
            },
            {
              type: "Edm.Double",
              name: "awesomenessLevel",
              sortable: true,
              filterable: true,
              facetable: true,
            },
            {
              type: "Edm.String",
              name: "description",
              searchable: true,
            },
            {
              type: "Edm.ComplexType",
              name: "details",
              fields: [
                {
                  type: "Collection(Edm.String)",
                  name: "tags",
                  searchable: true,
                },
              ],
            },
            {
              type: "Edm.Int32",
              name: "hiddenWeight",
              hidden: true,
            },
          ],
        };
        await indexClient.createOrUpdateIndex(index);
        try {
          index = await indexClient.getIndex(indexName);
          assert.equal(index.name, indexName);
          assert.equal(index.fields.length, 5);
        } finally {
          await indexClient.deleteIndex(index);
        }
      });

      it("modify and updates the index object", async () => {
        let index = await indexClient.getIndex(TEST_INDEX_NAME);
        index.fields.push({
          type: "Edm.DateTimeOffset",
          name: "lastUpdatedOn",
          filterable: true,
        });
        await indexClient.createOrUpdateIndex(index);
        index = await indexClient.getIndex(TEST_INDEX_NAME);
        assert.equal(index.fields.length, 16);
      });
    });

    it("creates the index object vector fields", async () => {
      const indexName: string = isLiveMode() ? createRandomIndexName() : "hotel-live-test4";

      const algorithm: VectorSearchAlgorithmConfiguration = {
        name: "algorithm-configuration",
        kind: "hnsw",
        parameters: { m: 10, efSearch: 1000, efConstruction: 1000, metric: "dotProduct" },
      };
      const profile: VectorSearchProfile = {
        name: "profile",
        algorithmConfigurationName: algorithm.name,
      };

      let index: SearchIndex = {
        name: indexName,
        fields: [
          {
            type: "Edm.String",
            name: "id",
            key: true,
          },
          {
            type: "Collection(Edm.Single)",
            name: "descriptionVector",
            vectorSearchDimensions: 1536,
            searchable: true,
            vectorSearchProfileName: profile.name,
          },
        ],
        vectorSearch: {
          algorithms: [algorithm],
          profiles: [profile],
        },
      };
      try {
        await indexClient.createOrUpdateIndex(index);
        index = await indexClient.getIndex(indexName);
        assert.deepEqual(index.vectorSearch?.algorithms?.[0].name, algorithm.name);
        assert.deepEqual(index.vectorSearch?.profiles?.[0].name, profile.name);
      } finally {
        await indexClient.deleteIndex(index);
      }
    });
  });
});
