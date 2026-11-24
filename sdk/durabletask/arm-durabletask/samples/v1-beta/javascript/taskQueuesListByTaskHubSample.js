// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Task Queues by Task Hub
 *
 * @summary list Task Queues by Task Hub
 * x-ms-original-file: 2026-07-01-preview/TaskQueues_ListByTaskHub.json
 */
async function taskQueuesListByTaskHub() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.taskQueues.listByTaskHub(
    "rgopenapi",
    "testscheduler",
    "testtaskhub",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await taskQueuesListByTaskHub();
}

main().catch(console.error);
