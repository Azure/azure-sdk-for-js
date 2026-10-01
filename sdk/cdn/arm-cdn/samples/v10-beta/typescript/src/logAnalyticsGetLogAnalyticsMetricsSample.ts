// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get log report for AFD profile
 *
 * @summary get log report for AFD profile
 * x-ms-original-file: 2025-12-01/LogAnalytics_GetLogAnalyticsMetrics.json
 */
async function logAnalyticsGetLogAnalyticsMetrics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getLogAnalyticsMetrics(
    "RG",
    "profile1",
    ["clientRequestCount"],
    new Date("2020-11-04T04:30:00.000Z"),
    new Date("2020-11-04T05:00:00.000Z"),
    "PT5M",
    ["customdomain1.azurecdn.net", "customdomain2.azurecdn.net"],
    ["https"],
    { groupBy: ["protocol"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await logAnalyticsGetLogAnalyticsMetrics();
}

main().catch(console.error);
