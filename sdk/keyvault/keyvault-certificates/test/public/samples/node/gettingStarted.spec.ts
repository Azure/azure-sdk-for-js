// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Authenticates with Azure Key Vault and creates a CertificateClient.
 */

import { CertificateClient } from "../../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("gettingStarted", () => {
  // Client creation

  it("create a certificate client", async () => {
    // @snippet ReadmeSampleCreateClient
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"]!;
    // @ts-preserve-whitespace
    const client = new CertificateClient(url, credential);
    // @snippet-end ReadmeSampleCreateClient
    console.log(client);
  });

  it("create a certificate client with a specific version", async () => {
    // @snippet ReadmeSampleCreateClientWithVersion
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"]!;
    // @ts-preserve-whitespace
    // Change the Azure Key Vault service API version being used via the `serviceVersion` option
    const client = new CertificateClient(url, credential, {
      serviceVersion: "7.5",
    });
    // @snippet-end ReadmeSampleCreateClientWithVersion
    console.log(client);
  });

  // Logging

  it("set the log level", async () => {
    // @snippet SetLogLevel
    setLogLevel("info");
    // @snippet-end SetLogLevel
  });
});
