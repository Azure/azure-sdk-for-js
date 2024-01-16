// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DigitalTwinsClient } from "../../src";
import { env, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";

export async function authenticate(that: Mocha.Context): Promise<any> {
  const recorder = new Recorder(that.currentTest);
  await recorder.start({
    envSetupForPlayback: {
      AZURE_CLIENT_ID: "azure_client_id",
      AZURE_CLIENT_SECRET: "azure_client_secret",
      AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
      AZURE_DIGITALTWINS_URL: "https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net",
    },
  });
  const credential = createTestCredential();
  const AZURE_DIGITALTWINS_URL = env.AZURE_DIGITALTWINS_URL || "";
  const client = new DigitalTwinsClient(
    AZURE_DIGITALTWINS_URL,
    credential,
    recorder.configureClientOptions({}),
  );

  return { recorder, client };
}
