// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HanaManagementClient } from "@azure/arm-hanaonazure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023.
 *
 * @summary the product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023.
 * x-ms-original-file: 2020-02-07-preview/SapMonitors_PatchTags.json
 */
async function updateTagsFieldOfASAPMonitor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.sapMonitors.update("myResourceGroup", "mySapMonitor", {
    tags: { testkey: "testvalue" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to the product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023.
 *
 * @summary the product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023.
 * x-ms-original-file: 2020-02-07-preview/SapMonitors_PatchTags_Delete.json
 */
async function deleteTagsFieldOfASAPMonitor(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.sapMonitors.update("myResourceGroup", "mySapMonitor", { tags: {} });
  console.log(result);
}

async function main(): Promise<void> {
  await updateTagsFieldOfASAPMonitor();
  await deleteTagsFieldOfASAPMonitor();
}

main().catch(console.error);
