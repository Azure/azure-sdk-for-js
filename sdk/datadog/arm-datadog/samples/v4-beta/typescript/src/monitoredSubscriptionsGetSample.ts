// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the subscriptions currently being monitored by the Datadog monitor resource.
 *
 * @summary list the subscriptions currently being monitored by the Datadog monitor resource.
 * x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Get.json
 */
async function monitorsGetMonitoredSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.get("myResourceGroup", "myMonitor", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetMonitoredSubscriptions();
}

main().catch(console.error);
