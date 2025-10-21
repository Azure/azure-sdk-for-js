// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the blob inventory policy associated with the specified storage account.
 *
 * @summary Deletes the blob inventory policy associated with the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountDeleteBlobInventoryPolicy.json
 */
async function storageAccountDeleteBlobInventoryPolicy(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6977";
  const accountName = "sto2527";
  const blobInventoryPolicyName = "default";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobInventoryPolicies.delete(
    resourceGroupName,
    accountName,
    blobInventoryPolicyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountDeleteBlobInventoryPolicy();
}

main().catch(console.error);
