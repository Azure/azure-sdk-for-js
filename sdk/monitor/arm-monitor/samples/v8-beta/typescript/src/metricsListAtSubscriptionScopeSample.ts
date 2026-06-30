// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to **Lists the metric data for a subscription**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 *
 * @summary **Lists the metric data for a subscription**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 * x-ms-original-file: 2024-02-01/GetMultiResourceMetric.json
 */
async function getSubscriptionLevelMetricData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "92d2a2d8-b514-432d-8cc9-a5f9272630d5";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metrics.listAtSubscriptionScope("westus2", {
    timespan: "2021-06-08T19:00:00Z/2021-06-12T01:00:00Z",
    interval: "PT6H",
    metricnames: "Data Disk Max Burst IOPS",
    aggregation: "count",
    top: 10,
    orderby: "count desc",
    filter: "LUN eq '0' and Microsoft.ResourceId eq '*'",
    metricnamespace: "microsoft.compute/virtualmachines",
    autoAdjustTimegrain: true,
    validateDimensions: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to **Lists the metric data for a subscription**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 *
 * @summary **Lists the metric data for a subscription**. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 * x-ms-original-file: 2024-02-01/GetMultiResourceMetricMetadata.json
 */
async function getSubscriptionLevelMetricMetadata(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "92d2a2d8-b514-432d-8cc9-a5f9272630d5";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metrics.listAtSubscriptionScope("westus2", {
    timespan: "2021-06-10T02:23:16.129Z/2021-06-12T02:23:16.129Z",
    metricnames: "Data Disk Max Burst IOPS",
    filter: "LUN eq '0'",
    metricnamespace: "microsoft.compute/virtualmachines",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getSubscriptionLevelMetricData();
  await getSubscriptionLevelMetricMetadata();
}

main().catch(console.error);
