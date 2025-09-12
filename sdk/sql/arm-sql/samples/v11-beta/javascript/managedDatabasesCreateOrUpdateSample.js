// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCreateRestoreExternalBackup.json
 */
async function createsANewManagedDatabaseByRestoringFromAnExternalBackup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const parameters = {
    autoCompleteRestore: true,
    collation: "SQL_Latin1_General_CP1_CI_AS",
    createMode: "RestoreExternalBackup",
    lastBackupName: "last_backup_name",
    location: "southeastasia",
    storageContainerSasToken: "sv=2015-12-11&sr=c&sp=rl&sig=1234",
    storageContainerUri: "https://myaccountname.blob.core.windows.net/backups",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCreateRestoreExternalBackupManagedIdentity.json
 */
async function createsANewManagedDatabaseByRestoringFromAnExternalBackupUsingManagedIdentity() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const parameters = {
    autoCompleteRestore: true,
    collation: "SQL_Latin1_General_CP1_CI_AS",
    createMode: "RestoreExternalBackup",
    lastBackupName: "last_backup_name",
    location: "southeastasia",
    storageContainerIdentity: "ManagedIdentity",
    storageContainerUri: "https://myaccountname.blob.core.windows.net/backups",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCreateRecovery.json
 */
async function createsANewManagedDatabaseFromRestoringAGeoReplicatedBackup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "server1";
  const databaseName = "testdb_recovered";
  const parameters = {
    createMode: "Recovery",
    location: "southeastasia",
    recoverableDatabaseId:
      "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/Default-SQL-WestEurope/providers/Microsoft.Sql/managedInstances/testsvr/recoverableDatabases/testdb",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCreateRestoreLtrBackup.json
 */
async function createsANewManagedDatabaseFromRestoringALongTermRetentionBackup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const parameters = {
    collation: "SQL_Latin1_General_CP1_CI_AS",
    createMode: "RestoreExternalBackup",
    location: "southeastasia",
    storageContainerSasToken: "sv=2015-12-11&sr=c&sp=rl&sig=1234",
    storageContainerUri: "https://myaccountname.blob.core.windows.net/backups",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCreateCrossSubscriptionPointInTimeRestore.json
 */
async function createsANewManagedDatabaseUsingCrossSubscriptionPointInTimeRestore() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const parameters = {
    createMode: "PointInTimeRestore",
    crossSubscriptionSourceDatabaseId:
      "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/managedInstances/testsvr2/databases/testdb",
    crossSubscriptionTargetManagedInstanceId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/managedInstances/testsvr",
    location: "southeastasia",
    restorePointInTime: new Date("2017-07-14T05:35:31.503Z"),
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCreatePointInTimeRestore.json
 */
async function createsANewManagedDatabaseUsingPointInTimeRestore() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const parameters = {
    createMode: "PointInTimeRestore",
    location: "southeastasia",
    restorePointInTime: new Date("2017-07-14T05:35:31.503Z"),
    sourceDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/managedInstances/testsvr/databases/testdb",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/CreateManagedDatabaseLedger.json
 */
async function createsANewManagedDatabaseWithLedgerOn() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const parameters = {
    isLedgerOn: true,
    location: "southeastasia",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCreateMax.json
 */
async function createsANewManagedDatabaseWithMaximalProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const parameters = {
    location: "southeastasia",
    tags: { tagKey1: "TagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-08-01-preview/examples/ManagedDatabaseCreateMin.json
 */
async function createsANewManagedDatabaseWithMinimalProperties() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "managedInstance";
  const databaseName = "managedDatabase";
  const parameters = { location: "southeastasia" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    managedInstanceName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createsANewManagedDatabaseByRestoringFromAnExternalBackup();
  await createsANewManagedDatabaseByRestoringFromAnExternalBackupUsingManagedIdentity();
  await createsANewManagedDatabaseFromRestoringAGeoReplicatedBackup();
  await createsANewManagedDatabaseFromRestoringALongTermRetentionBackup();
  await createsANewManagedDatabaseUsingCrossSubscriptionPointInTimeRestore();
  await createsANewManagedDatabaseUsingPointInTimeRestore();
  await createsANewManagedDatabaseWithLedgerOn();
  await createsANewManagedDatabaseWithMaximalProperties();
  await createsANewManagedDatabaseWithMinimalProperties();
}

main().catch(console.error);
