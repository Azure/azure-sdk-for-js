// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Authenticates with Azure Key Vault and creates a KeyClient and CryptographyClient.
 */

import { CryptographyClient, KeyClient } from "../../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
// Load the .env file if it exists
import "dotenv/config";

describe("gettingStarted", () => {
  // --- Client Construction ---

  it("create a key client", async () => {
    // @snippet ReadmeSampleCreateClient
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"]!;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    console.log("KeyClient vault URL:", client.vaultUrl);
    // @snippet-end ReadmeSampleCreateClient
  });

  it("create a key client with a specific version", async () => {
    // @snippet ReadmeSampleCreateClientWithVersion
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"]!;
    // @ts-preserve-whitespace
    // Change the Azure Key Vault service API version being used via the `serviceVersion` option
    const client = new KeyClient(url, credential, {
      serviceVersion: "7.0", // Supported versions: 7.0 through 7.6
    });
    console.log("KeyClient vault URL:", client.vaultUrl);
    // @snippet-end ReadmeSampleCreateClientWithVersion
  });

  // --- Cryptography Client Construction ---

  it("create a cryptography client", async () => {
    // @snippet ReadmeSampleCreateCryptographyClient
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const url = process.env["KEYVAULT_URI"]!;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    // Create or retrieve a key from the keyvault
    const myKey = await client.createKey("MyKey", "RSA");
    // @ts-preserve-whitespace
    // Lastly, create our cryptography client and connect to the service
    const cryptographyClient = new CryptographyClient(myKey, credential);
    console.log("CryptographyClient key ID:", cryptographyClient.keyID);
    // @snippet-end ReadmeSampleCreateCryptographyClient
  });

  it("create a local cryptography client", async () => {
    // @snippet ReadmeSampleCreateCryptographyClientLocal
    // NOTE: The key material below is illustrative only. Replace with a real JWK from your
    // key management system. Using these placeholder values for actual cryptographic operations will fail.
    const jsonWebKey = {
      kty: "RSA",
      kid: "test-key-123",
      use: "sig",
      alg: "RS256",
      n: new Uint8Array([112, 34, 56, 98, 123, 244, 200, 99]),
      e: new Uint8Array([1, 0, 1]),
      d: new Uint8Array([45, 67, 89, 23, 144, 200, 76, 233]),
      p: new Uint8Array([34, 89, 100, 77, 204, 56, 29, 77]),
      q: new Uint8Array([78, 99, 201, 45, 188, 34, 67, 90]),
      dp: new Uint8Array([23, 45, 78, 56, 200, 144, 32, 67]),
      dq: new Uint8Array([12, 67, 89, 144, 99, 56, 23, 45]),
      qi: new Uint8Array([78, 90, 45, 201, 34, 67, 120, 55]),
    };
    const client = new CryptographyClient(jsonWebKey);
    console.log("CryptographyClient key ID:", client.keyID);
    // @snippet-end ReadmeSampleCreateCryptographyClientLocal
  });

  // --- Logging ---

  it("set the log level", async () => {
    // @snippet SetLogLevel
    setLogLevel("info");
    // @snippet-end SetLogLevel
  });
});
