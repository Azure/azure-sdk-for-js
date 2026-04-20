// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an alert rule definition.
 *
 * @summary delete an alert rule definition.
 * x-ms-original-file: 2024-03-01-preview/deleteMetricAlert.json
 */
async function deleteAnAlertRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14ddf0c5-77c5-4b53-84f6-e1fa43ad68f7";
  const client = new MonitorClient(credential, subscriptionId);
  await client.metricAlerts.delete("gigtest", "chiricutin");
}

async function main(): Promise<void> {
  await deleteAnAlertRule();
}

main().catch(console.error);
