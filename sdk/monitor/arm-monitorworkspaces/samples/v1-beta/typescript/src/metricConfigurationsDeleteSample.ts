// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a metric configuration.
 *
 * @summary deletes a metric configuration.
 * x-ms-original-file: 2026-09-03-preview/MetricConfigurations_Delete_MaximumSet_Gen.json
 */
async function metricConfigurationsDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.metricConfigurations.delete(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    "default",
    "customdefault",
    "aggregatedRequestCount",
  );
}

async function main(): Promise<void> {
  await metricConfigurationsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
