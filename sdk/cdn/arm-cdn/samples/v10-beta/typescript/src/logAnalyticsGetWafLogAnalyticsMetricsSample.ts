// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Waf related log analytics report for AFD profile.
 *
 * @summary get Waf related log analytics report for AFD profile.
 * x-ms-original-file: 2025-12-01/LogAnalytics_GetWafLogAnalyticsMetrics.json
 */
async function logAnalyticsGetWafLogAnalyticsMetrics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getWafLogAnalyticsMetrics(
    "RG",
    "profile1",
    ["clientRequestCount"],
    new Date("2020-11-04T06:49:27.554Z"),
    new Date("2020-11-04T09:49:27.554Z"),
    "PT5M",
    { actions: ["block", "log"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await logAnalyticsGetWafLogAnalyticsMetrics();
}

main().catch(console.error);
