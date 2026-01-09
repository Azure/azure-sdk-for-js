// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Checks if a proposed migration name is valid and available.
 *
 * @summary Checks if a proposed migration name is valid and available.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCheckNameAvailability.json
 */
async function checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewMigration() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters = {
    name: "examplemigration",
    type: "Microsoft.DBforPostgreSQL/flexibleServers/migrations",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.checkNameAvailability(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewMigration();
}

main().catch(console.error);
