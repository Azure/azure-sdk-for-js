// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a BackupClient to backup and restore a specific key in an Azure Key Vault Managed HSM using Azure Storage Blob.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyVaultBackupClient } = require("@azure/keyvault-admin");
const { KeyClient } = require("@azure/keyvault-keys");

let client;
let keyClient;

async function beginSelectiveKeyRestoreWithSas() {
  const blobStorageUri = "<blob-storage-uri>";
  const sasToken = "<sas-token>";
  const keyName = "<key-name>";
  await keyClient.createRsaKey(keyName);
  const backupPoller = await client.beginBackup(blobStorageUri, sasToken);
  const backupResult = await backupPoller.pollUntilDone();
  const backupFolderUri = backupResult.folderUri;
  const poller = await client.beginSelectiveKeyRestore(keyName, backupFolderUri, sasToken);

  // Serializing the poller
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginSelectiveKeyRestore(keyName, backupFolderUri, sasToken, {
    resumeFrom: serialized,
  });

  // Waiting until it's done
  await poller.pollUntilDone();
}

async function beginSelectiveKeyRestoreWithoutSas() {
  const blobStorageUri = "<blob-storage-uri>";
  const keyName = "<key-name>";
  await keyClient.createRsaKey(keyName);
  const backupPoller = await client.beginBackup(blobStorageUri);
  const backupResult = await backupPoller.pollUntilDone();
  const backupFolderUri = backupResult.folderUri;
  const poller = await client.beginSelectiveKeyRestore(keyName, backupFolderUri);

  // Serializing the poller
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginSelectiveKeyRestore(keyName, backupFolderUri, { resumeFrom: serialized });

  // Waiting until it's done
  await poller.pollUntilDone();
}

async function backupAndSelectiveKeyRestoreIntegration() {
  const keyName = "<key-name>";
  const key = await keyClient.createRsaKey(keyName);
  const sasToken = process.env["BLOB_STORAGE_SAS_TOKEN"] || "<blob-storage-sas-token>";
  /**
   * Helper function to construct a valid blob container URI from its parts.
   */
  function buildBlobContainerUri() {
    const blobStorageUri = process.env["BLOB_STORAGE_URI"];
    if (!blobStorageUri) {
      throw new Error("Missing environment variable BLOB_STORAGE_URI.");
    }
    const blobContainerName = process.env["BLOB_CONTAINER_NAME"];
    if (!blobContainerName) {
      throw new Error("Missing environment variable BLOB_CONTAINER_NAME.");
    }
    // If there are trailing slashes, remove them before building the URI.
    return `${blobStorageUri.replace(/\/$/, "")}/${blobContainerName}`;
  }
  // Create a Uri with the storage container path.
  const blobContainerUri = buildBlobContainerUri();
  // Start the backup and wait for its completion.
  const backupPoller = await client.beginBackup(blobContainerUri, sasToken);
  const backupResult = await backupPoller.pollUntilDone();
  console.log("backupResult", backupResult);
  // Finally, start and wait for the restore operation using the folderUri returned from a previous backup operation.
  const selectiveKeyRestorePoller = await client.beginSelectiveKeyRestore(
    key.name,
    backupResult.folderUri,
    sasToken,
  );
  const restoreResult = await selectiveKeyRestorePoller.pollUntilDone();
  console.log("restoreResult", restoreResult);
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const url = process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>";
  const credential = new DefaultAzureCredential();
  client = new KeyVaultBackupClient(url, credential);
  keyClient = new KeyClient(url, credential);
  await beginSelectiveKeyRestoreWithSas();
  await beginSelectiveKeyRestoreWithoutSas();
  await backupAndSelectiveKeyRestoreIntegration();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
