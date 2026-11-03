// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a migration.
 *
 * @summary gets information about a migration.
 * x-ms-original-file: 2026-10-01/MigrationsGet.json
 */
async function getInformationAboutAMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a migration.
 *
 * @summary gets information about a migration.
 * x-ms-original-file: 2026-10-01/MigrationsGetMigrationWithSuccessfulValidationAndMigration.json
 */
async function getInformationAboutAMigrationWithSuccessfulValidationAndSuccessfulMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a migration.
 *
 * @summary gets information about a migration.
 * x-ms-original-file: 2026-10-01/MigrationsGetMigrationWithSuccessfulValidationButMigrationFailure.json
 */
async function getInformationAboutAMigrationWithSuccessfulValidationButFailedMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a migration.
 *
 * @summary gets information about a migration.
 * x-ms-original-file: 2026-10-01/MigrationsGetMigrationWithSuccessfulValidationOnly.json
 */
async function getInformationAboutAMigrationWithSuccessfulValidationOnly(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a migration.
 *
 * @summary gets information about a migration.
 * x-ms-original-file: 2026-10-01/MigrationsGetMigrationWithValidationFailures.json
 */
async function getInformationAboutAMigrationWithValidationFailures(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(
    "exampleresourcegroup",
    "exampleserver",
    "examplemigration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAMigration();
  await getInformationAboutAMigrationWithSuccessfulValidationAndSuccessfulMigration();
  await getInformationAboutAMigrationWithSuccessfulValidationButFailedMigration();
  await getInformationAboutAMigrationWithSuccessfulValidationOnly();
  await getInformationAboutAMigrationWithValidationFailures();
}

main().catch(console.error);
