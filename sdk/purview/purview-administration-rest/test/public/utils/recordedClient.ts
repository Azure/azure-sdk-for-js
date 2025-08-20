// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/// <reference lib="esnext.asynciterable" />

import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import { PurviewAccount, PurviewMetadataPolicies } from "@azure-rest/purview-administration";
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
): Promise<PurviewAccount.Client.PurviewAccountClient> {
  const credential = createTestCredential();
  await recorder.start(recorderOptions);

  return PurviewAccount.createClient(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({ options }),
  );
}

export async function createMetadataClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<PurviewMetadataPolicies.Client.PurviewMetadataPoliciesClient> {
  const credential = createTestCredential();
  await recorder.start(recorderOptions);

  return PurviewMetadataPolicies.createClient(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({ options }),
  );
}
