// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import chai from "chai";
import * as dotenv from "dotenv";
const should = chai.should();
import { TableCheckpointStore } from "../src";
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

let tableClient : TableClient;

describe("Table Checkpoint Store", function(): void {
  before("validate environment", async function(): Promise<void> {
    should.exist(
      env[EnvVarKeys.STORAGE_CONNECTION_STRING],
      "define STORAGE_CONNECTION_STRING in your environment before running integration tests."
    );
  });
  
  beforeEach("creating table" ,async () => {
    const credential = new AzureNamedKeyCredential(service.storageAccountName, service.storageAccountKey);
    const serviceClient = new TableServiceClient(
  `https://${service.storageAccountName}.table.core.windows.net`,credential);
   const tableName = `newtable${new Date().getTime()}`;

    await serviceClient.createTable(tableName);
  });

});

 describe("listOwnership", function() {
  
  it("listOwnership should return an empty array", async function(): Promise<void> {
    
    const checkpointStore = new TableCheckpointStore(tableClient);
    const listOwnership = await checkpointStore.listOwnership(
      "testNamespace.servicebus.windows.net",
      "testEventHub",
      "testConsumerGroup"
    );
    should.equal(listOwnership.length, 0);
  });

  
 })

