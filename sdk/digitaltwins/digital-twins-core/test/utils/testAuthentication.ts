// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DigitalTwinsClient } from "../../src";
import { env, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";

export async function authenticate(that: Mocha.Context): Promise<any> {
  const recorder = new Recorder(that.currentTest);
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
