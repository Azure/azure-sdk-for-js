// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Getting started snippets for the @azure/keyvault-certificates package.
 */

import { CertificateClient } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("gettingStarted", () => {
  // Client creation

  it("ReadmeSampleCreateClient", async () => {
    // @snippet ReadmeSampleCreateClient
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Build the URL to reach your key vault
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    // Lastly, create our certificates client and connect to the service
    const client = new CertificateClient(url, credential);
    // @snippet-end ReadmeSampleCreateClient
  });

  it("ReadmeSampleCreateClientWithVersion", async () => {
    // @snippet ReadmeSampleCreateClientWithVersion
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    // Change the Azure Key Vault service API version being used via the `serviceVersion` option
    const client = new CertificateClient(url, credential, {
      serviceVersion: "7.5",
    });
    // @snippet-end ReadmeSampleCreateClientWithVersion
  });

  // Logging

  it("SetLogLevel", async () => {
    // @snippet SetLogLevel
    setLogLevel("info");
    // @snippet-end SetLogLevel
  });
});
