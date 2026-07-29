// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all available location names for AFD log analytics report.
 *
 * @summary get all available location names for AFD log analytics report.
 * x-ms-original-file: 2025-12-01/LogAnalytics_GetLogAnalyticsLocations.json
 */
async function logAnalyticsGetLogAnalyticsLocations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getLogAnalyticsLocations("RG", "profile1");
  console.log(result);
}

async function main() {
  await logAnalyticsGetLogAnalyticsLocations();
}

main().catch(console.error);
