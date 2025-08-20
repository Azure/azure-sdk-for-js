// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete Database Migration resource.
 *
 * @summary Delete Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2025-03-15-preview/examples/CosmosDbMongoDeleteDatabaseMigration.json
 */

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteMongoToCosmosDbMongoRuDatabaseMigrationResource(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const targetResourceName = "targetCosmosDbClusterName";
  const migrationName = "migrationRequest";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result =
    await client.databaseMigrationsMongoToCosmosDbRUMongo.beginDeleteAndWait(
      resourceGroupName,
      targetResourceName,
      migrationName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteMongoToCosmosDbMongoRuDatabaseMigrationResource();
}

main().catch(console.error);
