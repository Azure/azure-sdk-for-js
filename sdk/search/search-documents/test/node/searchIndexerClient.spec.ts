// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-invalid-this */
import {isPlaybackMode, record, Recorder} from "@azure/test-utils-recorder";
import {assert} from "chai";
import {SearchIndexClient, SearchIndexerClient, SearchIndexerDataSourceConnection, SearchIndexerSkillset, SearchIndexer} from "../../src/index";
import {Hotel} from "../utils/interfaces";
import {createClients, environmentSetup} from "../utils/recordedClient";
import {createIndex, createDataSourceConnections, deleteDataSourceConnections, createSkillsets, deleteSkillsets, createIndexers, deleteIndexers} from "../utils/setupIndex";
import { delay } from "@azure/core-http";

const TEST_INDEX_NAME = "hotel-live-test-2";

describe("SearchIndexerClient", function() {
  let recorder: Recorder;
  let indexerClient: SearchIndexerClient;
  let indexClient: SearchIndexClient;

  this.timeout(30000);

  beforeEach(async function() {
    ({ indexClient, indexerClient } = createClients<Hotel>(TEST_INDEX_NAME));
    if (!isPlaybackMode()) {
      await createDataSourceConnections(indexerClient);
      await createSkillsets(indexerClient);
      await createIndex(indexClient, TEST_INDEX_NAME);
      await delay(5000);
      await createIndexers(indexerClient);
    }
    recorder = record(this, environmentSetup);
    // create the clients again, but hooked up to the recorder
    ({ indexClient, indexerClient } = createClients<Hotel>(TEST_INDEX_NAME))
  });


  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
    if (!isPlaybackMode()) {
      await indexClient.deleteIndex(TEST_INDEX_NAME);
      await delay(2000);
      await deleteDataSourceConnections(indexerClient);
      await deleteSkillsets(indexerClient);
      await deleteIndexers(indexerClient);
    }
  });

  describe("#indexers", function() {
    it("gets the list of indexers", async function(){
      const indexers = await indexerClient.listIndexers();
      assert.equal(indexers.length >= 5, true);
    });

    it("gets the list of indexer names", async function(){
      const indexers = await indexerClient.listIndexersNames();
      assert.equal(indexers.length >= 5, true);
      assert.equal(indexers.includes("my-azure-indexer-1"), true);
      assert.equal(indexers.includes("my-azure-indexer-2"), true);
      assert.equal(indexers.includes("my-azure-indexer-3"), true);
      assert.equal(indexers.includes("my-azure-indexer-4"), true);
      assert.equal(indexers.includes("my-azure-indexer-5"), true);
    });

    it("gets the correct indexer object", async function(){
      const indexer = await indexerClient.getIndexer("my-azure-indexer-1");
      assert.equal(indexer.name, "my-azure-indexer-1");
      assert.equal(indexer.dataSourceName, "my-data-source-5");
      assert.equal(indexer.targetIndexName, "hotel-live-test-2");
      assert.equal(indexer.isDisabled, false);
    });

    it("throws error for invalid indexer object", async function(){
      let retrievalError:boolean = false;
      try {
        await indexerClient.getIndexer("garbxyz");
      } catch(ex) {
        retrievalError = true;
      }
      assert.equal(retrievalError, true);
    });

    it("creates the indexer object using createOrUpdateIndexer", async function(){
      let indexer: SearchIndexer = {
        name: "my-azure-indexer-6",
        description: "Description for Sample Indexer",
        dataSourceName: "my-data-source-5",
        targetIndexName: "hotel-live-test-2",
        isDisabled: false
      };
      await indexerClient.createOrUpdateIndexer(indexer);
      indexer = await indexerClient.getIndexer("my-azure-indexer-6");
      assert.equal(indexer.name, "my-azure-indexer-6");
      assert.equal(indexer.dataSourceName, "my-data-source-5");
      assert.equal(indexer.targetIndexName, "hotel-live-test-2");
      assert.equal(indexer.isDisabled, false);
      await indexerClient.deleteIndexer(indexer);
    });

    it("modify and updates the indexer object", async function(){
      let indexer = await indexerClient.getIndexer("my-azure-indexer-1");
      indexer.isDisabled = true;
      await indexerClient.createOrUpdateIndexer(indexer);
      indexer = await indexerClient.getIndexer("my-azure-indexer-1");
      assert.equal(indexer.isDisabled, true);
    });

    it("gets the status of the indexer", async function(){
      const indexerStatus = await indexerClient.getIndexerStatus("my-azure-indexer-1");
      const statuses:string[] = ['unknown','error','running']
      assert.equal(statuses.includes(indexerStatus.status), true);
    });
  });

  describe("#datasourceconnections", function() {
    it("gets the list of datasourceconnections", async function(){
      const dataSourceConnections = await indexerClient.listDataSourceConnections();
      assert.equal(dataSourceConnections.length >= 5, true);
    });

    it("gets the list of datasourceconnection names", async function(){
      const dataSourceConnectionNames = await indexerClient.listDataSourceConnectionsNames();
      assert.equal(dataSourceConnectionNames.length >= 5, true);
      assert.equal(dataSourceConnectionNames.includes("my-data-source-1"), true);
      assert.equal(dataSourceConnectionNames.includes("my-data-source-2"), true);
      assert.equal(dataSourceConnectionNames.includes("my-data-source-3"), true);
      assert.equal(dataSourceConnectionNames.includes("my-data-source-4"), true);
      assert.equal(dataSourceConnectionNames.includes("my-data-source-5"), true);
    });

    it("gets the correct datasourceconnection object", async function(){
      const dataSourceConnection = await indexerClient.getDataSourceConnection("my-data-source-1");
      assert.equal(dataSourceConnection.name, "my-data-source-1");
      assert.equal(dataSourceConnection.type, "cosmosdb");
      assert.equal(dataSourceConnection.container.name, "hotels");
    });

    it("throws error for invalid datasourceconnection object", async function(){
      let retrievalError:boolean = false;
      try {
        await indexerClient.getDataSourceConnection("garbxyz");
      } catch(ex) {
        retrievalError = true;
      }
      assert.equal(retrievalError, true);
    });

    it("creates the datasourceconnection object using createOrUpdateDataSourceConnection", async function(){
      let dataSourceConnection:SearchIndexerDataSourceConnection = {
        name: "my-data-source-6",
        type: "cosmosdb",
        container: {
          name: "hotels"
        },
        connectionString:
          "AccountEndpoint=https://hotels-docbb.documents.azure.com:443/;AccountKey=4UPsNZyFAjgZ1tzHPGZaxS09XcwLrIawbXBWk6IixcxJoSePTcjBn0mi53XiKWu8MaUgowUhIovOv7kjksqAug==;Database=SampleData"
      }
      await indexerClient.createOrUpdateDataSourceConnection(dataSourceConnection);
      dataSourceConnection = await indexerClient.getDataSourceConnection("my-data-source-6");
      assert.equal(dataSourceConnection.name, "my-data-source-6");
      assert.equal(dataSourceConnection.type, "cosmosdb");
      assert.equal(dataSourceConnection.container.name, "hotels");
      await indexerClient.deleteDataSourceConnection(dataSourceConnection);
    });

    it("modify and updates the datasourceconnection object", async function(){
      let dataSourceConnection = await indexerClient.getDataSourceConnection("my-data-source-1");
      dataSourceConnection.container.name = "my-container-2";
      await indexerClient.createOrUpdateDataSourceConnection(dataSourceConnection);
      dataSourceConnection = await indexerClient.getDataSourceConnection("my-data-source-1");
      assert.equal(dataSourceConnection.container.name, "my-container-2");
    });
  });

  describe("#skillsets", function() {
    it("gets the list of skillsets", async function(){
      const skillsets = await indexerClient.listSkillsets();
      assert.equal(skillsets.length >= 5, true);
    });

    it("gets the list of skillset names", async function(){
      const skillsets = await indexerClient.listSkillsetsNames();
      assert.equal(skillsets.length >= 5, true);
      assert.equal(skillsets.includes("my-azureblob-skillset-1"), true);
      assert.equal(skillsets.includes("my-azureblob-skillset-2"), true);
      assert.equal(skillsets.includes("my-azureblob-skillset-3"), true);
      assert.equal(skillsets.includes("my-azureblob-skillset-4"), true);
      assert.equal(skillsets.includes("my-azureblob-skillset-5"), true);
    });

    it("gets the correct skillset object", async function(){
      const skillSet = await indexerClient.getSkillset("my-azureblob-skillset-1");
      assert.equal(skillSet.name, "my-azureblob-skillset-1");
      assert.equal(skillSet.skills.length, 1);
      assert.equal(skillSet.skills[0].inputs.length, 2);
      assert.equal(skillSet.skills[0].outputs.length, 3);
    });

    it("throws error for invalid skillset object", async function(){
      let retrievalError:boolean = false;
      try {
        await indexerClient.getSkillset("garbxyz");
      } catch(ex) {
        retrievalError = true;
      }
      assert.equal(retrievalError, true);
    });

    it("creates the skillset object using createOrUpdateSkillset", async function(){
      let skillSet:SearchIndexerSkillset = {
        name: `my-azureblob-skillset-6`,
        description: `Skillset description`,
        skills: [
          {
            odatatype: "#Microsoft.Skills.Text.EntityRecognitionSkill",
            inputs: [
              {
                name: "text",
                source: "/document/merged_content"
              },
              {
                name: "languageCode",
                source: "/document/language"
              }
            ],
            outputs: [
              {
                name: "persons",
                targetName: "people"
              },
              {
                name: "organizations",
                targetName: "organizations"
              },
              {
                name: "locations",
                targetName: "locations"
              }
            ]
          }
        ]
      }
      await indexerClient.createOrUpdateSkillset(skillSet);
      skillSet = await indexerClient.getSkillset("my-azureblob-skillset-6");
      assert.equal(skillSet.name, "my-azureblob-skillset-6");
      assert.equal(skillSet.skills.length, 1);
      assert.equal(skillSet.skills[0].inputs.length, 2);
      assert.equal(skillSet.skills[0].outputs.length, 3);
      await indexerClient.deleteSkillset(skillSet);
    });

    it("modify and updates the skillsets object", async function(){
      let skillSet = await indexerClient.getSkillset("my-azureblob-skillset-5");
      skillSet.skills[0].outputs.push({
            name: "organizations",
            targetName: "organizations"
      });
      await indexerClient.createOrUpdateSkillset(skillSet);
      skillSet = await indexerClient.getSkillset("my-azureblob-skillset-5");
      assert.equal(skillSet.skills[0].outputs.length, 3);
    });
  });
});
