// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementClient } from "@azure/arm-storageactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the storage tasks available under the subscription.
 *
 * @summary lists all the storage tasks available under the subscription.
 * x-ms-original-file: 2023-01-01/storageTasksList/ListStorageTasksBySubscription.json
 */
async function listStorageTasksBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageActionsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageTasks.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listStorageTasksBySubscription();
}

main().catch(console.error);
