// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the metric definitions for the subscription.
 *
 * @summary Lists the metric definitions for the subscription.
 * x-ms-original-file: specification/monitor/resource-manager/Microsoft.Insights/stable/2024-02-01/examples/GetMultiResourceMetricDefinitions.json
 */

import type { MetricDefinitionsListAtSubscriptionScopeOptionalParams } from "@azure/arm-monitor";
import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSubscriptionLevelMetricDefinitionsWithoutFilter(): Promise<void> {
  const subscriptionId =
    process.env["MONITOR_SUBSCRIPTION_ID"] || "92d2a2d8-b514-432d-8cc9-a5f9272630d5";
  const region = "westus2";
  const metricnamespace = "microsoft.compute/virtualmachines";
  const options: MetricDefinitionsListAtSubscriptionScopeOptionalParams = {
    metricnamespace,
  };
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.metricDefinitions.listAtSubscriptionScope(region, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getSubscriptionLevelMetricDefinitionsWithoutFilter();
}

main().catch(console.error);
