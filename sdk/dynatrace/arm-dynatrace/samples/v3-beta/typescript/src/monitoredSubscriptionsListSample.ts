// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the subscriptions currently being monitored by the Dynatrace monitor resource.
 *
 * @summary list the subscriptions currently being monitored by the Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/MonitoredSubscriptions_List.json
 */
async function monitorsGetMonitoredSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitoredSubscriptions.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsGetMonitoredSubscriptions();
}

main().catch(console.error);
