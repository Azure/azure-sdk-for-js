// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get capabilities at specified location in a given subscription.
 *
 * @summary Get capabilities at specified location in a given subscription.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/CapabilitiesByLocation.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function capabilitiesList() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locationBasedCapabilities.listExecute(locationName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await capabilitiesList();
}

main().catch(console.error);
