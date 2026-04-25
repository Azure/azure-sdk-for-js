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
import { createHash, randomBytes } from "node:crypto";

let client: KeyClient;
let credential: TokenCredential;

async function encryptData() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const encryptResult = await cryptographyClient.encrypt({
    algorithm: "RSA-OAEP",
    plaintext: Buffer.from("My Message"),
  });
  console.log("encrypt result: ", encryptResult.result);

  const decryptResult = await cryptographyClient.decrypt({
    algorithm: "RSA-OAEP",
    ciphertext: encryptResult.result,
  });
  console.log("decrypt result: ", decryptResult.result.toString());
}

async function decryptData() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const encryptResult = await cryptographyClient.encrypt({
    algorithm: "RSA-OAEP",
    plaintext: Buffer.from("My Message"),
  });
  console.log("encrypt result: ", encryptResult.result);

  const decryptResult = await cryptographyClient.decrypt({
    algorithm: "RSA-OAEP",
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

  const keyMaterial = randomBytes(32); // 256-bit symmetric key material

  const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", keyMaterial);
  console.log("wrap result:", wrapResult.result);

  const unwrapResult = await cryptographyClient.unwrapKey("RSA-OAEP", wrapResult.result);
  console.log("unwrap result: ", unwrapResult.result);
}

async function unwrapAKey() {
  const keyName = `sample-key-${Date.now()}`;
  const myKey = await client.createKey(keyName, "RSA");
  const cryptographyClient = new CryptographyClient(myKey, credential);

  const keyMaterial = randomBytes(32); // 256-bit symmetric key material

  const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", keyMaterial);
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
