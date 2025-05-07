// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Task Hub
 *
 * @summary get a Task Hub
 * x-ms-original-file: 2025-04-01-preview/TaskHubs_Get.json
 */
async function taskHubsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.taskHubs.get("rgopenapi", "testscheduler", "testtaskhub");
  console.log(result);
}

async function main() {
  await taskHubsGet();
}

main().catch(console.error);
