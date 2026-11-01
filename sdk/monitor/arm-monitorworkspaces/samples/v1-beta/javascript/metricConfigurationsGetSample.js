// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a metric configuration.
 *
 * @summary gets a metric configuration.
 * x-ms-original-file: 2026-09-03-preview/MetricConfigurations_Get_MaximumSet_Gen.json
 */
async function metricConfigurationsGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricConfigurations.get(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    "default",
    "customdefault",
    "aggregatedRequestCount",
  );
  console.log(result);
}

async function main() {
  await metricConfigurationsGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
