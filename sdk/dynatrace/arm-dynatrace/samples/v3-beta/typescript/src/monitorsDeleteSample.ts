// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a MonitorResource
 *
 * @summary delete a MonitorResource
 * x-ms-original-file: 2024-04-24/Monitors_Delete_MaximumSet_Gen.json
 */
async function monitorsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor");
}

/**
 * This sample demonstrates how to delete a MonitorResource
 *
 * @summary delete a MonitorResource
 * x-ms-original-file: 2024-04-24/Monitors_Delete_MinimumSet_Gen.json
 */
async function monitorsDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor");
}

async function main(): Promise<void> {
  await monitorsDeleteMaximumSetGen();
  await monitorsDeleteMinimumSetGen();
}

main().catch(console.error);
