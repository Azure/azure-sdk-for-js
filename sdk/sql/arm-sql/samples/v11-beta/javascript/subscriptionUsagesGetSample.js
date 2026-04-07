// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a subscription usage metric.
 *
 * @summary gets a subscription usage metric.
 * x-ms-original-file: 2025-02-01-preview/SubscriptionUsageGet.json
 */
async function getSpecificSubscriptionUsageInTheGivenLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.subscriptionUsages.get("WestUS", "ServerQuota");
  console.log(result);
}

async function main() {
  await getSpecificSubscriptionUsageInTheGivenLocation();
}

main().catch(console.error);
