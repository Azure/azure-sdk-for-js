// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the metric namespaces for the resource.
 *
 * @summary lists the metric namespaces for the resource.
 * x-ms-original-file: 2024-02-01/GetMetricNamespaces.json
 */
async function getMetricNamespacesWithoutFilter() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const resArray = new Array();
  for await (const item of client.metricNamespaces.list(
    "subscriptions/182c901a-129a-4f5d-86e4-cc6b294590a2/resourceGroups/hyr-log/providers/microsoft.insights/components/f1-bill",
    { startTime: "2020-08-31T15:53:00Z" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getMetricNamespacesWithoutFilter();
}

main().catch(console.error);
