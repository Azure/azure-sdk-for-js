// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the subscriptions that are being monitored by the Dynatrace monitor resource
 *
 * @summary updates the subscriptions that are being monitored by the Dynatrace monitor resource
 * x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Delete.json
 */
async function monitorsDeleteMonitoredSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  await client.monitoredSubscriptions.delete("myResourceGroup", "myMonitor");
}

async function main(): Promise<void> {
  await monitorsDeleteMonitoredSubscriptions();
}

main().catch(console.error);
