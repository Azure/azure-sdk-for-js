// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import type { PurviewAccount, PurviewMetadataPolicies } from "../../../src/index.js";
import { PurviewAccountClient, PurviewMetadataPoliciesClient } from "../../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";

import type { ClientOptions } from "@azure-rest/core-client";

const replaceableVariables: { [k: string]: string } = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
};

export async function createAccountClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<PurviewAccount.Client.PurviewAccountRestClient> {
  const credential = createTestCredential();
  await recorder.start(recorderOptions);

  return PurviewAccountClient(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({ options }),
  );
}

export async function createMetadataClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<PurviewMetadataPolicies.Client.PurviewMetadataPoliciesRestClient> {
  const credential = createTestCredential();
  await recorder.start(recorderOptions);

  return PurviewMetadataPoliciesClient(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({ options }),
  );
}
