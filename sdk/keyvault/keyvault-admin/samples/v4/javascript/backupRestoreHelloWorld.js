// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a BackupClient to backup and fully restore an Azure Key Vault Managed HSM using Azure Storage Blob.
 */

// Load the .env file if it exists
require("dotenv/config");
const { DefaultAzureCredential } = require("@azure/identity");
const { KeyVaultBackupClient } = require("@azure/keyvault-admin");

let client;

async function beginPreBackupWithSas() {
  const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>

  const sasToken = "<sas-token>";
  const poller = await client.beginPreBackup(blobStorageUri, sasToken);

  // Serializing the poller
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginPreBackup(blobStorageUri, sasToken, { resumeFrom: serialized });

  // Waiting until it's done
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function beginPreBackupWithoutSas() {
  const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>

  const poller = await client.beginPreBackup(blobStorageUri);

  // Serializing the poller
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginPreBackup(blobStorageUri, { resumeFrom: serialized });

  // Waiting until it's done
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function beginBackupWithSas() {
  const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>

  const sasToken = "<sas-token>";
  const poller = await client.beginBackup(blobStorageUri, sasToken);

  // Serializing the poller
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginBackup(blobStorageUri, sasToken, { resumeFrom: serialized });

  // Waiting until it's done
  const backupUri = await poller.pollUntilDone();
  console.log(backupUri);
}

async function beginBackupWithoutSas() {
  const blobStorageUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>

  const poller = await client.beginBackup(blobStorageUri);

  // Serializing the poller
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginBackup(blobStorageUri, { resumeFrom: serialized });

  // Waiting until it's done
  const backupUri = await poller.pollUntilDone();
  console.log(backupUri);
}

async function beginRestoreWithSas() {
  const blobStorageUri = "<blob-storage-uri>";
  const sasToken = "<sas-token>";
  const backupResult = await client.beginBackup(blobStorageUri);
  const blobStorageFolderUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>

  const poller = await client.beginRestore(blobStorageFolderUri, sasToken);

  // The poller can be serialized with:
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginRestore(blobStorageFolderUri, sasToken, { resumeFrom: serialized });

  // Waiting until it's done
  const backupUri = await poller.pollUntilDone();
  console.log(backupUri);
}

async function beginRestoreWithoutSas() {
  const blobStorageUri = "<blob-storage-uri>";
  const backupResult = await client.beginBackup(blobStorageUri);
  const blobStorageFolderUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>

  const poller = await client.beginRestore(blobStorageFolderUri);

  // The poller can be serialized with:
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginRestore(blobStorageFolderUri, { resumeFrom: serialized });

  // Waiting until it's done
  await poller.pollUntilDone();
}

async function beginPreRestoreWithSas() {
  const blobStorageUri = "<blob-storage-uri>";
  const sasToken = "<sas-token>";
  const backupResult = await client.beginBackup(blobStorageUri);
  const blobStorageFolderUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>

  const poller = await client.beginPreRestore(blobStorageFolderUri, sasToken);

  // The poller can be serialized with:
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginPreRestore(blobStorageFolderUri, sasToken, { resumeFrom: serialized });

  // Waiting until it's done
  await poller.pollUntilDone();
}

async function beginPreRestoreWithoutSas() {
  const blobStorageUri = "<blob-storage-uri>";
  const backupResult = await client.beginBackup(blobStorageUri);
  const blobStorageFolderUri = "<blob-storage-uri>"; // <Blob storage URL>/<folder name>

  const poller = await client.beginPreRestore(blobStorageFolderUri);

  // The poller can be serialized with:
  const serialized = poller.toString();

  // A new poller can be created with:
  await client.beginPreRestore(blobStorageFolderUri, { resumeFrom: serialized });

  // Waiting until it's done
  await poller.pollUntilDone();
}

async function backupAndRestoreIntegration() {
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
  // Finally, start and wait for the restore operation using the folderUri returned from a previous backup operation.
  const restorePoller = await client.beginRestore(backupResult.folderUri, sasToken);
  await restorePoller.pollUntilDone();
}

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  client = new KeyVaultBackupClient(
    process.env["AZURE_MANAGEDHSM_URI"] || "<managedhsm-url>",
    new DefaultAzureCredential(),
  );
  await beginPreBackupWithSas();
  await beginPreBackupWithoutSas();
  await beginBackupWithSas();
  await beginBackupWithoutSas();
  await beginRestoreWithSas();
  await beginRestoreWithoutSas();
  await beginPreRestoreWithSas();
  await beginPreRestoreWithoutSas();
  await backupAndRestoreIntegration();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

module.exports = { main };
