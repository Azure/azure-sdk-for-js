// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Creates, reads, lists, and deletes keys.
 */

// Load the .env file if it exists
import "dotenv/config";
import { DefaultAzureCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";
import { createRsaKey, stringToUint8Array } from "./crypto.js";
import { retryWithBackoff } from "./utils.js";

let client: KeyClient;
let hsmClient: KeyClient | undefined;

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
  // Or list the keys we have
  for await (const keyProperties of client.listPropertiesOfKeys()) {
    const innerKey = await client.getKey(keyProperties.name);
    console.log("key: ", innerKey);
  }
}

async function updateAndDeleteKeys() {
  const uniqueString = `${Date.now()}`;
  const keyName = `sample-key-${uniqueString}`;
  const result = await client.createKey(keyName, "EC");
  // Update the key
  const updatedKey = await client.updateKeyProperties(keyName, result.properties.version!, {
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
  const keyName = "MyKeyName";
  const result = await client.createKey(keyName, "RSA");
  console.log("result: ", result);
}

async function createAnEcKey() {
  const keyName = "MyEcKeyName";
  const result = await client.createEcKey(keyName, { curve: "P-256" });
  console.log("result: ", result);
}

async function createAnRsaKey() {
  const keyName = "MyRsaKeyName";
  const result = await client.createRsaKey(keyName, { keySize: 2048 });
  console.log("result: ", result);
}

async function createAnOctKey() {
  if (!Boolean(hsmClient)) {
    return; // No HSM configured — skipping this sample.
  }

  const keyName = "MyOctKeyName";
  const result = await hsmClient!.createOctKey(keyName, { hsm: true });
  console.log("result: ", result);
}

async function importAKey() {
  const keyName = "MyKey";
  const jsonWebKey = createRsaKey();

  const result = await client.importKey(keyName, jsonWebKey);
}

async function getACryptographyClient() {
  // Get a cryptography client for a given key
  const cryptographyClient = client.getCryptographyClient("MyKey");
}

async function getAKey() {
  const keyName = "MyGetKeyName";
  await client.createKey(keyName, "RSA");

  const latestKey = await client.getKey(keyName);
  console.log(`Latest version of the key ${keyName}: `, latestKey);

  const specificKey = await client.getKey(keyName, { version: latestKey.properties.version! });
  console.log(`The key ${keyName} at the version ${latestKey.properties.version!}: `, specificKey);
}

async function getKeyAttestation() {
  if (!Boolean(hsmClient)) {
    return; // No HSM configured — skipping this sample.
  }
  const keyName = "MyAttestKeyName";
  await hsmClient!.createRsaKey(keyName, { hsm: true });

  const latestKey = await hsmClient!.getKeyAttestation(keyName);
  console.log(`Latest version of the key ${keyName}: `, latestKey);

  const specificKey = await hsmClient!.getKeyAttestation(keyName, {
    version: latestKey.properties.version!,
  });
  console.log(`The key ${keyName} at the version ${latestKey.properties.version!}: `, specificKey);
}

async function createAKeyWithAttributes() {
  const keyName = "MyAttrKeyName";

  const result = await client.createKey(keyName, "RSA", {
    enabled: false,
  });
  console.log("result: ", result);
}

async function updateKeyProperties() {
  const keyName = "MyUpdateKeyName";

  const result = await client.createKey(keyName, "RSA");
  await client.updateKeyProperties(keyName, result.properties.version, {
    enabled: false,
  });
}

async function deleteAKey() {
  const keyName = "MyDeleteKeyName";
  await client.createKey(keyName, "RSA");

  const poller = await client.beginDeleteKey(keyName);
  await poller.pollUntilDone();
}

async function releaseAKey() {
  if (!Boolean(hsmClient)) {
    return; // No HSM configured — skipping this sample.
  }
  const keyName = "myKey";
  const attestationAuthority = "<attestation-uri>";
  const encodedReleasePolicy = stringToUint8Array(
    JSON.stringify({
      anyOf: [{ anyOf: [{ claim: "sdk-test", equals: "true" }], authority: attestationAuthority }],
      version: "1.0.0",
    }),
  );
  await hsmClient!.createRsaKey(keyName, {
    exportable: true,
    hsm: true,
    keyOps: ["encrypt", "decrypt"],
    releasePolicy: { encodedPolicy: encodedReleasePolicy },
  });
  // Fetch the attestation token from your Azure Attestation Service endpoint.
  // Example: const attestation = await fetch(attestationUri).then((r) => r.text());
  const attestation = "<attestation-token>";

  const result = await hsmClient!.releaseKey(keyName, attestation);
  console.log("result: ", result);
}

async function getADeletedKey() {
  const keyName = "MyGetDeletedKeyName";
  await client.createKey(keyName, "RSA");
  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();

  await client.getDeletedKey(keyName);
}

async function purgeADeletedKey() {
  const keyName = "MyPurgeKeyName";
  await client.createKey(keyName, "RSA");

  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();

  await client.purgeDeletedKey(keyName);
}

async function recoverADeletedKey() {
  const keyName = "MyRecoverKeyName";
  await client.createKey(keyName, "RSA");

  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();

  const recoverPoller = await client.beginRecoverDeletedKey(keyName);
  const recoveredKey = await recoverPoller.pollUntilDone();
  console.log("recoveredKey: ", recoveredKey);
}

async function backUpAKey() {
  const keyName = "MyBackupKeyName";
  await client.createKey(keyName, "RSA");

  const backupContents = await client.backupKey(keyName);
}

async function restoreAKeyFromBackup() {
  const keyName = "MyRestoreKeyName";
  await client.createKey(keyName, "RSA");

  const backupContents = await client.backupKey(keyName);

  const deletePoller = await client.beginDeleteKey(keyName);
  await deletePoller.pollUntilDone();

  await client.purgeDeletedKey(keyName);

  await retryWithBackoff(() => client.restoreKeyBackup(backupContents));
}

async function getRandomBytes() {
  if (!Boolean(hsmClient)) {
    return; // No HSM configured — skipping this sample.
  }

  const bytes = await hsmClient!.getRandomBytes(10);
  console.log("bytes: ", bytes);
}

async function deleteAKeyWithSoftDelete() {
  const keyName = "MySoftDeleteKeyName";
  await client.createKey(keyName, "RSA");

  const poller = await client.beginDeleteKey(keyName);

  // You can use the deleted key immediately:
  const deletedKey = poller.getResult();

  // The key is being deleted. Only wait for it if you want to restore it or purge it.
  await poller.pollUntilDone();

  // You can also get the deleted key this way:
  await client.getDeletedKey(keyName);

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
  const keyName = "MyDeleteWaitKeyName";
  await client.createKey(keyName, "RSA");

  const poller = await client.beginDeleteKey(keyName);

  // You can use the deleted key immediately:
  let deletedKey = poller.getResult();

  // Or you can wait until the key finishes being deleted:
  deletedKey = await poller.pollUntilDone();
  console.log(deletedKey);
}

async function deleteAKeyAndPollIndividually() {
  const keyName = "MyDeletePollKeyName";
  await client.createKey(keyName, "RSA");

  const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

  const poller = await client.beginDeleteKey(keyName);

  while (!poller.isDone()) {
    await poller.poll();
    await delay(5000);
  }

  console.log(`The key ${keyName} is fully deleted`);
}

async function listAllKeys() {
  const keyName = "MyListAllKeyName";
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
  const keyName = "MyListPageKeyName";
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

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();
  client = new KeyClient(process.env["KEYVAULT_URI"] || "<keyvault-url>", credential);
  if (Boolean(process.env["AZURE_MANAGEDHSM_URI"])) {
    hsmClient = new KeyClient(
      process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>",
      credential,
    );
  } else {
    hsmClient = undefined;
  }
  await createAndGetAKey();
  await listKeys();
  await updateAndDeleteKeys();
  await createAKey();
  await createAnEcKey();
  await createAnRsaKey();
  await createAnOctKey();
  await importAKey();
  await getACryptographyClient();
  await getAKey();
  await getKeyAttestation();
  await createAKeyWithAttributes();
  await updateKeyProperties();
  await deleteAKey();
  await releaseAKey();
  await getADeletedKey();
  await purgeADeletedKey();
  await recoverADeletedKey();
  await backUpAKey();
  await restoreAKeyFromBackup();
  await getRandomBytes();
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
