// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DatabaseMigrationCosmosDbMongo,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or Update Database Migration resource.
 *
 * @summary Create or Update Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CosmosDbMongoCreateOrUpdateDatabaseMigrationMAX.json
 */
async function createMongoToCosmosDbMongoVCoreDatabaseMigrationResourceWithMaximumParameters(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const targetResourceName = "targetCosmosDbClusterName";
  const migrationName = "migrationRequest";
  const parameters: DatabaseMigrationCosmosDbMongo = {
    collectionList: [
      {
        sourceCollection: "sourceCol1",
        sourceDatabase: "sourceDb1",
        targetCollection: "targetCol1",
        targetDatabase: "targetDb1",
      },
      {
        sourceCollection: "sourceCol2",
        sourceDatabase: "sourceDb2",
        targetCollection: "sourceCol2",
        targetDatabase: "sourceDb2",
      },
    ],
    kind: "MongoToCosmosDbMongo",
    migrationService:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DataMigration/MigrationServices/testMigrationService",
    scope:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DocumentDB/mongoClusters/targetCosmosDbClusterName",
    sourceMongoConnection: {
      host: "abc.mongodb.com",
      password: "placeholder",
      port: 88,
      useSsl: true,
      userName: "abc",
    },
    targetMongoConnection: {
      host: "xyz.mongocluster.cosmos.azure.com",
      password: "placeholder",
      port: 10255,
      useSsl: true,
      userName: "def",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result =
    await client.databaseMigrationsMongoToCosmosDbvCoreMongo.beginCreateAndWait(
      resourceGroupName,
      targetResourceName,
      migrationName,
      parameters,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or Update Database Migration resource.
 *
 * @summary Create or Update Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/CosmosDbMongoCreateOrUpdateDatabaseMigrationMIN.json
 */
async function createMongoToCosmosDbMongoVCoreDatabaseMigrationResourceWithMinimumParameters(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const targetResourceName = "targetCosmosDbClusterName";
  const migrationName = "migrationRequest";
  const parameters: DatabaseMigrationCosmosDbMongo = {
    collectionList: [
      {
        sourceCollection: "sourceCol1",
        sourceDatabase: "sourceDb1",
        targetCollection: "targetCol1",
        targetDatabase: "targetDb1",
      },
      { sourceCollection: "sourceCol2", sourceDatabase: "sourceDb2" },
    ],
    kind: "MongoToCosmosDbMongo",
    migrationService:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DataMigration/MigrationServices/testMigrationService",
    scope:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DocumentDB/mongoClusters/targetCosmosDbClusterName",
    sourceMongoConnection: {
      host: "abc.mongodb.com",
      password: "placeholder",
      port: 88,
      useSsl: true,
      userName: "abc",
    },
    targetMongoConnection: { connectionString: "placeholder" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result =
    await client.databaseMigrationsMongoToCosmosDbvCoreMongo.beginCreateAndWait(
      resourceGroupName,
      targetResourceName,
      migrationName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createMongoToCosmosDbMongoVCoreDatabaseMigrationResourceWithMaximumParameters();
  await createMongoToCosmosDbMongoVCoreDatabaseMigrationResourceWithMinimumParameters();
}

main().catch(console.error);
