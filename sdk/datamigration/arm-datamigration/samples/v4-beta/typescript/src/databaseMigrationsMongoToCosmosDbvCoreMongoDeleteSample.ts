// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Database Migration resource.
 *
 * @summary delete Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoDeleteDatabaseMigration1.json
 */
async function deleteMongoToCosmosDbMongoVCoreDatabaseMigrationResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  await client.databaseMigrationsMongoToCosmosDbvCoreMongo.delete(
    "testrg",
    "targetCosmosDbClusterName",
    "migrationRequest",
  );
}

async function main(): Promise<void> {
  await deleteMongoToCosmosDbMongoVCoreDatabaseMigrationResource();
}

main().catch(console.error);
