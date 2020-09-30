// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  // - BLOB_STORAGE_URI: URI of the Blob Storage instance, with the name of the container where the Key Vault backups will be generated
  // - BLOB_STORAGE_SAS_TOKEN: URI of the Blob Storage instance, with the name of the container where the Key Vault backups will be generated
  // - CLIENT_OBJECT_ID: Object ID of the application, tenant or principal to whom the role will be assigned to
  const credential = new DefaultAzureCredential();
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const client = new KeyVaultBackupClient(url, credential);

  const keyClient = new KeyClient(url, credential);
  const keyName = "key-name";
  const key = await keyClient.createRsaKey(keyName);

  const blobStorageUri = process.env["BLOB_STORAGE_URI"];
  const sasToken = process.env["BLOB_STORAGE_SAS_TOKEN"];
  const backupPoller = await client.beginBackup(blobStorageUri, sasToken);
  const backupURI = await backupPoller.pollUntilDone();

  // The folder name should be at the end of the blobStorageUri, as in: https://<blob-storage-endpoint>/<folder-name>
  const folderName = "backup";

  const selectiveRestorePoller = await client.beginSelectiveRestore(
    blobStorageUri,
    sasToken,
    folderName,
    key.name
  );
  await selectiveRestorePoller.pollUntilDone();

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
