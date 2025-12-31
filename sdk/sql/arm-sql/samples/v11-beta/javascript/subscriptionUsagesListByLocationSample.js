// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all subscription usage metrics in a given location.
 *
 * @summary Gets all subscription usage metrics in a given location.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/SubscriptionUsageListByLocation.json
 */
async function listSubscriptionUsagesInTheGivenLocation() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const locationName = "WestUS";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.subscriptionUsages.listByLocation(locationName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listSubscriptionUsagesInTheGivenLocation();
}

main().catch(console.error);
