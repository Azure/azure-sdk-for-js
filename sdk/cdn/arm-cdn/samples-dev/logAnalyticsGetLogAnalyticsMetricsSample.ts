// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get log report for AFD profile
 *
 * @summary Get log report for AFD profile
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/LogAnalytics_GetLogAnalyticsMetrics.json
 */

import type { LogAnalyticsGetLogAnalyticsMetricsOptionalParams } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function logAnalyticsGetLogAnalyticsMetrics(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const metrics = ["clientRequestCount"];
  const dateTimeBegin = new Date("2020-11-04T04:30:00.000Z");
  const dateTimeEnd = new Date("2020-11-04T05:00:00.000Z");
  const granularity = "PT5M";
  const groupBy = ["protocol"];
  const customDomains = ["customdomain1.azurecdn.net", "customdomain2.azurecdn.net"];
  const protocols = ["https"];
  const options: LogAnalyticsGetLogAnalyticsMetricsOptionalParams = { groupBy };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getLogAnalyticsMetrics(
    resourceGroupName,
    profileName,
    metrics,
    dateTimeBegin,
    dateTimeEnd,
    granularity,
    customDomains,
    protocols,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await logAnalyticsGetLogAnalyticsMetrics();
}

main().catch(console.error);
