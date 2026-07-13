// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Task from the catalog.
 *
 * @summary gets a Task from the catalog.
 * x-ms-original-file: 2026-01-01-preview/CustomizationTasks_Get.json
 */
async function customizationTasksGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.customizationTasks.get(
    "rg1",
    "Contoso",
    "CentralCatalog",
    "SampleTask",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await customizationTasksGet();
}

main().catch(console.error);
