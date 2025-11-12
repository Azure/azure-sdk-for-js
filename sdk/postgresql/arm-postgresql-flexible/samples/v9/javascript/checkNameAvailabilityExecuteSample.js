// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check the availability of name for resource
 *
 * @summary Check the availability of name for resource
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/CheckNameAvailability.json
 */

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function nameAvailability() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const nameAvailabilityRequest = {
    name: "name1",
    type: "Microsoft.DBforPostgreSQL/flexibleServers",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.checkNameAvailability.execute(nameAvailabilityRequest);
  console.log(result);
}

async function main() {
  await nameAvailability();
}

main().catch(console.error);
