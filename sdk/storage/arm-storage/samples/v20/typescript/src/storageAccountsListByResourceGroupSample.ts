// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the storage accounts available under the given resource group. Note that storage keys are not returned; use the ListKeys operation for this.
 *
 * @summary lists all the storage accounts available under the given resource group. Note that storage keys are not returned; use the ListKeys operation for this.
 * x-ms-original-file: 2025-08-01/StorageAccountListByResourceGroup.json
 */
async function storageAccountListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageAccounts.listByResourceGroup("res6117")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await storageAccountListByResourceGroup();
}

main().catch(console.error);
