// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { TableEntity, TableClient } from "@azure/data-tables";
import { TestProxyHttpClient, recorderHttpPolicy } from "@azure-tools/test-recorder-new";
import { config } from "dotenv";
import { createSimpleEntity } from "./utils/utils";
config();

describe("Core V2 tests", () => {
  let recorder: TestProxyHttpClient;

  beforeEach(function() {
    recorder = new TestProxyHttpClient(this.currentTest);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("data-tables create entity", async function() {
    const client = TableClient.fromConnectionString(env.TABLES_SAS_CONNECTION_STRING, "newtable");
    client.pipeline.addPolicy(recorderHttpPolicy(recorder));
    await recorder.start();
    await client.createTable();
    const simpleEntity: TableEntity = createSimpleEntity();
    await client.createEntity(simpleEntity);
    await client.deleteTable();
  });
});
