// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a MonitorResource
 *
 * @summary get a MonitorResource
 * x-ms-original-file: 2024-04-24/Monitors_Get_MaximumSet_Gen.json
 */
async function monitorsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.get("myResourceGroup", "myMonitor");
  console.log(result);
}

/**
 * This sample demonstrates how to get a MonitorResource
 *
 * @summary get a MonitorResource
 * x-ms-original-file: 2024-04-24/Monitors_Get_MinimumSet_Gen.json
 */
async function monitorsGetMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.get("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetMaximumSetGen();
  await monitorsGetMinimumSetGen();
}

main().catch(console.error);
