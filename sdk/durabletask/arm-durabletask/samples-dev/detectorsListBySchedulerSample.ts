// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the diagnostic detectors belonging to a scheduler.
 *
 * @summary lists the diagnostic detectors belonging to a scheduler.
 * x-ms-original-file: 2026-07-01-preview/Detectors_ListByScheduler.json
 */
async function detectorsListByScheduler(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.detectors.listByScheduler("rgopenapi", "testscheduler")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await detectorsListByScheduler();
}

main().catch(console.error);
