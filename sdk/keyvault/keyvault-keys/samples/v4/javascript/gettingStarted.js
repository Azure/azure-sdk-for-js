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

  const url = process.env["KEYVAULT_URI"];

  const client = new KeyClient(url, credential);
  console.log("KeyClient vault URL:", client.vaultUrl);
}

async function createAKeyClientWithASpecificVersion() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"];

  // Change the Azure Key Vault service API version being used via the `serviceVersion` option
  const client = new KeyClient(url, credential, {
    serviceVersion: "7.5", // Supported versions: 7.0 through 7.6 (default: 7.6). Pin only for backward compat.
  });
  console.log("KeyClient vault URL:", client.vaultUrl);
}

async function createACryptographyClient() {
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"];

  const client = new KeyClient(url, credential);

  // Create or retrieve a key from the keyvault
  const myKey = await client.createKey(`MyCryptoKey-${Date.now()}`, "RSA");

  // Lastly, create our cryptography client and connect to the service
  const cryptographyClient = new CryptographyClient(myKey, credential);
  console.log("CryptographyClient key ID:", cryptographyClient.keyID);
}

async function createALocalCryptographyClient() {
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
  console.log(
    "NOTE: Crypto operations on this illustrative key will fail. Replace with a real JWK.",
  );
}

async function setTheLogLevel() {
  setLogLevel("info");
  console.log(
    "Log level set to 'info'. SDK HTTP request/response details will appear in the console.",
  );
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
