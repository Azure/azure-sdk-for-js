// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Authenticates with Azure Key Vault and creates a KeyClient and CryptographyClient.
 */

import { CryptographyClient, KeyClient } from "../../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { createRsaKey } from "./crypto.js";
import { describe, it } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("gettingStarted", () => {
  // --- Client Construction ---

  it("create a key client", async () => {
    // @snippet ReadmeSampleCreateClient
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"]!!;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    console.log("KeyClient vault URL:", client.vaultUrl);
    // @snippet-end ReadmeSampleCreateClient
  });

  it("create a key client with a specific version", async () => {
    // @snippet ReadmeSampleCreateClientWithVersion
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"]!!;
    // @ts-preserve-whitespace
    // Change the Azure Key Vault service API version being used via the `serviceVersion` option
    const client = new KeyClient(url, credential, {
      serviceVersion: "7.5", // Supported versions: 7.0 through 7.6 (default: 7.6). Pin only for backward compat.
    });
    console.log("KeyClient vault URL:", client.vaultUrl);
    // @snippet-end ReadmeSampleCreateClientWithVersion
  });

  // --- Cryptography Client Construction ---

  it("create a cryptography client", async () => {
    // @snippet ReadmeSampleCreateCryptographyClient
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"]!!;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    // Create or retrieve a key from the keyvault
    const myKey = await client.createKey(`MyCryptoKey-${Date.now()}`, "RSA");
    // @ts-preserve-whitespace
    // Lastly, create our cryptography client and connect to the service
    const cryptographyClient = new CryptographyClient(myKey, credential);
    console.log("CryptographyClient key ID:", cryptographyClient.keyID);
    // @snippet-end ReadmeSampleCreateCryptographyClient
  });

  it("create a local cryptography client", async () => {
    // @snippet ReadmeSampleCreateCryptographyClientLocal
    // Create a CryptographyClient using a local JsonWebKey (no vault required).
    // This is useful when you have the key material locally and want to perform
    // cryptographic operations without network calls to Key Vault.
    const jsonWebKey = createRsaKey();
    const client = new CryptographyClient(jsonWebKey);
    console.log("CryptographyClient key ID:", client.keyID);
    // @snippet-end ReadmeSampleCreateCryptographyClientLocal
  });

  // --- Logging ---

  it("set the log level", async () => {
    // @snippet SetLogLevel
    setLogLevel("info");
    console.log(
      "Log level set to 'info'. SDK HTTP request/response details will appear in the console.",
    );
    // @snippet-end SetLogLevel
  });
});
