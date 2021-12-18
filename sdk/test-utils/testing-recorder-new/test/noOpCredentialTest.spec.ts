// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RecorderStartOptions, RecorderClient, env } from "@azure-tools/test-recorder-new";
import { createTestCredential } from "@azure-tools/test-credential";
import { TokenCredential } from "@azure/core-auth";
import { TableServiceClient } from "@azure/data-tables";

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    TABLES_URL: "https://fakeaccount.table.core.windows.net",
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azuretenantid"
  },
  sanitizerOptions: {
    bodyRegexSanitizers: [
      {
        regex: encodeURIComponent(env.TABLES_URL || "undefined"),
        value: encodeURIComponent(`https://fakeaccount.table.core.windows.net`)
      }
    ]
  }
};

describe(`NoOp credential with Tables`, () => {
  let recorder: RecorderClient;
  let credential: TokenCredential;

  beforeEach(async function() {
    recorder = new RecorderClient(this.currentTest);
    await recorder.start(recorderStartOptions);
    credential = createTestCredential();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("should create new table, then delete", async () => {
    const tableName = recorder.variable(
      "table-name",
      `table${Math.ceil(Math.random() * 1000 + 1000)}`
    );
    const client = new TableServiceClient(env.TABLES_URL || "undefined", credential);
    recorder.configureClient(client);
    await client.createTable(tableName);
    await client.deleteTable(tableName);
  });
});
