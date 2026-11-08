// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Task Queue
 *
 * @summary get a Task Queue
 * x-ms-original-file: 2026-07-01-preview/TaskQueues_Get.json
 */
async function taskQueuesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.taskQueues.get("rgopenapi", "testscheduler", "testtaskhub", "QueueA");
  console.log(result);
}

async function main(): Promise<void> {
  await taskQueuesGet();
}

main().catch(console.error);
