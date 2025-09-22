// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes specified container under its account.
 *
 * @summary Deletes specified container under its account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/BlobContainersDelete.json
 */
async function deleteContainers(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4079";
  const accountName = "sto4506";
  const containerName = "container9689";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobContainers.delete(
    resourceGroupName,
    accountName,
    containerName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteContainers();
}

main().catch(console.error);
