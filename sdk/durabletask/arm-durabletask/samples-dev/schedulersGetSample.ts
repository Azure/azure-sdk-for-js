// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Scheduler
 *
 * @summary get a Scheduler
 * x-ms-original-file: 2025-04-01-preview/Schedulers_Get.json
 */
async function schedulersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.schedulers.get("rgopenapi", "testscheduler");
  console.log(result);
}

async function main(): Promise<void> {
  await schedulersGet();
}

main().catch(console.error);
