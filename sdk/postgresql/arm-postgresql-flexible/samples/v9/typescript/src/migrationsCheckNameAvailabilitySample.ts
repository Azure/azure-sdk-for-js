// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  MigrationNameAvailability} from "@azure/arm-postgresql-flexible";
import {
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Checks if a proposed migration name is valid and available.
 *
 * @summary Checks if a proposed migration name is valid and available.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsCheckNameAvailability.json
 */
async function checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewMigration(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const parameters: MigrationNameAvailability = {
    name: "examplemigration",
    type: "Microsoft.DBforPostgreSQL/flexibleServers/migrations",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(
    credential,
    subscriptionId,
  );
  const result = await client.migrations.checkNameAvailability(
    resourceGroupName,
    serverName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewMigration();
}

main().catch(console.error);
