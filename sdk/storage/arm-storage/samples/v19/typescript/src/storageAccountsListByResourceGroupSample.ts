// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Lists all the storage accounts available under the given resource group. Note that storage keys are not returned; use the ListKeys operation for this.
 *
 * @summary Lists all the storage accounts available under the given resource group. Note that storage keys are not returned; use the ListKeys operation for this.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountListByResourceGroup.json
 */
async function storageAccountListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res6117";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageAccounts.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await storageAccountListByResourceGroup();
}

main().catch(console.error);
