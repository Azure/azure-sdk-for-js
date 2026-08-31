// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Database Migration resources for the scope.
 *
 * @summary get Database Migration resources for the scope.
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoListByScopeDatabaseMigration.json
 */
async function getMongoToCosmosDbMongoRUDatabaseMigrationWithTheExpandParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseMigrationsMongoToCosmosDbRUMongo.listForScope(
    "testrg",
    "targetCosmosDbClusterName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get Database Migration resources for the scope.
 *
 * @summary get Database Migration resources for the scope.
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoListByScopeDatabaseMigration1.json
 */
async function getMongoToCosmosDbMongoRUDatabaseMigrationWithoutTheExpandParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseMigrationsMongoToCosmosDbRUMongo.listForScope(
    "testrg",
    "targetCosmosDbClusterName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getMongoToCosmosDbMongoRUDatabaseMigrationWithTheExpandParameter();
  await getMongoToCosmosDbMongoRUDatabaseMigrationWithoutTheExpandParameter();
}

main().catch(console.error);
