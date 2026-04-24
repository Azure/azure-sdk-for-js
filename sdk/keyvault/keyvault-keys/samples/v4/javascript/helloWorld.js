// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates, reads, lists, and deletes keys.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyClient } = require("@azure/keyvault-keys");
const { createRsaKey } = require("./crypto.js");
const { retryWithBackoff } = require("./utils.js");

let client;

async function createAndGetAKey() {
  // Create unique names for keys we will use in this sample
  const uniqueString = `${Date.now()}`;
  const keyName = `sample-key-${uniqueString}`;
  const ecKeyName = `sample-ec-key-${uniqueString}`;
  const rsaKeyName = `sample-rsa-key-${uniqueString}`;
  // You can create keys using the general method
  const result = await client.createKey(keyName, "EC");
  console.log("key: ", result);
  // Or using specialized key creation methods
  const ecResult = await client.createEcKey(ecKeyName, { curve: "P-256" });
  const rsaResult = await client.createRsaKey(rsaKeyName, { keySize: 2048 });
  console.log("Elliptic curve key: ", ecResult);
  console.log("RSA Key: ", rsaResult);
  // Get a specific key
  const key = await client.getKey(keyName);
  console.log("key: ", key);
}

async function listKeys() {
  // List all non-deleted keys in the vault.
  // listPropertiesOfKeys() returns key metadata (name, version, attributes) without key material.
  // Call getKey(name) only when you need the full JsonWebKey for cryptographic use.
  for await (const keyProperties of client.listPropertiesOfKeys()) {
    console.log("key: ", keyProperties.name);
  }
}

async function updateAndDeleteKeys() {
  const uniqueString = `${Date.now()}`;
  const keyName = `sample-key-${uniqueString}`;
  const result = await client.createKey(keyName, "EC");
  // Update the key
  const updatedKey = await client.updateKeyProperties(keyName, result.properties.version, {
    enabled: false,
  });
  console.log("updated key: ", updatedKey);
  // Delete the key - the key is soft-deleted but not yet purged
  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();
  // The `getDeletedKey` method can be used to retrieve any soft-deleted key
  const deletedKey = await client.getDeletedKey(keyName);
  console.log("deleted key: ", deletedKey);
  // Purge the key - the key is permanently deleted
  // This operation could take some time to complete
  console.time("purge a single key");
  await client.purgeDeletedKey(keyName);
  console.timeEnd("purge a single key");
}

async function createAKey() {
  const keyName = `key-sample-${Date.now()}`;
  const result = await client.createKey(keyName, "RSA");
  console.log("result: ", result);
}

async function createAnEcKey() {
  const keyName = `key-ec-${Date.now()}`;
  const result = await client.createEcKey(keyName, { curve: "P-256" });
  console.log("result: ", result);
}

async function createAnRsaKey() {
  const keyName = `key-rsa-${Date.now()}`;
  const result = await client.createRsaKey(keyName, { keySize: 2048 });
  console.log("result: ", result);
}

async function importAKey() {
  const keyName = `key-imported-${Date.now()}`;
  const jsonWebKey = createRsaKey();

  const result = await client.importKey(keyName, jsonWebKey);
  console.log("result: ", result);
}

async function getACryptographyClient() {
  const keyName = `key-crypto-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  // Get a cryptography client for a given key
  const cryptographyClient = client.getCryptographyClient(keyName);
  console.log("CryptographyClient key ID:", cryptographyClient.keyID);
}

async function getAKey() {
  const keyName = `key-to-get-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const latestKey = await client.getKey(keyName);
  console.log(`Latest version of the key ${keyName}: `, latestKey);

  const specificKey = await client.getKey(keyName, { version: latestKey.properties.version });
  console.log(`The key ${keyName} at the version ${latestKey.properties.version}: `, specificKey);
}

async function createAKeyWithAttributes() {
  const keyName = `key-with-attrs-${Date.now()}`;

  const result = await client.createKey(keyName, "RSA", {
    enabled: false,
  });
  console.log("result: ", result);
}

async function updateKeyProperties() {
  const keyName = `key-to-update-${Date.now()}`;

  const result = await client.createKey(keyName, "RSA");
  const updatedKey = await client.updateKeyProperties(keyName, result.properties.version, {
    enabled: false,
  });
  console.log("updatedKey: ", updatedKey);
}

async function deleteAKey() {
  const keyName = `key-to-delete-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const poller = await client.beginDeleteKey(keyName);
  const deletedKey = await poller.pollUntilDone();
  console.log("deletedKey: ", deletedKey);
}

async function getADeletedKey() {
  const keyName = `key-get-deleted-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();

  const deletedKey = await client.getDeletedKey(keyName);
  console.log("deletedKey: ", deletedKey);
}

