// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all queue services for the storage account
 *
 * @summary list all queue services for the storage account
 * x-ms-original-file: 2026-04-01/QueueServicesList.json
 */
async function queueServicesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.queueServices.list("res9290", "sto1590");
  console.log(result);
}

async function main(): Promise<void> {
  await queueServicesList();
}

main().catch(console.error);
