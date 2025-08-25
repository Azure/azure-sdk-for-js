// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewScanningRestClient } from "@azure-rest/purview-scanning";
import PurviewScanning from "@azure-rest/purview-scanning";
import type { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import type { ClientOptions } from "@azure-rest/core-client";
import { createTestCredential } from "@azure-tools/test-credential";

const replaceableVariables: { [k: string]: string } = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
};

export async function createClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<PurviewScanningRestClient> {
  const credential = createTestCredential();
  await recorder.start(recorderOptions);
  return PurviewScanning(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({ ...options }),
  );
}
