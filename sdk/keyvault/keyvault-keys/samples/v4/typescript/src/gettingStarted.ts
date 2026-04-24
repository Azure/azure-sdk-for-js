// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Key Vault and creates a KeyClient and CryptographyClient.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { CryptographyClient, KeyClient } from "@azure/keyvault-keys";
import { setLogLevel } from "@azure/logger";
import { createRsaKey } from "./crypto.js";

async function createAKeyClient() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"]!;

  const client = new KeyClient(url, credential);
  console.log("KeyClient vault URL:", client.vaultUrl);
}

async function createAKeyClientWithASpecificVersion() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"]!;

  // Change the Azure Key Vault service API version being used via the `serviceVersion` option
  const client = new KeyClient(url, credential, {
    serviceVersion: "7.5", // Supported versions: 7.0 through 7.6 (default: 7.6). Pin only for backward compat.
  });
  console.log("KeyClient vault URL:", client.vaultUrl);
}

async function createACryptographyClient() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"]!;

  const client = new KeyClient(url, credential);

  // Create or retrieve a key from the keyvault
  const myKey = await client.createKey(`MyCryptoKey-${Date.now()}`, "RSA");

  // Lastly, create our cryptography client and connect to the service
  const cryptographyClient = new CryptographyClient(myKey, credential);
  console.log("CryptographyClient key ID:", cryptographyClient.keyID);
}

async function createALocalCryptographyClient() {
  // Create a CryptographyClient using a local JsonWebKey (no vault required).
  // This is useful when you have the key material locally and want to perform
  // cryptographic operations without network calls to Key Vault.
  const jsonWebKey = createRsaKey();
  const client = new CryptographyClient(jsonWebKey);
  console.log("CryptographyClient key ID:", client.keyID);
}

async function setTheLogLevel() {
  setLogLevel("info");
  console.log(
    "Log level set to 'info'. SDK HTTP request/response details will appear in the console.",
  );
}

export async function main(): Promise<void> {
  await createAKeyClient();
  await createAKeyClientWithASpecificVersion();
  await createACryptographyClient();
  await createALocalCryptographyClient();
  await setTheLogLevel();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
