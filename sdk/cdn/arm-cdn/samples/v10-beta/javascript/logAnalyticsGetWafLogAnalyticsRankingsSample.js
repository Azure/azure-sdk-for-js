// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get WAF log analytics charts for AFD profile
 *
 * @summary get WAF log analytics charts for AFD profile
 * x-ms-original-file: 2025-12-01/LogAnalytics_GetWafLogAnalyticsRankings.json
 */
async function logAnalyticsGetWafLogAnalyticsRankings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getWafLogAnalyticsRankings(
    "RG",
    "profile1",
    ["clientRequestCount"],
    new Date("2020-11-04T06:49:27.554Z"),
    new Date("2020-11-04T09:49:27.554Z"),
    5,
    ["ruleId"],
  );
  console.log(result);
}

async function main() {
  await logAnalyticsGetWafLogAnalyticsRankings();
}

main().catch(console.error);