async function purgeADeletedKey() {
  const keyName = `key-to-purge-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();

  await client.purgeDeletedKey(keyName);
  console.log("Key purged.");
}

async function recoverADeletedKey() {
  const keyName = `key-to-recover-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();

  const recoverPoller = await client.beginRecoverDeletedKey(keyName);
  const recoveredKey = await recoverPoller.pollUntilDone();
  console.log("recoveredKey: ", recoveredKey);
}

async function backUpAKey() {
  const keyName = `key-to-backup-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const backupContents = await client.backupKey(keyName);
  console.log("backupContents: ", backupContents);
}

async function restoreAKeyFromBackup() {
  const keyName = `key-to-restore-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const backupContents = await client.backupKey(keyName);

  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();

  await client.purgeDeletedKey(keyName);

  if (!backupContents) {
    throw new Error("backupKey returned undefined — cannot restore key.");
  }

  const restoredKey = await retryWithBackoff(() => client.restoreKeyBackup(backupContents));
  console.log("restoredKey: ", restoredKey);
}

async function deleteAKeyWithSoftDelete() {
  const keyName = `key-soft-delete-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const poller = await client.beginDeleteKey(keyName);

  // You can use the deleted key immediately:
  const deletedKey = poller.getResult();
  console.log("deletedKey: ", deletedKey);

  // The key is being deleted. Only wait for it if you want to restore it or purge it.
  await poller.pollUntilDone();

  // You can also get the deleted key this way:
  const fetchedDeleted = await client.getDeletedKey(keyName);
  console.log("fetchedDeleted: ", fetchedDeleted);

  // Deleted keys can also be recovered or purged:

  // recoverDeletedKey also returns a poller, just like beginDeleteKey.
  const recoverPoller = await client.beginRecoverDeletedKey(keyName);
  await recoverPoller.pollUntilDone();

  // If you recover the key, delete it again before purging it.
  const purgePoller = await client.beginDeleteKey(keyName);
  await purgePoller.pollUntilDone();

  // And here is how to purge a deleted key
  await client.purgeDeletedKey(keyName);
}

async function deleteAKeyAndWaitForCompletion() {
  const keyName = `key-delete-wait-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const poller = await client.beginDeleteKey(keyName);

  // You can use the deleted key immediately:
  let deletedKey = poller.getResult();

  // Or you can wait until the key finishes being deleted:
  deletedKey = await poller.pollUntilDone();
  console.log(deletedKey);
}

async function deleteAKeyAndPollIndividually() {
  const keyName = `key-delete-poll-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const poller = await client.beginDeleteKey(keyName);

  while (!poller.isDone()) {
    await poller.poll();
    await delay(5000);
  }

  console.log(`The key ${keyName} is fully deleted`);
}

async function listAllKeys() {
  const keyName = `key-list-all-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  for await (const keyProperties of client.listPropertiesOfKeys()) {
    console.log("Key properties: ", keyProperties);
  }

  for await (const deletedKey of client.listDeletedKeys()) {
    console.log("Deleted: ", deletedKey);
  }

  for await (const versionProperties of client.listPropertiesOfKeyVersions(keyName)) {
    console.log("Version properties: ", versionProperties);
  }
}

async function listKeysByPage() {
  const keyName = `key-list-page-${Date.now()}`;

  await client.createKey(keyName, "RSA");

  for await (const page of client.listPropertiesOfKeys().byPage()) {
    for (const keyProperties of page) {
      console.log("Key properties: ", keyProperties);
    }
  }

  for await (const page of client.listDeletedKeys().byPage()) {
    for (const deletedKey of page) {
      console.log("Deleted key: ", deletedKey);
    }
  }

  for await (const page of client.listPropertiesOfKeyVersions(keyName).byPage()) {
    for (const versionProperties of page) {
      console.log("Version: ", versionProperties);
    }
  }
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();
  client = new KeyClient(process.env["KEYVAULT_URI"], credential);
  await createAndGetAKey();
  await listKeys();
  await updateAndDeleteKeys();
  await createAKey();
  await createAnEcKey();
  await createAnRsaKey();
  await importAKey();
  await getACryptographyClient();
  await getAKey();
  await createAKeyWithAttributes();
  await updateKeyProperties();
  await deleteAKey();
  await getADeletedKey();
  await purgeADeletedKey();
  await recoverADeletedKey();
  await backUpAKey();
  await restoreAKeyFromBackup();
  await deleteAKeyWithSoftDelete();
  await deleteAKeyAndWaitForCompletion();
  await deleteAKeyAndPollIndividually();
  await listAllKeys();
  await listKeysByPage();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
