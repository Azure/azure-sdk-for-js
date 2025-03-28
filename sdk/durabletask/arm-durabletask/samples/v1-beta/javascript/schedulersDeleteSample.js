// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Scheduler
 *
 * @summary delete a Scheduler
 * x-ms-original-file: 2024-10-01-preview/Schedulers_Delete.json
 */
async function schedulersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  await client.schedulers.delete("rgopenapi", "testscheduler");
}

async function main() {
  await schedulersDelete();
}

main().catch(console.error);
