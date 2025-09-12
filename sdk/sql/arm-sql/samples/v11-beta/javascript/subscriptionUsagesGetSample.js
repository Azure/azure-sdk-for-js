// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a subscription usage metric.
 *
 * @summary Gets a subscription usage metric.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SubscriptionUsageGet.json
 */
async function getSpecificSubscriptionUsageInTheGivenLocation() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const locationName = "WestUS";
  const usageName = "ServerQuota";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.subscriptionUsages.get(locationName, usageName);
  console.log(result);
}

async function main() {
  await getSpecificSubscriptionUsageInTheGivenLocation();
}

main().catch(console.error);
