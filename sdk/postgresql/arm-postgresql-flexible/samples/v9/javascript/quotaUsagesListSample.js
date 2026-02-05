// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get quota usages at specified location in a given subscription.
 *
 * @summary Get quota usages at specified location in a given subscription.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/QuotaUsagesForFlexibleServers.json
 */
async function listOfQuotaUsagesForServers() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const locationName = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.quotaUsages.list(locationName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listOfQuotaUsagesForServers();
}

main().catch(console.error);
