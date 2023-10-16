// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { record, Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";

import { DataLakeServiceClient, getDataLakeServiceAccountAudience } from "../../src";
import {
  recorderEnvSetup,
  getConnectionStringFromEnvironment,
  getDataLakeServiceClient,
  SimpleTokenCredential,
} from "../utils";
import { DefaultAzureCredential } from "@azure/identity";

describe("DataLakeServiceClient", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = record(this, recorderEnvSetup);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("DataLakeServiceClient default audience should work", async () => {
    const serviceClient = getDataLakeServiceClient();
    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      new DefaultAzureCredential()
    );
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("DataLakeServiceClient customized audience should work", async () => {
    const serviceClient = getDataLakeServiceClient();
    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      new DefaultAzureCredential(),
      { audience: getDataLakeServiceAccountAudience(serviceClient.accountName) }
    );
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("DataLakeServiceClient bearer token challenge should work", async () => {
    const serviceClient = getDataLakeServiceClient();

    // Validate that bad audience should fail first.
    const authToken = await new DefaultAzureCredential().getToken(
      "https://badaudience.blob.core.windows.net/.default"
    );
    const datalakeServiceClientWithPlainOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      new SimpleTokenCredential(authToken.token)
    );

    try {
      await datalakeServiceClientWithPlainOAuthToken.getProperties();
      assert.fail("Should fail with 401");
    } catch (err) {
      assert.strictEqual((err as any).statusCode, 401);
    }

    const datalakeServiceClientWithOAuthToken = new DataLakeServiceClient(
      serviceClient.url,
      new DefaultAzureCredential(),
      { audience: "https://badaudience.dfs.core.windows.net/.default" }
    );
    await datalakeServiceClientWithOAuthToken.getProperties();
  });

  it("can be created from AccountConnString", async () => {
    const newClient = DataLakeServiceClient.fromConnectionString(
      getConnectionStringFromEnvironment(),
      {
        retryOptions: {
          maxTries: 1,
        },
      }
    );

    const listIter = newClient.listFileSystems();
    await listIter.next();
    assert.ok(newClient.url.includes("dfs"));
  });
});
