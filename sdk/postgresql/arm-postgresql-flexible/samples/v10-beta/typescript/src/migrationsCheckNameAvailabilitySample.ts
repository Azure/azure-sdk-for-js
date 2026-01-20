// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if a proposed migration name is valid and available.
 *
 * @summary checks if a proposed migration name is valid and available.
 * x-ms-original-file: 2026-01-01-preview/MigrationsCheckNameAvailability.json
 */
async function checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.checkNameAvailability(
    "exampleresourcegroup",
    "exampleserver",
    { name: "examplemigration", type: "Microsoft.DBforPostgreSQL/flexibleServers/migrations" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkTheValidityAndAvailabilityOfTheGivenNameToAssignItToANewMigration();
}

main().catch(console.error);
