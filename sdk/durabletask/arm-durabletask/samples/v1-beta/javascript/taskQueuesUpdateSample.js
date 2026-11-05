// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Task Queue
 *
 * @summary update a Task Queue
 * x-ms-original-file: 2026-07-01-preview/TaskQueues_Update.json
 */
async function taskQueuesUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.taskQueues.update(
    "rgopenapi",
    "testscheduler",
    "testtaskhub",
    "QueueA",
    { properties: { throughput: { actionsPerSecond: 80 } } },
  );
  console.log(result);
}

async function main() {
  await taskQueuesUpdate();
}

main().catch(console.error);
