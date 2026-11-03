// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the total number of connected resources for the given marketplace subscription Id
 *
 * @summary get the total number of connected resources for the given marketplace subscription Id
 * x-ms-original-file: 2024-04-24/Monitors_GetAllConnectedResourcesCount_MaximumSet_Gen.json
 */
async function monitorsGetAllConnectedResourcesCountMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.getAllConnectedResourcesCount({
    marketplaceSubscriptionId: "00000000-0000-0000-0000-000005430000",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get the total number of connected resources for the given marketplace subscription Id
 *
 * @summary get the total number of connected resources for the given marketplace subscription Id
 * x-ms-original-file: 2024-04-24/Monitors_GetAllConnectedResourcesCount_MinimumSet_Gen.json
 */
async function monitorsGetAllConnectedResourcesCountMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.getAllConnectedResourcesCount({
    marketplaceSubscriptionId: "00000000-0000-0000-0000-000005430000",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetAllConnectedResourcesCountMaximumSetGen();
  await monitorsGetAllConnectedResourcesCountMinimumSetGen();
}

main().catch(console.error);
