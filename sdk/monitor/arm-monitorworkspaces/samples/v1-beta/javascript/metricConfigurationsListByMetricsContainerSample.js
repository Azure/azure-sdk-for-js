// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists metrics across all namespaces in a metrics container. Resource
 * properties may be omitted in collection responses.
 *
 * @summary lists metrics across all namespaces in a metrics container. Resource
 * properties may be omitted in collection responses.
 * x-ms-original-file: 2026-09-03-preview/MetricConfigurations_ListByMetricsContainer_EmptyList_Gen.json
 */
async function metricConfigurationsListByMetricsContainerEmptyList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricConfigurations.listByMetricsContainer(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    "default",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists metrics across all namespaces in a metrics container. Resource
 * properties may be omitted in collection responses.
 *
 * @summary lists metrics across all namespaces in a metrics container. Resource
 * properties may be omitted in collection responses.
 * x-ms-original-file: 2026-09-03-preview/MetricConfigurations_ListByMetricsContainer_MaximumSet_Gen.json
 */
async function metricConfigurationsListByMetricsContainerMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricConfigurations.listByMetricsContainer(
    "rgazuremonitorworkspace",
    "myAzureMonitorWorkspace",
    "default",
    { filter: "Properties.sourceMetricResourceId eq null" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await metricConfigurationsListByMetricsContainerEmptyList();
  await metricConfigurationsListByMetricsContainerMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
