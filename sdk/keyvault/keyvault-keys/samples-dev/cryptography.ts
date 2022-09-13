// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses an Azure Key Vault key to sign/verify, encrypt/decrypt, and wrap/unwrap data.
 */

import { createHash } from "crypto";

import { CryptographyClient, KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();

  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";

  // Connection to Azure Key Vault
  const client = new KeyClient(url, credential);

  const keyName = `crypto-sample-key${Date.now()}`;

  // Connection to Azure Key Vault Cryptography functionality
  const myWorkKey = await client.createKey(keyName, "RSA");

  const cryptoClient = new CryptographyClient(
    myWorkKey.id!, // You can use either the key or the key Id i.e. its url to create a CryptographyClient.
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
    plaintext: Buffer.from("My Message"),
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
