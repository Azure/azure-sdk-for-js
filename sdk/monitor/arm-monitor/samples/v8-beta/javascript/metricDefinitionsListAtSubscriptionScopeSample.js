// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the metric definitions for the subscription.
 *
 * @summary lists the metric definitions for the subscription.
 * x-ms-original-file: 2024-02-01/GetMultiResourceMetricDefinitions.json
 */
async function getSubscriptionLevelMetricDefinitionsWithoutFilter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "92d2a2d8-b514-432d-8cc9-a5f9272630d5";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricDefinitions.listAtSubscriptionScope("westus2", {
    metricnamespace: "microsoft.compute/virtualmachines",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSubscriptionLevelMetricDefinitionsWithoutFilter();
}

main().catch(console.error);
