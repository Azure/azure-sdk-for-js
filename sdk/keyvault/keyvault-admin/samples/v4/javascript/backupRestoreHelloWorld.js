// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a BackupClient to backup and fully restore an Azure Key Vault using Azure Storage Blob.
 */

const { KeyVaultBackupClient } = require("@azure/keyvault-admin");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://docs.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();
  const url = process.env["AZURE_MANAGEDHSM_URI"];
  if (!url) {
    throw new Error("Missing environment variable AZURE_MANAGEDHSM_URI.");
  }
  const client = new KeyVaultBackupClient(url, credential);

  const sasToken = process.env["BLOB_STORAGE_SAS_TOKEN"];
  if (!sasToken) {
    throw new Error("Missing environment variable BLOB_STORAGE_SAS_TOKEN.");
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

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});

module.exports = { main };
