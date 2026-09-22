// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or Update Database Migration resource.
 *
 * @summary create or Update Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/SqlDbCreateOrUpdateDatabaseMigrationMAX.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMaximumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlDb.createOrUpdate(
    "testrg",
    "sqldbinstance",
    "db1",
    {
      properties: {
        kind: "SqlDb",
        migrationService:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DataMigration/sqlMigrationServices/testagent",
        scope:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Sql/servers/sqldbinstance",
        sourceDatabaseName: "aaa",
        sourceSqlConnection: {
          authentication: "WindowsAuthentication",
          dataSource: "aaa",
          encryptConnection: true,
          password: "placeholder",
          trustServerCertificate: true,
          userName: "bbb",
        },
        sqlServerInstanceId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.AzureArcData/SqlServerInstances/instanceName",
        tableList: ["[Schema1].[TableName1]", "[Schema2].[TableName2]"],
        targetSqlConnection: {
          authentication: "SqlAuthentication",
          dataSource: "sqldbinstance",
          encryptConnection: true,
          password: "placeholder",
          trustServerCertificate: true,
          userName: "bbb",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update Database Migration resource.
 *
 * @summary create or Update Database Migration resource.
 * x-ms-original-file: 2025-09-01-preview/SqlDbCreateOrUpdateDatabaseMigrationMIN.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlDb.createOrUpdate(
    "testrg",
    "sqldbinstance",
    "db1",
    {
      properties: {
        kind: "SqlDb",
        migrationService:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DataMigration/sqlMigrationServices/testagent",
        scope:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Sql/servers/sqldbinstance",
        sourceDatabaseName: "aaa",
        sourceSqlConnection: {
          authentication: "WindowsAuthentication",
          dataSource: "aaa",
          encryptConnection: true,
          password: "placeholder",
          trustServerCertificate: true,
          userName: "bbb",
        },
        sqlServerInstanceId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.AzureArcData/SqlServerInstances/instanceName",
        targetSqlConnection: {
          authentication: "SqlAuthentication",
          dataSource: "sqldbinstance",
          encryptConnection: true,
          password: "placeholder",
          trustServerCertificate: true,
          userName: "bbb",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateDatabaseMigrationResourceWithMaximumParameters();
  await createOrUpdateDatabaseMigrationResourceWithMinimumParameters();
}

main().catch(console.error);
