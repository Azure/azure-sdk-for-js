// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Task Hub
 *
 * @summary get a Task Hub
 * x-ms-original-file: 2024-10-01-preview/TaskHubs_Get.json
 */
async function taskHubsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.taskHubs.get("rgopenapi", "testscheduler", "testtuskhub");
  console.log(result);
}

async function main(): Promise<void> {
  await taskHubsGet();
}

main().catch(console.error);
