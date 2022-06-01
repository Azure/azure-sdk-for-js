// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
import { Context } from "mocha";
import { Suite } from "mocha";
import { assert } from "chai";
import { SearchIndexClient, SynonymMap, SearchIndex } from "../../../src";
import { Hotel } from "../utils/interfaces";
import { createClients } from "../utils/recordedClient";
import {
  createSimpleIndex,
  createSynonymMaps,
  deleteSynonymMaps,
  WAIT_TIME,
  createRandomIndexName,
} from "../utils/setup";
import { delay, serviceVersions } from "../../../src/serviceUtils";
import { versionsToTest } from "@azure/test-utils";

versionsToTest(serviceVersions, {}, (serviceVersion, onVersions) => {
  onVersions({ minVer: "2020-06-30" }).describe("SearchIndexClient", function (this: Suite) {
    let recorder: Recorder;
    let indexClient: SearchIndexClient;
    let TEST_INDEX_NAME: string;

    this.timeout(99999);

    beforeEach(async function (this: Context) {
      recorder = new Recorder(this.currentTest);
      TEST_INDEX_NAME = createRandomIndexName();
      ({ indexClient, indexName: TEST_INDEX_NAME } = await createClients<Hotel>(
        serviceVersion,
        recorder,
        TEST_INDEX_NAME
      ));

      await createSynonymMaps(indexClient);
      await createSimpleIndex(indexClient, TEST_INDEX_NAME);
      await delay(WAIT_TIME);
    });

    afterEach(async function () {
      await indexClient.deleteIndex(TEST_INDEX_NAME);
      await delay(WAIT_TIME);
      await deleteSynonymMaps(indexClient);
      if (recorder) {
        await recorder.stop();
      }
    });

    describe("#synonymmaps", function () {
      it("gets the list of synonymmaps", async function () {
        const synonymMaps = await indexClient.listSynonymMaps();
        assert.isAtLeast(synonymMaps.length, 2);
      });

      it("gets the list of synonymmaps names", async function () {
        const synonymMapNames = await indexClient.listSynonymMapsNames();
        assert.isAtLeast(synonymMapNames.length, 2);
        for (let i = 1; i <= 2; i++) {
          assert.include(synonymMapNames, `my-azure-synonymmap-${i}`);
        }
      });

      it("gets the correct synonymmap object", async function () {
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

      it("throws error for invalid synonymmap object", async function () {
        let retrievalError: boolean = false;
        try {
          await indexClient.getSynonymMap("garbxyz");
        } catch (ex: any) {
          retrievalError = true;
        }
        assert.isTrue(retrievalError);
      });

      it("creates the synonymmap object using createOrUpdateSynonymMap", async function () {
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

      it("modify and updates the synonymmap object", async function () {
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

    describe("#indexes", function () {
      it("gets the list of indexes", async function () {
        const result = await indexClient.listIndexes();
        let listOfIndexes = await result.next();
        const indexNames: string[] = [];
        while (!listOfIndexes.done) {
          indexNames.push(listOfIndexes.value.name);
          listOfIndexes = await result.next();
        }
        assert.include(indexNames, TEST_INDEX_NAME);
      });

      it("gets the list of indexes names", async function () {
        const result = await indexClient.listIndexesNames();
        let listOfIndexNames = await result.next();
        const indexNames: string[] = [];
        while (!listOfIndexNames.done) {
          indexNames.push(listOfIndexNames.value);
          listOfIndexNames = await result.next();
        }
        assert.include(indexNames, TEST_INDEX_NAME);
      });

      it("gets the correct index object", async function () {
        const index = await indexClient.getIndex(TEST_INDEX_NAME);
        assert.equal(index.name, TEST_INDEX_NAME);
        assert.equal(index.fields.length, 5);
      });

      it("throws error for invalid index object", async function () {
        let retrievalError: boolean = false;
        try {
          await indexClient.getIndex("garbxyz");
        } catch (ex: any) {
          retrievalError = true;
        }
        assert.isTrue(retrievalError);
      });

      it("creates the index object using createOrUpdateIndex", async function () {
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

      it("modify and updates the index object", async function () {
        let index = await indexClient.getIndex(TEST_INDEX_NAME);
        index.fields.push({
          type: "Edm.DateTimeOffset",
          name: "lastUpdatedOn",
          filterable: true,
        });
        await indexClient.createOrUpdateIndex(index);
        index = await indexClient.getIndex(TEST_INDEX_NAME);
        assert.equal(index.fields.length, 6);
      });
    });
  });
});
