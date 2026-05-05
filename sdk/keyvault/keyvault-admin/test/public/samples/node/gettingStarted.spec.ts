// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Authenticates with Azure Managed HSM and creates access control, backup, and settings clients.
 */

import {
  KeyVaultAccessControlClient,
  KeyVaultBackupClient,
  KeyVaultSettingsClient,
} from "../../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("gettingStarted", () => {
  // --- Client Creation ---

  it("create an access control client", async () => {
    // @snippet ReadmeSampleCreateAccessControlClient
    const url = process.env["AZURE_MANAGEDHSM_URI"]!;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultAccessControlClient(url, credentials);
    // @snippet-end ReadmeSampleCreateAccessControlClient
    console.log(client);
  });

  it("create a backup client", async () => {
    // @snippet ReadmeSampleCreateBackupClient
    const url = process.env["AZURE_MANAGEDHSM_URI"]!;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultBackupClient(url, credentials);
    // @snippet-end ReadmeSampleCreateBackupClient
    console.log(client);
  });

  it("create a settings client", async () => {
    // @snippet ReadmeSampleCreateSettingsClient
    const url = process.env["AZURE_MANAGEDHSM_URI"]!;
    const credentials = new DefaultAzureCredential();
    const client = new KeyVaultSettingsClient(url, credentials);
    // @snippet-end ReadmeSampleCreateSettingsClient
    console.log(client);
  });

  // --- Logging ---

  it("set the log level", async () => {
    // @snippet SetLogLevel
    setLogLevel("info");
    // @snippet-end SetLogLevel
  });
});
