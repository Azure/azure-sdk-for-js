// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Task Hub
 *
 * @summary delete a Task Hub
 * x-ms-original-file: 2024-10-01-preview/TaskHubs_Delete.json
 */
async function taskHubsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  await client.taskHubs.delete("rgopenapi", "testscheduler", "testtuskhub");
}

async function main() {
  await taskHubsDelete();
}

main().catch(console.error);
