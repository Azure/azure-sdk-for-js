// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Uses a BackupClient to backup and restore a specific key in an Azure Key Vault Managed HSM using Azure Storage Blob.
 */

import { KeyVaultBackupClient } from "@azure/keyvault-admin";
import { KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  const credential = new DefaultAzureCredential();
  const url = process.env["AZURE_MANAGEDHSM_URI"];
  if (!url) {
    throw new Error("Missing environment variable AZURE_MANAGEDHSM_URI.");
  }
  const client = new KeyVaultBackupClient(url, credential);

  const keyClient = new KeyClient(url, credential);
  const keyName = "key-name";
  const key = await keyClient.createRsaKey(keyName);

  const sasToken = process.env["BLOB_STORAGE_SAS_TOKEN"];
  if (!sasToken) {
    throw new Error("Missing environment variable BLOB_STORAGE_SAS_TOKEN.");
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
    backupResult.folderUri!,
    sasToken,
  );
  const restoreResult = await selectiveKeyRestorePoller.pollUntilDone();
  console.log("restoreResult", restoreResult);
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
