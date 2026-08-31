// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update Database Migration resource.
 *
 * @summary create or Update Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoCreateOrUpdateDatabaseMigrationMAX1.json
 */
async function createMongoToCosmosDbMongoVCoreDatabaseMigrationResourceWithMaximumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsMongoToCosmosDbvCoreMongo.create(
    "testrg",
    "targetCosmosDbClusterName",
    "migrationRequest",
    {
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
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update Database Migration resource.
 *
 * @summary create or Update Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/CosmosDbMongoCreateOrUpdateDatabaseMigrationMIN1.json
 */
async function createMongoToCosmosDbMongoVCoreDatabaseMigrationResourceWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsMongoToCosmosDbvCoreMongo.create(
    "testrg",
    "targetCosmosDbClusterName",
    "migrationRequest",
    {
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
    },
  );
  console.log(result);
}

async function main() {
  await createMongoToCosmosDbMongoVCoreDatabaseMigrationResourceWithMaximumParameters();
  await createMongoToCosmosDbMongoVCoreDatabaseMigrationResourceWithMinimumParameters();
}

main().catch(console.error);
