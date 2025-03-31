// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DurableTaskClient } = require("@azure/arm-durabletask");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Scheduler
 *
 * @summary update a Scheduler
 * x-ms-original-file: 2024-10-01-preview/Schedulers_Update.json
 */
async function schedulersUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.schedulers.update("rgopenapi", "testscheduler", {
    tags: { key8653: "lr" },
    properties: {
      ipAllowlist: ["10.0.0.0/8"],
      sku: { name: "Dedicated", capacity: 10 },
    },
  });
  console.log(result);
}

async function main() {
  await schedulersUpdate();
}

main().catch(console.error);
