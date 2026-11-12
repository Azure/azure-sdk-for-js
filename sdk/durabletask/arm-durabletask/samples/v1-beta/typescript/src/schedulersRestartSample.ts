// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restart a Scheduler
 *
 * @summary restart a Scheduler
 * x-ms-original-file: 2026-07-01-preview/Schedulers_Restart.json
 */
async function schedulersRestart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  await client.schedulers.restart("rgopenapi", "testscheduler");
}

async function main(): Promise<void> {
  await schedulersRestart();
}

main().catch(console.error);
