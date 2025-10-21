// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import type { ClientOptions } from "@azure-rest/core-client";
import type { BatchClient } from "../../src/index.js";
import BatchServiceClient from "../../src/index.js";
import {
  fakeTestPasswordPlaceholder1,
  fakeAzureBatchAccount,
  fakeAzureBatchEndpoint,
} from "./fakeTestSecrets.js";

import { isNodeLike } from "@azure/core-util";
import { NoOpCredential } from "@azure-tools/test-credential";
import { AzureNamedKeyCredential } from "@azure/core-auth";
import { EnvTokenCredential } from "./credential.js";
import { DefaultAzureCredential } from "@azure/identity";

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
  removeCentralSanitizers: ["AZSDK3430", "AZSDK3479", "AZSDK3402", "AZSDK3493", "AZSDK4001"],
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
export async function createRecorder(ctx: TestInfo): Promise<Recorder> {
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
    : isNodeLike
      ? new AzureNamedKeyCredential(env.AZURE_BATCH_ACCOUNT!, env.AZURE_BATCH_ACCESS_KEY!)
      : new EnvTokenCredential("");

  if (!isPlaybackMode() && !env.AZURE_BATCH_ENDPOINT) {
    throw Error("AZURE_BATCH_ENDPOINT env variable should be set in live mode");
  }

  return BatchServiceClient(
    env.AZURE_BATCH_ENDPOINT! || "https://dummy.eastus.batch.azure.com",
    credential,
    recorder ? recorder.configureClientOptions({ ...options }) : options,
  );
}

export function createBatchClientV2(params: {
  recorder: Recorder;
  accountEndpoint: string;
  accountName?: string;
  accountKey?: string;
  options?: ClientOptions;
}): BatchClient {
  const { recorder, accountEndpoint, accountName, accountKey, options } = params;
  const credential = isPlaybackMode()
    ? new NoOpCredential()
    : isNodeLike
      ? accountKey && accountName
        ? new AzureNamedKeyCredential(accountName, accountKey)
        : new DefaultAzureCredential()
      : new EnvTokenCredential("BATCH_ACCESS_TOKEN");

  return BatchServiceClient(
    accountEndpoint,
    credential,
    recorder.configureClientOptions({ ...options }),
  );
}
