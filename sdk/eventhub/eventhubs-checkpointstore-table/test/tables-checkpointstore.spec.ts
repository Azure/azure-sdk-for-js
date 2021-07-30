// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import chai from "chai";
import * as dotenv from "dotenv";
const should = chai.should();
import { TableCheckpointStore } from "../src";

import { customCheckpoint , customPartition} from "../src/tableCheckpointStore";

import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { TableServiceClient, AzureNamedKeyCredential , TableClient} from "@azure/data-tables";
const env = getEnvVars();
dotenv.config();


/* test to show that test framework is set up well */
describe("TableCheckpointStore", () => {
  it("is exported from the package", () => {
    should.exist(TableCheckpointStore, "Expected TableCheckpointStore to be exported.");
  });
});

const service = {
  storageConnectionString: env[EnvVarKeys.STORAGE_CONNECTION_STRING],
  storageAccountName: env[EnvVarKeys.STORAGE_ACCOUNT_NAME],
  storageAccountKey: env[EnvVarKeys.STORAGE_ACCOUNT_KEY],
  tableName: env[EnvVarKeys.TABLENAME]
};


const credential = new AzureNamedKeyCredential(service.storageAccountName, service.storageAccountKey);
const serviceClient = new TableServiceClient(
  `https://${service.storageAccountName}.table.core.windows.net`,credential);

  

describe("TableCheckpointStore", function(): void {
  describe("Runs tests on table with no entities" , function(){
    
    const table_name = `table${new Date().getTime()}`;
    const client = new TableClient(
      `https://${service.storageAccountName}.table.core.windows.net`,
      table_name,credential);
    
    beforeEach("creating table" ,async () => {
      await serviceClient.createTable(table_name); });
afterEach(async () => {
  await client.deleteTable();
});


describe("listOwnership", function() {
it("listOwnership should return an empty array", async function(): Promise<void> {
  
  const checkpointStore = new TableCheckpointStore(client);
  const listOwnership = await checkpointStore.listOwnership(
    "baffy",
    "yellow",
    "$default"
  );
  should.equal(listOwnership.length, 0);
  
  
});

it("listOwnership is empty but length is greater than 0", async function(): Promise<void> {
  
  const checkpointStore = new TableCheckpointStore(client);
  const listOwnership = await checkpointStore.listOwnership(
    "test.servicebus.windows.net",
    "testHub",
    "testConsumerGroup"
  );
  should.not.equal(listOwnership.length, 5);
  
});

});


});

describe("Runs tests on a populated table" , function(){
    
  const table_name = `table${new Date().getTime()}`;
  const client = new TableClient(
    `https://${service.storageAccountName}.table.core.windows.net`,
    table_name,credential);
  
  beforeEach("creating table" ,async () => {
    await serviceClient.createTable(table_name);
    const namespaceArray = ["red.servicebus.windows.net","blue.service.bus.net","green.servicebus.net"];
    const eventHubArray = ["redHub","blueHub", "greenHub"];
     /*Checkpoint*/
  const checkpoint_entity : customCheckpoint = {
   partitionKey : "0",
   rowKey : "0",
   consumerGroup : "$default",
   fullyQualifiedNamespace : "baffy.servicebus.windows.net" ,
   eventHubName: "baffy",
   sequenceNumber : 0,
   offset : 42694,      
   partitionId : "0"
 };
 for (let i = 0; i < 3; ++i){
  checkpoint_entity.fullyQualifiedNamespace = namespaceArray[i];
  checkpoint_entity.eventHubName = eventHubArray[i];
  checkpoint_entity.sequenceNumber = 100 + i;
  checkpoint_entity.partitionId = i.toString();
  checkpoint_entity.rowKey = checkpoint_entity.partitionId;
  checkpoint_entity.partitionKey = checkpoint_entity.eventHubName + checkpoint_entity.fullyQualifiedNamespace + checkpoint_entity.consumerGroup + "checkpoint";
  checkpoint_entity.offset = 1023 + i;
  await client.createEntity(checkpoint_entity);
}

  /*Ownership*/
    const ownership_entity : customPartition =  {
      partitionKey : "",
      rowKey: "",
      consumerGroup : "$default",
      fullyQualifiedNamespace : "baffy",
      eventHubName: "yellow",
      partitionId: "3",
      ownerId : "11",
      lastModifiedTimeInMs : 1222
    };

    for (let i = 0; i < 3; ++i){
      ownership_entity.fullyQualifiedNamespace = namespaceArray[i];
      ownership_entity.eventHubName = eventHubArray[i];
      ownership_entity.partitionId = i.toString();
      ownership_entity.rowKey = ownership_entity.partitionId;
      ownership_entity.partitionKey = ownership_entity.eventHubName + ownership_entity.fullyQualifiedNamespace + ownership_entity.consumerGroup + "checkpoint";
      ownership_entity.ownerId = "Id" + i,

      await client.createEntity(ownership_entity);
    }


  });


  



});
});     