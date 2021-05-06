// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses a BackupClient to backup and fully restore an Azure Key Vault using Azure Storage Blob.
 */

const { KeyVaultBackupClient } = require("@azure/keyvault-admin");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const url = process.env["AZURE_MANAGEDHSM_URI"];
  if (!url) {
    throw new Error("Missing environment variable AZURE_MANAGEDHSM_URI.");
  }
  const client = new KeyVaultBackupClient(url, credential);

  const blobStorageUri = process.env["BLOB_STORAGE_URI"];
  if (!blobStorageUri) {
    throw new Error("Missing environment variable BLOB_STORAGE_URI.");
  }
  const sasToken = process.env["BLOB_STORAGE_SAS_TOKEN"];
  if (!sasToken) {
    throw new Error("Missing environment variable BLOB_STORAGE_SAS_TOKEN.");
  }
  const backupPoller = await client.beginBackup(blobStorageUri, sasToken);
  const backupResult = await backupPoller.pollUntilDone();

  // The folder name should be at the end of the backupFolderUri, as in: https://<blob-storage-endpoint>/<folder-name>
  const folderName = backupResult.backupFolderUri.split("/").pop();

  const restorePoller = await client.beginRestore(blobStorageUri, sasToken, folderName);
  await restorePoller.pollUntilDone();
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
