// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes specified container under its account.
 *
 * @summary deletes specified container under its account.
 * x-ms-original-file: 2025-08-01/BlobContainersDelete.json
 */
async function deleteContainers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.blobContainers.delete("res4079", "sto4506", "container9689");
}

async function main() {
  await deleteContainers();
}

main().catch(console.error);
