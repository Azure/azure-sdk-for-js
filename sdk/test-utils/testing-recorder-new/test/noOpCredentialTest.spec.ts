// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RecorderStartOptions, Recorder, env } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { TokenCredential } from "@azure/core-auth";
import { TableServiceClient } from "@azure/data-tables";
import { assertEnvironmentVariable } from "./utils/utils";

const getRecorderStartOptions = (): RecorderStartOptions => {
  return {
    envSetupForPlayback: {
      TABLES_URL: "https://fakeaccount.table.core.windows.net",
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "azuretenantid",
    },
    sanitizerOptions: {
      bodySanitizers: [
        {
          target: encodeURIComponent(env.TABLES_URL ?? ""),
          value: encodeURIComponent(`https://fakeaccount.table.core.windows.net`),
        },
      ],
    },
  };
};

describe(`NoOp credential with Tables`, () => {
  let recorder: Recorder;
  let credential: TokenCredential;

  beforeEach(async function () {
    recorder = new Recorder(this.currentTest);
    await recorder.start(getRecorderStartOptions());
    credential = createTestCredential();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create new table, then delete", async () => {
    const tableName = recorder.variable(
      "table-name",
      `table${Math.ceil(Math.random() * 1000 + 1000)}`
    );
    const client = new TableServiceClient(
      assertEnvironmentVariable("TABLES_URL"),
      credential,
      recorder.configureClientOptions({})
    );
    await client.createTable(tableName);
    await client.deleteTable(tableName);
  });
});
