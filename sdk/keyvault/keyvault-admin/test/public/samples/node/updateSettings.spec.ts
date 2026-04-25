// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to retrieve and update account settings for Managed HSM.
 */

import { KeyVaultSettingsClient } from "../../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it, beforeEach, afterEach } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("updateSettings", () => {
  let recorder: Recorder;
  let client: KeyVaultSettingsClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start({
      envSetupForPlayback: {
        AZURE_MANAGEDHSM_URI: "https://azure_managedhsm.managedhsm.azure.net/",
      },
      removeCentralSanitizers: ["AZSDK3493", "AZSDK3430", "AZSDK3444"],
    });
    // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
    // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
    // about DefaultAzureCredential and the other credentials that are available for use.
    client = forPublishing(
      new KeyVaultSettingsClient(
        assertEnvironmentVariable("AZURE_MANAGEDHSM_URI"),
        createTestCredential(),
        recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
      ),
      () =>
        new KeyVaultSettingsClient(
          process.env["AZURE_MANAGEDHSM_URI"]!,
          new DefaultAzureCredential(),
        ),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("get and update settings", async () => {
    // Use client.listSettings() to see all available setting names.
    const setting = await client.getSetting("AllowKeyManagementOperationsThroughARM");

    // You can update the setting's value and then pass it back to updateSetting:
    setting.value = true;
    await client.updateSetting(setting);
  });
});
