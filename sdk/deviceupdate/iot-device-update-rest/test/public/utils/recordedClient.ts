// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTestCredential } from "@azure-tools/test-credential";
import DeviceUpdate, { DeviceUpdateRestClient } from "../../../src";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";

export function createRecordedClient(recorder: Recorder): DeviceUpdateRestClient {
  const credential = createTestCredential();
  const client = DeviceUpdate(
    assertEnvironmentVariable("ENDPOINT"),
    credential,
    recorder.configureClientOptions({})
  );
  return client;
}

export async function startRecorder(recorder: Recorder): Promise<void> {
  await recorder.start({
    envSetupForPlayback: {
      ENDPOINT: "endpoint",
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    },
  });
}
