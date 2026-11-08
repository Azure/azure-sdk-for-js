// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Task Queue
 *
 * @summary delete a Task Queue
 * x-ms-original-file: 2026-07-01-preview/TaskQueues_Delete.json
 */
async function taskQueuesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  await client.taskQueues.delete("rgopenapi", "testscheduler", "testtaskhub", "QueueA");
}

async function main() {
  await taskQueuesDelete();
}

main().catch(console.error);
