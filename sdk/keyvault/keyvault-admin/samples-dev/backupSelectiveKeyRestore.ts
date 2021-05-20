// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses a BackupClient to backup and restore a specific key in Azure Key Vault using Azure Storage Blob.
 */

import { KeyVaultBackupClient } from "@azure/keyvault-admin";
import { KeyClient } from "@azure/keyvault-keys";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
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

  const keyClient = new KeyClient(url, credential);
  const keyName = "key-name";
  const key = await keyClient.createRsaKey(keyName);

  const blobStorageUri = process.env["BLOB_STORAGE_URI"];
  if (!blobStorageUri) {
    throw new Error("Missing environment variable BLOB_STORAGE_URI.");
  }
  const sasToken = process.env["BLOB_STORAGE_SAS_TOKEN"];
  if (!sasToken) {
    throw new Error("Missing environment variable BLOB_STORAGE_SAS_TOKEN.");
  }
  const backupPoller = await client.beginBackup(blobStorageUri, sasToken);
  await backupPoller.pollUntilDone();

  const selectiveKeyRestorePoller = await client.beginSelectiveKeyRestore(
    key.name,
    blobStorageUri,
    sasToken
  );
  await selectiveKeyRestorePoller.pollUntilDone();

  // Deleting and purging the key, just in case we want to create the same key again.
  const deleteKeyPoller = await keyClient.beginDeleteKey(keyName);
  await deleteKeyPoller.pollUntilDone();
  await keyClient.purgeDeletedKey(keyName);
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
