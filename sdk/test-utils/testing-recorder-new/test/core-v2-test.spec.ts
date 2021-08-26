// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "@azure-tools/test-recorder";
import { TableEntity, TableClient } from "@azure/data-tables";
import { TestProxyHttpClient, recorderHttpPolicy } from "@azure-tools/test-recorder-new";
import { config } from "dotenv";
import { isNode } from "@azure/core-util";
import { createSimpleEntity } from "./utils/utils";
config();

describe("Tests", () => {
  it("tables test", async function() {
    const file = (isNode ? "node_" : "browser_") + `core_v2_file_path.json`;
    const recorder = new TestProxyHttpClient(file);
    const client = TableClient.fromConnectionString(env.TABLES_SAS_CONNECTION_STRING, "newtable");
    client.pipeline.addPolicy(recorderHttpPolicy(recorder));
    await recorder.start();
    await client.createTable();
    const simpleEntity: TableEntity = createSimpleEntity();
    await client.createEntity(simpleEntity);
    await client.deleteTable();
    await recorder.stop();
  });
});
