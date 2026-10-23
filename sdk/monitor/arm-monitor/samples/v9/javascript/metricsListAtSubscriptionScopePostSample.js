// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to **Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 *
 * @summary **Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 * x-ms-original-file: 2024-02-01/PostMultiResourceMetric.json
 */
async function postRequestForSubscriptionLevelMetricData() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "92d2a2d8-b514-432d-8cc9-a5f9272630d5";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metrics.listAtSubscriptionScopePost("westus2", {
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
 * This sample demonstrates how to **Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 *
 * @summary **Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 * x-ms-original-file: 2024-02-01/PostMultiResourceMetricBody.json
 */
async function postRequestForSubscriptionLevelMetricDataUsingBodyParams() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "92d2a2d8-b514-432d-8cc9-a5f9272630d5";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metrics.listAtSubscriptionScopePost("westus2", {
    body: {
      aggregation: "count",
      autoAdjustTimegrain: true,
      filter: "LUN eq '0' and Microsoft.ResourceId eq '*'",
      interval: "PT6H",
      metricNames: "Data Disk Max Burst IOPS",
      metricNamespace: "microsoft.compute/virtualmachines",
      orderBy: "count desc",
      rollUpBy: "LUN",
      timespan: "2021-06-08T19:00:00Z/2021-06-12T01:00:00Z",
      top: 10,
      validateDimensions: false,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to **Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 *
 * @summary **Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).
 * x-ms-original-file: 2024-02-01/PostMultiResourceMetricMetadata.json
 */
async function postRequestForSubscriptionLevelMetricMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "92d2a2d8-b514-432d-8cc9-a5f9272630d5";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.metrics.listAtSubscriptionScopePost("westus2", {
    timespan: "2021-06-10T02:23:16.129Z/2021-06-12T02:23:16.129Z",
    metricnames: "Data Disk Max Burst IOPS",
    filter: "LUN eq '0'",
    metricnamespace: "microsoft.compute/virtualmachines",
  });
  console.log(result);
}

async function main() {
  await postRequestForSubscriptionLevelMetricData();
  await postRequestForSubscriptionLevelMetricDataUsingBodyParams();
  await postRequestForSubscriptionLevelMetricMetadata();
}

main().catch(console.error);
