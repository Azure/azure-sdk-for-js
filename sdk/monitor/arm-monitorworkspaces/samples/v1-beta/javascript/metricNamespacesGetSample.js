// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a metric namespace.
 *
 * @summary gets a metric namespace.
 * x-ms-original-file: 2026-09-03-preview/MetricNamespaces_Get_MaximumSet_Gen.json
 */
async function metricNamespacesGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metricNamespaces.get(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    "default",
    "customdefault",
  );
  console.log(result);
}

async function main() {
  await metricNamespacesGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
