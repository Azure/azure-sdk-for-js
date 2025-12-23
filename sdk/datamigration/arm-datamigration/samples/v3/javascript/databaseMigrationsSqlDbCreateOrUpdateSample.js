// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or Update Database Migration resource.
 *
 * @summary Create or Update Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlDbCreateOrUpdateDatabaseMigrationMAX.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMaximumParameters() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlDbInstanceName = "sqldbinstance";
  const targetDbName = "db1";
  const parameters = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlDb.beginCreateOrUpdateAndWait(
    resourceGroupName,
    sqlDbInstanceName,
    targetDbName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create or Update Database Migration resource.
 *
 * @summary Create or Update Database Migration resource.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlDbCreateOrUpdateDatabaseMigrationMIN.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMinimumParameters() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlDbInstanceName = "sqldbinstance";
  const targetDbName = "db1";
  const parameters = {
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
      targetSqlConnection: {
        authentication: "SqlAuthentication",
        dataSource: "sqldbinstance",
        encryptConnection: true,
        password: "placeholder",
        trustServerCertificate: true,
        userName: "bbb",
      },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlDb.beginCreateOrUpdateAndWait(
    resourceGroupName,
    sqlDbInstanceName,
    targetDbName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateDatabaseMigrationResourceWithMaximumParameters();
  await createOrUpdateDatabaseMigrationResourceWithMinimumParameters();
}

main().catch(console.error);
