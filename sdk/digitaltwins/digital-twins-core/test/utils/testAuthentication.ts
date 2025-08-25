// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { env, Recorder } from "@azure-tools/test-recorder";
import type { TestInfo } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";

export async function authenticate(that: TestInfo): Promise<any> {
  const recorder = new Recorder(that);
  await recorder.start({
    envSetupForPlayback: {
      AZURE_DIGITALTWINS_URL: "https://AZURE_DIGITALTWINS_URL.api.wcus.digitaltwins.azure.net",
    },
    // .id in the body request is not a secret
    removeCentralSanitizers: ["AZSDK3430"],
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
