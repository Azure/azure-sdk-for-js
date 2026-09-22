// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get log analytics ranking report for AFD profile
 *
 * @summary get log analytics ranking report for AFD profile
 * x-ms-original-file: 2025-12-01/LogAnalytics_GetLogAnalyticsRankings.json
 */
async function logAnalyticsGetLogAnalyticsRankings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getLogAnalyticsRankings(
    "RG",
    "profile1",
    ["url"],
    ["clientRequestCount"],
    5,
    new Date("2020-11-04T06:49:27.554Z"),
    new Date("2020-11-04T09:49:27.554Z"),
  );
  console.log(result);
}

async function main() {
  await logAnalyticsGetLogAnalyticsRankings();
}

main().catch(console.error);
