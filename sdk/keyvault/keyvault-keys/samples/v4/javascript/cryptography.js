// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses an Azure Key Vault key to sign/verify, encrypt/decrypt, and wrap/unwrap data.
 */

const { createHash } = require("crypto");

const { CryptographyClient, KeyClient } = require("@azure/keyvault-keys");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  // Connection to Azure Key Vault
  const client = new KeyClient(url, credential);

  const keyName = `crypto-sample-key${Date.now()}`;

  // Connection to Azure Key Vault Cryptography functionality
  const myWorkKey = await client.createKey(keyName, "RSA");

  const cryptoClient = new CryptographyClient(
    myWorkKey.id, // You can use either the key or the key Id i.e. its url to create a CryptographyClient.
    credential
  );

  // Sign and Verify
  const signatureValue = "MySignature";
  let hash = createHash("sha256");

  hash.update(signatureValue);
  let digest = hash.digest();
  console.log("digest: ", digest);

  const signature = await cryptoClient.sign("RS256", digest);
  console.log("sign result: ", signature);

  const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
  console.log("verify result: ", verifyResult);

  // Encrypt and decrypt
  const encrypt = await cryptoClient.encrypt({
    algorithm: "RSA1_5",
    plaintext: Buffer.from("My Message")
  });
  console.log("encrypt result: ", encrypt);

  const decrypt = await cryptoClient.decrypt({ algorithm: "RSA1_5", ciphertext: encrypt.result });
  console.log("decrypt: ", decrypt.result.toString());

  // Wrap and unwrap
  const wrapped = await cryptoClient.wrapKey("RSA-OAEP", Buffer.from("My Message"));
  console.log("wrap result: ", wrapped);

  const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP", wrapped.result);
  console.log("unwrap result: ", unwrapped);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
