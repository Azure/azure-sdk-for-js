// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces an Arc Sql Server Database.
 *
 * @summary creates or replaces an Arc Sql Server Database.
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateArcSqlServerDatabase.json
 */
async function createAArcSqlServerDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.sqlServerDatabases.create(
    "testrg",
    "testSqlServerInstance",
    "testdb",
    {
      location: "southeastasia",
      properties: {
        backupInformation: {
          lastFullBackup: new Date("2022-05-05T16:26:33.883Z"),
          lastLogBackup: new Date("2022-05-10T16:26:33.883Z"),
        },
        backupPolicy: {
          differentialBackupHours: 12,
          fullBackupDays: 1,
          retentionPeriodDays: 1,
          transactionLogBackupMinutes: 30,
        },
        collationName: "SQL_Latin1_General_CP1_CI_AS",
        compatibilityLevel: 150,
        createMode: "PointInTimeRestore",
        dataFileSizeMB: 80,
        databaseCreationDate: new Date("2022-04-05T16:26:33.883Z"),
        databaseOptions: {
          isAutoCloseOn: true,
          isAutoCreateStatsOn: true,
          isAutoShrinkOn: true,
          isAutoUpdateStatsOn: true,
          isEncrypted: true,
          isHekatonFilesOn: false,
          isMemoryOptimizationEnabled: true,
          isRemoteDataArchiveEnabled: true,
          isTrustworthyOn: true,
        },
        isReadOnly: true,
        logFileSizeMB: 70,
        migration: {
          jobs: [
            {
              additionalAttributes: [{ keyName: "LRSVersion", keyValue: "2.34" }],
              initiatedFrom: "DMS-Portal",
              migrationMode: "LogShipping",
              migrationTrackingId:
                "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.DataMigration/SqlMigrationServices/my-migration-service",
              targetResourceId:
                "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Sql/managedInstances/myManagedInstance/databases/myDatabase",
              targetType: "AzureSqlManagedInstance",
            },
          ],
        },
        recoveryMode: "Full",
        restorePointInTime: new Date("2022-05-05T16:26:33.883Z"),
        sizeMB: 150,
        sourceDatabaseId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.AzureArcData/testSqlServerInstance/testsqlManagedInstance/databases/MyDatabase",
        spaceAvailableMB: 100,
        state: "Online",
      },
      tags: { mytag: "myval" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAArcSqlServerDatabase();
}

main().catch(console.error);
