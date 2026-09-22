// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Database Migration resource.
 *
 * @summary get Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoGetDatabaseMigration.json
 */
async function getMongoToCosmosDbMongoRUDatabaseMigrationWithoutTheExpandParameter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsMongoToCosmosDbRUMongo.get(
    "testrg",
    "targetCosmosDbClusterName",
    "migrationRequest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get Database Migration resource.
 *
 * @summary get Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoGetDatabaseMigrationExpanded.json
 */
async function getMongoToCosmosDbMongoRUDatabaseMigrationWithTheExpandParameter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsMongoToCosmosDbRUMongo.get(
    "testrg",
    "targetCosmosDbClusterName",
    "migrationRequest",
  );
  console.log(result);
}

async function main() {
  await getMongoToCosmosDbMongoRUDatabaseMigrationWithoutTheExpandParameter();
  await getMongoToCosmosDbMongoRUDatabaseMigrationWithTheExpandParameter();
}

main().catch(console.error);
