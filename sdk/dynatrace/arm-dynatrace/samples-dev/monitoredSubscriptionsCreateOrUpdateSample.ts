// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add the subscriptions that should be monitored by the Dynatrace monitor resource.
 *
 * @summary add the subscriptions that should be monitored by the Dynatrace monitor resource.
 * x-ms-original-file: 2024-04-24/MonitoredSubscriptions_CreateOrUpdate.json
 */
async function monitorsAddMonitoredSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.createOrUpdate("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsAddMonitoredSubscriptions();
}

main().catch(console.error);
