// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all endpoints and custom domains available for AFD log report
 *
 * @summary get all endpoints and custom domains available for AFD log report
 * x-ms-original-file: 2025-12-01/LogAnalytics_GetLogAnalyticsResources.json
 */
async function logAnalyticsGetLogAnalyticsResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.logAnalytics.getLogAnalyticsResources("RG", "profile1");
  console.log(result);
}

async function main() {
  await logAnalyticsGetLogAnalyticsResources();
}

main().catch(console.error);
