// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Task Queue
 *
 * @summary create or update a Task Queue
 * x-ms-original-file: 2026-07-01-preview/TaskQueues_CreateOrUpdate.json
 */
async function taskQueuesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.taskQueues.createOrUpdate(
    "rgopenapi",
    "testscheduler",
    "testtaskhub",
    "QueueA",
    { properties: { throughput: { actionsPerSecond: 40 } } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Task Queue
 *
 * @summary create or update a Task Queue
 * x-ms-original-file: 2026-07-01-preview/TaskQueues_CreateOrUpdate_MinimumSet.json
 */
async function taskQueuesCreateOrUpdateMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.taskQueues.createOrUpdate(
    "rgopenapi",
    "testscheduler",
    "testtaskhub",
    "QueueA",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await taskQueuesCreateOrUpdate();
  await taskQueuesCreateOrUpdateMinimumSet();
}

main().catch(console.error);
