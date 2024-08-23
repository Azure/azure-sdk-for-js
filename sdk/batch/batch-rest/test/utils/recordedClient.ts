// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  VitestTestContext,
  env,
  isPlaybackMode,
} from "@azure-tools/test-recorder";
import { ClientOptions } from "@azure-rest/core-client";
import BatchServiceClient, { BatchClient } from "../../src/index.js";
import {
  fakeTestPasswordPlaceholder1,
  fakeAzureBatchAccount,
  fakeAzureBatchEndpoint,
} from "./fakeTestSecrets.js";
import {
  // AzureCliCredential,
  // AzureCliCredential,
  InteractiveBrowserCredential,
} from "@azure/identity";
import { isNode } from "@azure-tools/test-utils";
import { NoOpCredential } from "@azure-tools/test-credential";
import { AzureNamedKeyCredential } from "@azure/core-auth";

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: {
    AZURE_BATCH_ENDPOINT: fakeAzureBatchEndpoint,
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    AZURE_BATCH_ACCOUNT: fakeAzureBatchAccount,
    AZURE_BATCH_ACCESS_KEY: "api_key",
  },
  // see https://github.com/Azure/azure-sdk-tools/blob/main/tools/test-proxy/Azure.Sdk.Tools.TestProxy/Common/SanitizerDictionary.cs
  removeCentralSanitizers: ["AZSDK3430", "AZSDK3479", "AZSDK3402", "AZSDK3493"],
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
export async function createRecorder(ctx: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(ctx);
  await recorder.setMatcher("CustomDefaultMatcher", {
    excludedHeaders: ["client-request-id", "ocp-date", "accept-encoding"],
  });
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createBatchClient(recorder?: Recorder, options: ClientOptions = {}): BatchClient {
  const credential = isPlaybackMode()
    ? new NoOpCredential()
    : isNode
      ? new AzureNamedKeyCredential(env.AZURE_BATCH_ACCOUNT!, env.AZURE_BATCH_ACCESS_KEY!)
      : // : new AzureCliCredential();
        new InteractiveBrowserCredential({
          clientId: "04b07795-8ddb-461a-bbee-02f9e1bf7b46",
          tokenCachePersistenceOptions: {
            enabled: true,
            name: "batch-test-cache",
          },
        });

  if (!isPlaybackMode() && !env.AZURE_BATCH_ENDPOINT) {
    throw Error("AZURE_BATCH_ENDPOINT env variable should be set in live mode");
  }

  return BatchServiceClient(
    env.AZURE_BATCH_ENDPOINT! || "https://dummy.eastus.batch.azure.com",
    credential,
    recorder ? recorder.configureClientOptions({ ...options }) : options,
  );
}
