// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a metric configuration.
 *
 * @summary deletes a metric configuration.
 * x-ms-original-file: 2026-09-03-preview/MetricConfigurations_Delete_MaximumSet_Gen.json
 */
async function metricConfigurationsDeleteMaximumSetGeneratedByMaximumSetRule() {
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

async function main() {
  await metricConfigurationsDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
