// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get Waf related log analytics report for AFD profile.
 *
 * @summary Get Waf related log analytics report for AFD profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/LogAnalytics_GetWafLogAnalyticsMetrics.json
 */
async function logAnalyticsGetWafLogAnalyticsMetrics(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const metrics = ["clientRequestCount"];
  const dateTimeBegin = new Date("2020-11-04T06:49:27.554Z");
  const dateTimeEnd = new Date("2020-11-04T09:49:27.554Z");
  const granularity = "PT5M";
  const actions = ["block", "log"];
  const options: LogAnalyticsGetWafLogAnalyticsMetricsOptionalParams = {
    actions,
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getWafLogAnalyticsMetrics(
    resourceGroupName,
    profileName,
    metrics,
    dateTimeBegin,
    dateTimeEnd,
    granularity,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await logAnalyticsGetWafLogAnalyticsMetrics();
}

main().catch(console.error);
