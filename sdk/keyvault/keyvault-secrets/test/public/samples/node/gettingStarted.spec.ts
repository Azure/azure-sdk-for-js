// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Authenticates with Azure Key Vault and creates a SecretClient.
 */

import { SecretClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("gettingStarted", () => {
  it("create a secret client", async () => {
    // @snippet ReadmeSampleCreateClient
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"];
    // @ts-preserve-whitespace
    const client = new SecretClient(url, credential);
    // @snippet-end ReadmeSampleCreateClient
  });

  it("create a secret client with a specific version", async () => {
    // @snippet ReadmeSampleCreateClientWithVersion
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"];
    // @ts-preserve-whitespace
    // Change the Azure Key Vault service API version being used via the `serviceVersion` option
    const client = new SecretClient(url, credential, {
      serviceVersion: "7.0", // Supported versions: 7.0 through 7.6
    });
    // @snippet-end ReadmeSampleCreateClientWithVersion
  });

  it("set the log level", async () => {
    // @snippet SetLogLevel
    setLogLevel("info");
    // @snippet-end SetLogLevel
  });
});
