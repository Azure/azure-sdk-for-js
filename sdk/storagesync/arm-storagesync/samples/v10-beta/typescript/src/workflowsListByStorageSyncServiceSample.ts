// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSync } from "@azure/arm-storagesync";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Workflow List
 *
 * @summary get a Workflow List
 * x-ms-original-file: 2022-09-01/Workflows_ListByStorageSyncService.json
 */
async function workflowsListByStorageSyncService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "52b8da2f-61e0-4a1f-8dde-336911f367fb";
  const client = new MicrosoftStorageSync(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workflows.listByStorageSyncService(
    "SampleResourceGroup_1",
    "SampleStorageSyncService_1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workflowsListByStorageSyncService();
}

main().catch(console.error);
