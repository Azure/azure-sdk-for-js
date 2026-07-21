// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a MonitoredSubscriptionProperties
 *
 * @summary delete a MonitoredSubscriptionProperties
 * x-ms-original-file: 2025-05-01-preview/MonitoredSubscriptions_Delete.json
 */
async function monitorsDeleteMonitoredSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  await client.monitoredSubscriptions.delete("myResourceGroup", "myMonitor", "default");
}

async function main(): Promise<void> {
  await monitorsDeleteMonitoredSubscriptions();
}

main().catch(console.error);
