// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new database migration to a given SQL VM.
 *
 * @summary create a new database migration to a given SQL VM.
 * x-ms-original-file: 2025-09-01-preview/SqlVmCreateOrUpdateDatabaseMigrationMAX.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMaximumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlVm.createOrUpdate("testrg", "testvm", "db1", {
    properties: {
      backupConfiguration: {
        sourceLocation: {
          fileShare: { path: "C:\\aaa\\bbb\\ccc", password: "placeholder", username: "name" },
        },
        targetLocation: {
          accountKey: "abcd",
          storageAccountResourceId: "account.database.windows.net",
        },
      },
      kind: "SqlVm",
      migrationService:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DataMigration/sqlMigrationServices/testagent",
      offlineConfiguration: { lastBackupName: "last_backup_file_name", offline: true },
      scope:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/testvm",
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
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a new database migration to a given SQL VM.
 *
 * @summary create a new database migration to a given SQL VM.
 * x-ms-original-file: 2025-09-01-preview/SqlVmCreateOrUpdateDatabaseMigrationMIN.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMinimumParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.databaseMigrationsSqlVm.createOrUpdate("testrg", "testvm", "db1", {
    properties: {
      backupConfiguration: {
        sourceLocation: {
          fileShare: { path: "C:\\aaa\\bbb\\ccc", password: "placeholder", username: "name" },
        },
        targetLocation: {
          accountKey: "abcd",
          storageAccountResourceId: "account.database.windows.net",
        },
      },
      kind: "SqlVm",
      migrationService:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DataMigration/sqlMigrationServices/testagent",
      scope:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachines/testvm",
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
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateDatabaseMigrationResourceWithMaximumParameters();
  await createOrUpdateDatabaseMigrationResourceWithMinimumParameters();
}

main().catch(console.error);
