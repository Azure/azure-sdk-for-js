// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the capabilities available in a given location for a specific subscription.
 *
 * @summary Lists the capabilities available in a given location for a specific subscription.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/CapabilitiesByLocationList.json
 */
async function listTheCapabilitiesAvailableInAGivenLocationForASpecificSubscription() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capabilitiesByLocation.list(locationName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listTheCapabilitiesAvailableInAGivenLocationForASpecificSubscription();
}

main().catch(console.error);
