// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses an Azure Key Vault key to sign/verify, encrypt/decrypt, and wrap/unwrap data.
 */

// Load the .env file if it exists
import "dotenv/config";
import type { TokenCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
import { CryptographyClient, KeyClient } from "@azure/keyvault-keys";
import { createHash } from "node:crypto";

let client: KeyClient;
let credential: TokenCredential;

async function encryptAndDecrypt() {
  const keyName = `crypto-sample-key${Date.now()}`;
  // Connection to Azure Key Vault Cryptography functionality
  const myWorkKey = await client.createKey(keyName, "RSA");
  const cryptoClient = new CryptographyClient(myWorkKey.id!, credential);
  const encrypt = await cryptoClient.encrypt({
    algorithm: "RSA-OAEP-256",
    plaintext: Buffer.from("My Message"),
  });
  console.log("encrypt result: ", encrypt);
  const decrypt = await cryptoClient.decrypt({
    algorithm: "RSA-OAEP-256",
    ciphertext: encrypt.result,
  });
  console.log("decrypt: ", decrypt.result.toString());
}

async function signAndVerify() {
  const keyName = `crypto-sample-key${Date.now()}`;
  // Connection to Azure Key Vault Cryptography functionality
  const myWorkKey = await client.createKey(keyName, "RSA");
  const cryptoClient = new CryptographyClient(myWorkKey.id!, credential);
  // Sign and Verify
  const message = "MyMessage";
  const hash = createHash("sha256");
  hash.update(message);
  const digest = hash.digest();
  console.log("digest: ", digest);
  const signature = await cryptoClient.sign("RS256", digest);
  console.log("sign result: ", signature);
  const verifyResult = await cryptoClient.verify("RS256", digest, signature.result);
  console.log("verify result: ", verifyResult);
}

async function wrapAndUnwrapKey() {
  const keyName = `crypto-sample-key${Date.now()}`;
  const myWorkKey = await client.createKey(keyName, "RSA");
  const cryptoClient = new CryptographyClient(myWorkKey.id!, credential);
  // Wrap and unwrap
  const wrapped = await cryptoClient.wrapKey("RSA-OAEP-256", Buffer.from("My Message"));
  console.log("wrap result: ", wrapped);
  const unwrapped = await cryptoClient.unwrapKey("RSA-OAEP-256", wrapped.result);
  console.log("unwrap result: ", unwrapped);
}

async function encryptData() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey.id!, credential);

  const encryptResult = await cryptographyClient.encrypt({
    algorithm: "RSA1_5",
    plaintext: Buffer.from("My Message"),
  });
  console.log("encrypt result: ", encryptResult.result);
}

async function decryptData() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey.id!, credential);

  const encryptResult = await cryptographyClient.encrypt({
    algorithm: "RSA1_5",
    plaintext: Buffer.from("My Message"),
  });
  console.log("encrypt result: ", encryptResult.result);

  const decryptResult = await cryptographyClient.decrypt({
    algorithm: "RSA1_5",
    ciphertext: encryptResult.result,
  });
  console.log("decrypt result: ", decryptResult.result.toString());
}

async function signADigest() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const message = "MyMessage";
  const hash = createHash("sha256");

  const digest = hash.update(message).digest();
  console.log("digest: ", digest);

  const signResult = await cryptographyClient.sign("RS256", digest);
  console.log("sign result: ", signResult.result);
}

async function signData() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const signResult = await cryptographyClient.signData("RS256", Buffer.from("My Message"));
  console.log("sign result: ", signResult.result);
}

async function verifyADigestSignature() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const hash = createHash("sha256");
  hash.update("My Message");
  const digest = hash.digest();

  const signResult = await cryptographyClient.sign("RS256", digest);
  console.log("sign result: ", signResult.result);

  const verifyResult = await cryptographyClient.verify("RS256", digest, signResult.result);
  console.log("verify result: ", verifyResult.result);
}

async function verifyADataSignature() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const buffer = Buffer.from("My Message");

  const signResult = await cryptographyClient.signData("RS256", buffer);
  console.log("sign result: ", signResult.result);

  const verifyResult = await cryptographyClient.verifyData("RS256", buffer, signResult.result);
  console.log("verify result: ", verifyResult.result);
}

async function wrapAKey() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
  console.log("wrap result:", wrapResult.result);
}

async function unwrapAKey() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
  console.log("wrap result:", wrapResult.result);

  const unwrapResult = await cryptographyClient.unwrapKey("RSA-OAEP", wrapResult.result);
  console.log("unwrap result: ", unwrapResult.result);
}

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  credential = new DefaultAzureCredential();
  // Connection to Azure Key Vault
  client = new KeyClient(process.env["KEYVAULT_URI"]!, credential);
  await encryptAndDecrypt();
  await signAndVerify();
  await wrapAndUnwrapKey();
  await encryptData();
  await decryptData();
  await signADigest();
  await signData();
  await verifyADigestSignature();
  await verifyADataSignature();
  await wrapAKey();
  await unwrapAKey();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
