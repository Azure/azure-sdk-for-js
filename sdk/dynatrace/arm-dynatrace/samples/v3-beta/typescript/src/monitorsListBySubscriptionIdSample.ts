// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all MonitorResource by subscriptionId
 *
 * @summary list all MonitorResource by subscriptionId
 * x-ms-original-file: 2024-04-24/Monitors_ListBySubscriptionId_MaximumSet_Gen.json
 */
async function monitorsListBySubscriptionIdMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listBySubscriptionId()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all MonitorResource by subscriptionId
 *
 * @summary list all MonitorResource by subscriptionId
 * x-ms-original-file: 2024-04-24/Monitors_ListBySubscriptionId_MinimumSet_Gen.json
 */
async function monitorsListBySubscriptionIdMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listBySubscriptionId()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListBySubscriptionIdMaximumSetGen();
  await monitorsListBySubscriptionIdMinimumSetGen();
}

main().catch(console.error);
