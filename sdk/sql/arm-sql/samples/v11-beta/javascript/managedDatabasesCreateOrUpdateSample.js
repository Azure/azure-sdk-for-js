// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateManagedDatabaseLedger.json
 */
async function createsANewManagedDatabaseWithLedgerOn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "managedDatabase",
    { location: "southeastasia", isLedgerOn: true },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCreateCrossSubscriptionPointInTimeRestore.json
 */
async function createsANewManagedDatabaseUsingCrossSubscriptionPointInTimeRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "managedDatabase",
    {
      location: "southeastasia",
      createMode: "PointInTimeRestore",
      crossSubscriptionSourceDatabaseId:
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/managedInstances/testsvr2/databases/testdb",
      crossSubscriptionTargetManagedInstanceId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/managedInstances/testsvr",
      restorePointInTime: new Date("2017-07-14T05:35:31.503Z"),
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCreateMax.json
 */
async function createsANewManagedDatabaseWithMaximalProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "managedDatabase",
    { location: "southeastasia", tags: { tagKey1: "TagValue1" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCreateMin.json
 */
async function createsANewManagedDatabaseWithMinimalProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "managedDatabase",
    { location: "southeastasia" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCreatePointInTimeRestore.json
 */
async function createsANewManagedDatabaseUsingPointInTimeRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "managedDatabase",
    {
      location: "southeastasia",
      createMode: "PointInTimeRestore",
      restorePointInTime: new Date("2017-07-14T05:35:31.503Z"),
      sourceDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/managedInstances/testsvr/databases/testdb",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCreateRecovery.json
 */
async function createsANewManagedDatabaseFromRestoringAGeoReplicatedBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "server1",
    "testdb_recovered",
    {
      location: "southeastasia",
      createMode: "Recovery",
      recoverableDatabaseId:
        "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/Default-SQL-WestEurope/providers/Microsoft.Sql/managedInstances/testsvr/recoverableDatabases/testdb",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCreateRestoreExternalBackup.json
 */
async function createsANewManagedDatabaseByRestoringFromAnExternalBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "managedDatabase",
    {
      location: "southeastasia",
      autoCompleteRestore: true,
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "RestoreExternalBackup",
      lastBackupName: "last_backup_name",
      storageContainerSasToken: "sv=2015-12-11&sr=c&sp=rl&sig=1234",
      storageContainerUri: "https://myaccountname.blob.core.windows.net/backups",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCreateRestoreExternalBackupManagedIdentity.json
 */
async function createsANewManagedDatabaseByRestoringFromAnExternalBackupUsingManagedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "managedDatabase",
    {
      location: "southeastasia",
      autoCompleteRestore: true,
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "RestoreExternalBackup",
      lastBackupName: "last_backup_name",
      storageContainerIdentity: "ManagedIdentity",
      storageContainerUri: "https://myaccountname.blob.core.windows.net/backups",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseCreateRestoreLtrBackup.json
 */
async function createsANewManagedDatabaseFromRestoringALongTermRetentionBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "managedInstance",
    "managedDatabase",
    {
      location: "southeastasia",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "RestoreExternalBackup",
      storageContainerSasToken: "sv=2015-12-11&sr=c&sp=rl&sig=1234",
      storageContainerUri: "https://myaccountname.blob.core.windows.net/backups",
    },
  );
  console.log(result);
}

async function main() {
  await createsANewManagedDatabaseWithLedgerOn();
  await createsANewManagedDatabaseUsingCrossSubscriptionPointInTimeRestore();
  await createsANewManagedDatabaseWithMaximalProperties();
  await createsANewManagedDatabaseWithMinimalProperties();
  await createsANewManagedDatabaseUsingPointInTimeRestore();
  await createsANewManagedDatabaseFromRestoringAGeoReplicatedBackup();
  await createsANewManagedDatabaseByRestoringFromAnExternalBackup();
  await createsANewManagedDatabaseByRestoringFromAnExternalBackupUsingManagedIdentity();
  await createsANewManagedDatabaseFromRestoringALongTermRetentionBackup();
}

main().catch(console.error);
