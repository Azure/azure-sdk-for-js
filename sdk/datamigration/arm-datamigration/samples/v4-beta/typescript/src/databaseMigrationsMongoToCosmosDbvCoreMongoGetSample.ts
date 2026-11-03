// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Database Migration resource.
 *
 * @summary get Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoGetDatabaseMigration1.json
 */
async function getMongoToCosmosDbMongoVCoreDatabaseMigrationWithoutTheExpandParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsMongoToCosmosDbvCoreMongo.get(
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
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoGetDatabaseMigrationExpanded1.json
 */
async function getMongoToCosmosDbMongoVCoreDatabaseMigrationWithTheExpandParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsMongoToCosmosDbvCoreMongo.get(
    "testrg",
    "targetCosmosDbClusterName",
    "migrationRequest",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getMongoToCosmosDbMongoVCoreDatabaseMigrationWithoutTheExpandParameter();
  await getMongoToCosmosDbMongoVCoreDatabaseMigrationWithTheExpandParameter();
}

main().catch(console.error);
