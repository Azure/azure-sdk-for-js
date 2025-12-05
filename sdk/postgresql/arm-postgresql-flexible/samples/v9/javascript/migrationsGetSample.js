// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets information about a migration.
 *
 * @summary Gets information about a migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsGetMigrationWithSuccessfulValidationAndMigration.json
 */
async function getInformationAboutAMigrationWithSuccessfulValidationAndSuccessfulMigration() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(resourceGroupName, serverName, migrationName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about a migration.
 *
 * @summary Gets information about a migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsGetMigrationWithSuccessfulValidationButMigrationFailure.json
 */
async function getInformationAboutAMigrationWithSuccessfulValidationButFailedMigration() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(resourceGroupName, serverName, migrationName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about a migration.
 *
 * @summary Gets information about a migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsGetMigrationWithSuccessfulValidationOnly.json
 */
async function getInformationAboutAMigrationWithSuccessfulValidationOnly() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(resourceGroupName, serverName, migrationName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about a migration.
 *
 * @summary Gets information about a migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsGetMigrationWithValidationFailures.json
 */
async function getInformationAboutAMigrationWithValidationFailures() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(resourceGroupName, serverName, migrationName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets information about a migration.
 *
 * @summary Gets information about a migration.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/MigrationsGet.json
 */
async function getInformationAboutAMigration() {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "exampleresourcegroup";
  const serverName = "exampleserver";
  const migrationName = "examplemigration";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.migrations.get(resourceGroupName, serverName, migrationName);
  console.log(result);
}

async function main() {
  await getInformationAboutAMigrationWithSuccessfulValidationAndSuccessfulMigration();
  await getInformationAboutAMigrationWithSuccessfulValidationButFailedMigration();
  await getInformationAboutAMigrationWithSuccessfulValidationOnly();
  await getInformationAboutAMigrationWithValidationFailures();
  await getInformationAboutAMigration();
}

main().catch(console.error);
