// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DatabaseMigrationSqlVm,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a new database migration to a given SQL VM.
 *
 * @summary Create a new database migration to a given SQL VM.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlVmCreateOrUpdateDatabaseMigrationMAX.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMaximumParameters(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlVirtualMachineName = "testvm";
  const targetDbName = "db1";
  const parameters: DatabaseMigrationSqlVm = {
    properties: {
      backupConfiguration: {
        sourceLocation: {
          fileShare: {
            path: "C:\\aaa\\bbb\\ccc",
            password: "placeholder",
            username: "name",
          },
        },
        targetLocation: {
          accountKey: "abcd",
          storageAccountResourceId: "account.database.windows.net",
        },
      },
      kind: "SqlVm",
      migrationService:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DataMigration/sqlMigrationServices/testagent",
      offlineConfiguration: {
        lastBackupName: "last_backup_file_name",
        offline: true,
      },
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
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result =
    await client.databaseMigrationsSqlVm.beginCreateOrUpdateAndWait(
      resourceGroupName,
      sqlVirtualMachineName,
      targetDbName,
      parameters,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a new database migration to a given SQL VM.
 *
 * @summary Create a new database migration to a given SQL VM.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/SqlVmCreateOrUpdateDatabaseMigrationMIN.json
 */
async function createOrUpdateDatabaseMigrationResourceWithMinimumParameters(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlVirtualMachineName = "testvm";
  const targetDbName = "db1";
  const parameters: DatabaseMigrationSqlVm = {
    properties: {
      backupConfiguration: {
        sourceLocation: {
          fileShare: {
            path: "C:\\aaa\\bbb\\ccc",
            password: "placeholder",
            username: "name",
          },
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
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result =
    await client.databaseMigrationsSqlVm.beginCreateOrUpdateAndWait(
      resourceGroupName,
      sqlVirtualMachineName,
      targetDbName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateDatabaseMigrationResourceWithMaximumParameters();
  await createOrUpdateDatabaseMigrationResourceWithMinimumParameters();
}

main().catch(console.error);
