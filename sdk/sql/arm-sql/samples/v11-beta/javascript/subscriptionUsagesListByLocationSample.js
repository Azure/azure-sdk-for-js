// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all subscription usage metrics in a given location.
 *
 * @summary gets all subscription usage metrics in a given location.
 * x-ms-original-file: 2025-02-01-preview/SubscriptionUsageListByLocation.json
 */
async function listSubscriptionUsagesInTheGivenLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.subscriptionUsages.listByLocation("WestUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSubscriptionUsagesInTheGivenLocation();
}

main().catch(console.error);
