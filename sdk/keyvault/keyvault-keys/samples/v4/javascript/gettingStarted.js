// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with Azure Key Vault and creates a KeyClient and CryptographyClient.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { CryptographyClient, KeyClient } = require("@azure/keyvault-keys");
const { setLogLevel } = require("@azure/logger");

async function createAKeyClient() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  const client = new KeyClient(url, credential);
}

async function createAKeyClientWithASpecificVersion() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  // Change the Azure Key Vault service API version being used via the `serviceVersion` option
  const client = new KeyClient(url, credential, {
    serviceVersion: "7.0", // Or 7.1
  });
}

async function createACryptographyClient() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  const client = new KeyClient(url, credential);

  // Create or retrieve a key from the keyvault
  const myKey = await client.createKey("MyKey", "RSA");

  // Lastly, create our cryptography client and connect to the service
  const cryptographyClient = new CryptographyClient(myKey, credential);
}

async function createALocalCryptographyClient() {
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
}

async function setTheLogLevel() {
  setLogLevel("info");
}

async function main() {
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

module.exports = { main };
