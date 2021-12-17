// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RecorderStartOptions,
  recorderHttpPolicy,
  TestProxyHttpClient
} from "@azure-tools/test-recorder-new";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { getTestCredential } from "@azure-tools/identity-extensions";
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
        regex: encodeURIComponent(env.TABLES_URL),
        value: encodeURIComponent(`https://fakeaccount.table.core.windows.net`)
      }
    ]
  }
};

describe(`NoOp credential with Tables`, () => {
  let recorder: TestProxyHttpClient;
  let credential: TokenCredential;

  beforeEach(async function() {
    recorder = new TestProxyHttpClient(this.currentTest);
    await recorder.start(recorderStartOptions);
    credential = getTestCredential();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("should create new table, then delete", async () => {
    if (!isPlaybackMode()) {
      recorder.variables["table-name"] = `table${Math.ceil(Math.random() * 1000 + 1000)}`;
    }
    const tableName = recorder.variables["table-name"];
    const client = new TableServiceClient(env.TABLES_URL, credential);
    client.pipeline.addPolicy(recorderHttpPolicy(recorder));
    await client.createTable(tableName);
    await client.deleteTable(tableName);
  });
});
