// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";
import { ClientOptions } from "@azure-rest/core-client";
// import { createTestCredential } from "@azure-tools/test-credential";
import BatchServiceClient, { BatchClient, BatchSharedKeyCredentials } from "../../../src";
import {
  fakeTestPasswordPlaceholder1,
  fakeAzureBatchAccount,
  fakeAzureBatchEndpoint,
} from "./fakeTestSecrets";
import {
  // AzureCliCredential,
  InteractiveBrowserCredential,
} from "@azure/identity";
// eslint-disable-next-line import/no-extraneous-dependencies
import { isNode } from "@azure/test-utils";

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: {
    AZURE_BATCH_ENDPOINT: fakeAzureBatchEndpoint,
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    AZURE_BATCH_ACCOUNT: fakeAzureBatchAccount,
    AZURE_BATCH_ACCESS_KEY: "api_key",
  },
  sanitizerOptions: {
    bodyKeySanitizers: [
      {
        jsonPath: "$.userAccounts[0].password",
        value: fakeTestPasswordPlaceholder1,
      },
      {
        jsonPath: "$.password",
        value: fakeTestPasswordPlaceholder1,
      },
    ],
    generalSanitizers: [
      {
        regex: true,
        target: `https://${fakeAzureBatchAccount}(.*)batch.azure.com`,
        value: fakeAzureBatchEndpoint,
      },
    ],
  },
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: ["client-request-id"],
  });
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createBatchClient(recorder?: Recorder, options: ClientOptions = {}): BatchClient {
  const credential = isNode
    ? // ? new AzureCliCredential()
      ({
        accountName: env.AZURE_BATCH_ACCOUNT!,
        accountKey: env.AZURE_BATCH_KEY!,
      } as BatchSharedKeyCredentials)
    : new InteractiveBrowserCredential({
        clientId: "04b07795-8ddb-461a-bbee-02f9e1bf7b46",
        tokenCachePersistenceOptions: {
          enabled: true,
          name: "batch-test-cache",
        },
      });

  // if (!isPlaybackMode() && env.AZURE_BATCH_ENDPOINT) {
  //   throw Error("AZURE_BATCH_ENDPOINT env variable should be set in live mode");
  // }

  return BatchServiceClient(
    env.AZURE_BATCH_ENDPOINT! || "https://dummy.eastus.batch.azure.com",
    credential,
    recorder ? recorder.configureClientOptions({ ...options }) : options
  );
}
