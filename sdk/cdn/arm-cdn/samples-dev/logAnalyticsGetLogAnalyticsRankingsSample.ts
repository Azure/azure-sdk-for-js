// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get log analytics ranking report for AFD profile
 *
 * @summary Get log analytics ranking report for AFD profile
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/LogAnalytics_GetLogAnalyticsRankings.json
 */
async function logAnalyticsGetLogAnalyticsRankings(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const rankings = ["url"];
  const metrics = ["clientRequestCount"];
  const maxRanking = 5;
  const dateTimeBegin = new Date("2020-11-04T06:49:27.554Z");
  const dateTimeEnd = new Date("2020-11-04T09:49:27.554Z");
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getLogAnalyticsRankings(
    resourceGroupName,
    profileName,
    rankings,
    metrics,
    maxRanking,
    dateTimeBegin,
    dateTimeEnd,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await logAnalyticsGetLogAnalyticsRankings();
}

main().catch(console.error);
