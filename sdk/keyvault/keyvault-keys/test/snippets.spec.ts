// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CryptographyClient, KeyClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { createHash } from "node:crypto";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Build the URL to reach your key vault
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`; // or `https://${vaultName}.managedhsm.azure.net` for managed HSM.
    // @ts-preserve-whitespace
    // Lastly, create our keys client and connect to the service
    const client = new KeyClient(url, credential);
  });

  it("ReadmeSampleCreateClientWithVersion", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    // Build the URL to reach your key vault
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`; // or `https://${vaultName}.managedhsm.azure.net` for managed HSM.
    // @ts-preserve-whitespace
    // Change the Azure Key Vault service API version being used via the `serviceVersion` option
    const client = new KeyClient(url, credential, {
      serviceVersion: "7.0", // Or 7.1
    });
  });

  it("ReadmeSampleCreateKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    const result = await client.createKey(keyName, "RSA");
    console.log("result: ", result);
  });

  it("ReadmeSampleCreateEcKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    const result = await client.createEcKey(keyName, { curve: "P-256" });
    console.log("result: ", result);
  });

  it("ReadmeSampleCreateRsaKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    const result = await client.createRsaKey("MyKey", { keySize: 2048 });
    console.log("result: ", result);
  });

  it("ReadmeSampleCreateOctKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    const result = await client.createOctKey("MyKey", { hsm: true });
    console.log("result: ", result);
  });

  it("ReadmeSampleImportKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
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
    // @ts-preserve-whitespace
    const result = await client.importKey("MyKey", jsonWebKey);
  });

  it("ReadmeSampleGetCryptographyClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    // Get a cryptography client for a given key
    const cryptographyClient = client.getCryptographyClient("MyKey");
  });

  it("ReadmeSampleGetKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const latestKey = await client.getKey(keyName);
    console.log(`Latest version of the key ${keyName}: `, latestKey);
    // @ts-preserve-whitespace
    const specificKey = await client.getKey(keyName, { version: latestKey.properties.version! });
    console.log(
      `The key ${keyName} at the version ${latestKey.properties.version!}: `,
      specificKey,
    );
  });

  it("ReadmeSampleGetKeyAttestation", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT MANAGED HSM NAME>";
    const url = `https://${vaultName}.managedhsm.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const latestKey = await client.getKeyAttestation(keyName);
    console.log(`Latest version of the key ${keyName}: `, latestKey);
    // @ts-preserve-whitespace
    const specificKey = await client.getKeyAttestation(keyName, {
      version: latestKey.properties.version!,
    });
    console.log(
      `The key ${keyName} at the version ${latestKey.properties.version!}: `,
      specificKey,
    );
  });

  it("ReadmeSampleGetDeletedKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    await client.getDeletedKey(keyName);
  });

  it("ReadmeSamplePurgeDeletedKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    await client.purgeDeletedKey(keyName);
  });

  it("ReadmeSampleRecoverDeletedKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const deletePoller = await client.beginDeleteKey(keyName);
    await deletePoller.pollUntilDone();
    // @ts-preserve-whitespace
    const recoverPoller = await client.beginRecoverDeletedKey(keyName);
    const recoveredKey = await recoverPoller.pollUntilDone();
  });

  it("ReadmeSampleBackupKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const backupContents = await client.backupKey(keyName);
  });

  it("ReadmeSampleRestoreKeyBackup", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const backupContents = await client.backupKey(keyName);
    // @ts-preserve-whitespace
    const key = await client.restoreKeyBackup(backupContents);
  });

  it("ReadmeSampleGetRandomBytes", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const bytes = await client.getRandomBytes(10);
  });

  it("ReadmeSampleCreateKeyWithAttributes", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const result = await client.createKey(keyName, "RSA", {
      enabled: false,
    });
    console.log("result: ", result);
  });

  it("ReadmeSampleUpdateKeyProperties", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const result = await client.createKey(keyName, "RSA");
    await client.updateKeyProperties(keyName, result.properties.version, {
      enabled: false,
    });
  });

  it("ReadmeSampleDeleteKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteKey(keyName);
    await poller.pollUntilDone();
  });

  it("ReadmeSampleReleaseKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const result = await client.releaseKey("myKey", "<attestation-target>");
  });

  it("ReadmeSampleGetKeyRotationPolicy", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const result = await client.getKeyRotationPolicy(keyName);
  });

  it("ReadmeSampleUpdateKeyRotationPolicy", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const myPolicy = await client.getKeyRotationPolicy(keyName);
    // @ts-preserve-whitespace
    const setPolicy = await client.updateKeyRotationPolicy(keyName, myPolicy);
  });

  it("ReadmeSampleDeleteKeySoftDelete", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteKey(keyName);
    // @ts-preserve-whitespace
    // You can use the deleted key immediately:
    const deletedKey = poller.getResult();
    // @ts-preserve-whitespace
    // The key is being deleted. Only wait for it if you want to restore it or purge it.
    await poller.pollUntilDone();
    // @ts-preserve-whitespace
    // You can also get the deleted key this way:
    await client.getDeletedKey(keyName);
    // @ts-preserve-whitespace
    // Deleted keys can also be recovered or purged:
    // @ts-preserve-whitespace
    // recoverDeletedKey also returns a poller, just like beginDeleteKey.
    const recoverPoller = await client.beginRecoverDeletedKey(keyName);
    await recoverPoller.pollUntilDone();
    // @ts-preserve-whitespace
    // And here is how to purge a deleted key
    await client.purgeDeletedKey(keyName);
  });

  it("ReadmeSampleDeleteKeyWait", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteKey(keyName);
    // @ts-preserve-whitespace
    // You can use the deleted key immediately:
    let deletedKey = poller.getResult();
    // @ts-preserve-whitespace
    // Or you can wait until the key finishes being deleted:
    deletedKey = await poller.pollUntilDone();
    console.log(deletedKey);
  });

  it("ReadmeSampleDeleteKeyWaitIndividually", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // @ts-preserve-whitespace
    const poller = await client.beginDeleteKey(keyName);
    // @ts-preserve-whitespace
    while (!poller.isDone()) {
      await poller.poll();
      await delay(5000);
    }
    // @ts-preserve-whitespace
    console.log(`The key ${keyName} is fully deleted`);
  });

  it("ReadmeSampleKeyRotation", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    // Set the key's automated rotation policy to rotate the key 30 days before expiry.
    const policy = await client.updateKeyRotationPolicy(keyName, {
      lifetimeActions: [
        {
          action: "Rotate",
          timeBeforeExpiry: "P30D",
        },
      ],
      // You may also specify the duration after which any newly rotated key will expire.
      // In this case, any new key versions will expire after 90 days.
      expiresIn: "P90D",
    });
    // @ts-preserve-whitespace
    // You can get the current key rotation policy of a given key by calling the getKeyRotationPolicy method.
    const currentPolicy = await client.getKeyRotationPolicy(keyName);
    // @ts-preserve-whitespace
    // Finally, you can rotate a key on-demand by creating a new version of the given key.
    const rotatedKey = await client.rotateKey(keyName);
  });

  it("ReadmeSampleListKeys", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    for await (const keyProperties of client.listPropertiesOfKeys()) {
      console.log("Key properties: ", keyProperties);
    }
    // @ts-preserve-whitespace
    for await (const deletedKey of client.listDeletedKeys()) {
      console.log("Deleted: ", deletedKey);
    }
    // @ts-preserve-whitespace
    for await (const versionProperties of client.listPropertiesOfKeyVersions(keyName)) {
      console.log("Version properties: ", versionProperties);
    }
  });

  it("ReadmeSampleListKeysByPage", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const keyName = "MyKeyName";
    // @ts-preserve-whitespace
    for await (const page of client.listPropertiesOfKeys().byPage()) {
      for (const keyProperties of page) {
        console.log("Key properties: ", keyProperties);
      }
    }
    // @ts-preserve-whitespace
    for await (const page of client.listDeletedKeys().byPage()) {
      for (const deletedKey of page) {
        console.log("Deleted key: ", deletedKey);
      }
    }
    // @ts-preserve-whitespace
    for await (const page of client.listPropertiesOfKeyVersions(keyName).byPage()) {
      for (const versionProperties of page) {
        console.log("Version: ", versionProperties);
      }
    }
  });

  it("ReadmeSampleCreateCryptographyClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    // Create or retrieve a key from the keyvault
    const myKey = await client.createKey("MyKey", "RSA");
    // @ts-preserve-whitespace
    // Lastly, create our cryptography client and connect to the service
    const cryptographyClient = new CryptographyClient(myKey, credential);
  });

  it("ReadmeSampleEncrypt", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const myKey = await client.createKey("MyKey", "RSA");
    const cryptographyClient = new CryptographyClient(myKey.id, credential);
    // @ts-preserve-whitespace
    const encryptResult = await cryptographyClient.encrypt({
      algorithm: "RSA1_5",
      plaintext: Buffer.from("My Message"),
    });
    console.log("encrypt result: ", encryptResult.result);
  });

  it("ReadmeSampleDecrypt", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const myKey = await client.createKey("MyKey", "RSA");
    const cryptographyClient = new CryptographyClient(myKey.id, credential);
    // @ts-preserve-whitespace
    const encryptResult = await cryptographyClient.encrypt({
      algorithm: "RSA1_5",
      plaintext: Buffer.from("My Message"),
    });
    console.log("encrypt result: ", encryptResult.result);
    // @ts-preserve-whitespace
    const decryptResult = await cryptographyClient.decrypt({
      algorithm: "RSA1_5",
      ciphertext: encryptResult.result,
    });
    console.log("decrypt result: ", decryptResult.result.toString());
  });

  it("ReadmeSampleSign", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    let myKey = await client.createKey("MyKey", "RSA");
    const cryptographyClient = new CryptographyClient(myKey, credential);
    // @ts-preserve-whitespace
    const signatureValue = "MySignature";
    const hash = createHash("sha256");
    // @ts-preserve-whitespace
    const digest = hash.update(signatureValue).digest();
    console.log("digest: ", digest);
    // @ts-preserve-whitespace
    const signResult = await cryptographyClient.sign("RS256", digest);
    console.log("sign result: ", signResult.result);
  });

  it("ReadmeSampleSignData", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const myKey = await client.createKey("MyKey", "RSA");
    const cryptographyClient = new CryptographyClient(myKey, credential);
    // @ts-preserve-whitespace
    const signResult = await cryptographyClient.signData("RS256", Buffer.from("My Message"));
    console.log("sign result: ", signResult.result);
  });

  it("ReadmeSampleVerify", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const myKey = await client.createKey("MyKey", "RSA");
    const cryptographyClient = new CryptographyClient(myKey, credential);
    // @ts-preserve-whitespace
    const hash = createHash("sha256");
    hash.update("My Message");
    const digest = hash.digest();
    // @ts-preserve-whitespace
    const signResult = await cryptographyClient.sign("RS256", digest);
    console.log("sign result: ", signResult.result);
    // @ts-preserve-whitespace
    const verifyResult = await cryptographyClient.verify("RS256", digest, signResult.result);
    console.log("verify result: ", verifyResult.result);
  });

  it("ReadmeSampleVerifyData", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const myKey = await client.createKey("MyKey", "RSA");
    const cryptographyClient = new CryptographyClient(myKey, credential);
    // @ts-preserve-whitespace
    const buffer = Buffer.from("My Message");
    // @ts-preserve-whitespace
    const signResult = await cryptographyClient.signData("RS256", buffer);
    console.log("sign result: ", signResult.result);
    // @ts-preserve-whitespace
    const verifyResult = await cryptographyClient.verifyData("RS256", buffer, signResult.result);
    console.log("verify result: ", verifyResult.result);
  });

  it("ReadmeSampleWrapKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const myKey = await client.createKey("MyKey", "RSA");
    const cryptographyClient = new CryptographyClient(myKey, credential);
    // @ts-preserve-whitespace
    const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
    console.log("wrap result:", wrapResult.result);
  });

  it("ReadmeSampleUnwrapKey", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-preserve-whitespace
    const vaultName = "<YOUR KEYVAULT NAME>";
    const url = `https://${vaultName}.vault.azure.net`;
    // @ts-preserve-whitespace
    const client = new KeyClient(url, credential);
    // @ts-preserve-whitespace
    const myKey = await client.createKey("MyKey", "RSA");
    const cryptographyClient = new CryptographyClient(myKey, credential);
    // @ts-preserve-whitespace
    const wrapResult = await cryptographyClient.wrapKey("RSA-OAEP", Buffer.from("My Key"));
    console.log("wrap result:", wrapResult.result);
    // @ts-preserve-whitespace
    const unwrapResult = await cryptographyClient.unwrapKey("RSA-OAEP", wrapResult.result);
    console.log("unwrap result: ", unwrapResult.result);
  });

  it("ReadmeSampleCreateCryptographyClientLocal", async () => {
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
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
