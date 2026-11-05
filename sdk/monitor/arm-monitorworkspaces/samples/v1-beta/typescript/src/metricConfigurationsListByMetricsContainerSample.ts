// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists metrics across all namespaces in a metrics container. Resource
 * properties may be omitted in collection responses.
 *
 * @summary lists metrics across all namespaces in a metrics container. Resource
 * properties may be omitted in collection responses.
 * x-ms-original-file: 2026-09-03-preview/MetricConfigurations_ListByMetricsContainer_EmptyList_Gen.json
 */
async function metricConfigurationsListByMetricsContainerEmptyList(): Promise<void> {
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
async function metricConfigurationsListByMetricsContainerMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
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

async function main(): Promise<void> {
  await metricConfigurationsListByMetricsContainerEmptyList();
  await metricConfigurationsListByMetricsContainerMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
