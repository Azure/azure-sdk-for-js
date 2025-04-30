// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Scheduler
 *
 * @summary update a Scheduler
 * x-ms-original-file: 2025-04-01-preview/Schedulers_Update.json
 */
async function schedulersUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.schedulers.update("rgopenapi", "testscheduler", {
    tags: { hello: "world" },
    properties: {
      ipAllowlist: ["10.0.0.0/8"],
      sku: { name: "Dedicated", capacity: 3 },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await schedulersUpdate();
}

main().catch(console.error);
