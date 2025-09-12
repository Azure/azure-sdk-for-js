// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateVCoreDatabaseByServiceObjective.json
 */
async function createsAVCoreDatabaseBySpecifyingServiceObjectiveName() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    location: "southeastasia",
    sku: { name: "BC", capacity: 2, family: "Gen4" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateVCoreDatabaseBySkuNameCapacity.json
 */
async function createsAVCoreDatabaseBySpecifyingSkuNameAndCapacity() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    location: "southeastasia",
    sku: { name: "BC_Gen4", capacity: 2 },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDwDatabaseCrossSubscriptionRestore.json
 */
async function createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromABackupOfADroppedDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdw";
  const parameters = {
    createMode: "Restore",
    location: "southeastasia",
    sourceResourceId:
      "/subscriptions/55555555-6666-7777-8888-999999999999/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/srcsvr/restorableDroppedDatabases/srcdw,131403269876900000",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDwDatabaseCrossSubscriptionRecovery.json
 */
async function createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromAGeoBackup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-WestUS";
  const serverName = "testsvr";
  const databaseName = "testdw";
  const parameters = {
    createMode: "Recovery",
    location: "westus",
    sourceResourceId:
      "/subscriptions/55555555-6666-7777-8888-999999999999/resourceGroups/Default-SQL-EastUS/providers/Microsoft.Sql/servers/srcsvr/recoverabledatabases/srcdw",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDwDatabaseCrossSubscriptionPITR.json
 */
async function createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromARestorePointOfAnExistingDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdw";
  const parameters = {
    createMode: "PointInTimeRestore",
    location: "southeastasia",
    restorePointInTime: new Date("2022-01-22T05:35:31.503Z"),
    sourceResourceId:
      "/subscriptions/55555555-6666-7777-8888-999999999999/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/srcsvr/databases/srcdw",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseCopyMode.json
 */
async function createsADatabaseAsACopy() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "dbcopy";
  const parameters = {
    createMode: "Copy",
    location: "southeastasia",
    sku: { name: "S0", tier: "Standard" },
    sourceDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/testsvr/databases/testdb",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseStandbyMode.json
 */
async function createsADatabaseAsAStandbySecondary() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    createMode: "Secondary",
    location: "southeastasia",
    secondaryType: "Standby",
    sku: { name: "S0", tier: "Standard" },
    sourceDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-NorthEurope/providers/Microsoft.Sql/servers/testsvr1/databases/testdb",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseSecondaryMode.json
 */
async function createsADatabaseAsAnOnLineSecondary() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    createMode: "Secondary",
    location: "southeastasia",
    secondaryType: "Geo",
    sku: { name: "S0", tier: "Standard" },
    sourceDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-NorthEurope/providers/Microsoft.Sql/servers/testsvr1/databases/testdb",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseNamedReplica.json
 */
async function createsADatabaseAsNamedReplicaSecondary() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    createMode: "Secondary",
    location: "southeastasia",
    secondaryType: "Named",
    sku: { name: "HS_Gen4", capacity: 2, tier: "Hyperscale" },
    sourceDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-NorthEurope/providers/Microsoft.Sql/servers/testsvr1/databases/primarydb",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabasePITRMode.json
 */
async function createsADatabaseFromPointInTimeRestore() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "dbpitr";
  const parameters = {
    createMode: "PointInTimeRestore",
    location: "southeastasia",
    restorePointInTime: new Date("2020-10-22T05:35:31.503Z"),
    sourceDatabaseId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SoutheastAsia/providers/Microsoft.Sql/servers/testsvr/databases/testdb",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseDefaultEnclave.json
 */
async function createsADatabaseWithDefaultEnclaveType() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    location: "southeastasia",
    preferredEnclaveType: "Default",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseVBSEnclave.json
 */
async function createsADatabaseWithVbsEnclaveType() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    location: "southeastasia",
    preferredEnclaveType: "VBS",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseWithAvailabilityZone.json
 */
async function createsADatabaseWithAvailabilityZoneSpecified() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    availabilityZone: "1",
    collation: "SQL_Latin1_General_CP1_CI_AS",
    createMode: "Default",
    location: "southeastasia",
    maxSizeBytes: 1073741824,
    sku: { name: "S0", tier: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseDefaultModeWithKeysAndEncryptionProtector.json
 */
async function createsADatabaseWithDatabaseLevelCustomerManagedKeys() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    collation: "SQL_Latin1_General_CP1_CI_AS",
    createMode: "Default",
    encryptionProtector: "https://your-key-vault-name.vault.azure.net/yourKey/yourKeyVersion",
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000111122223333444444444444/resourcegroups/DefaultSqlSouthEastAsia/providers/MicrosoftManagedIdentity/userAssignedIdentities/umi":
          {},
      },
    },
    keys: {
      "https://yourKeyVaultNameVaultAzureNet/yourKey/yourKeyVersion": {},
      "https://yourKeyVaultNameVaultAzureNet/yourKey2/yourKey2Version": {},
    },
    location: "southeastasia",
    maxSizeBytes: 1073741824,
    sku: { name: "S0", tier: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseDefaultMode.json
 */
async function createsADatabaseWithDefaultMode() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    collation: "SQL_Latin1_General_CP1_CI_AS",
    createMode: "Default",
    location: "southeastasia",
    maxSizeBytes: 1073741824,
    sku: { name: "S0", tier: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseLedger.json
 */
async function createsADatabaseWithLedgerOn() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = { isLedgerOn: true, location: "southeastasia" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseMin.json
 */
async function createsADatabaseWithMinimumNumberOfParameters() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = { location: "southeastasia" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseMaintenanceConfiguration.json
 */
async function createsADatabaseWithPreferredMaintenanceWindow() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    collation: "SQL_Latin1_General_CP1_CI_AS",
    createMode: "Default",
    location: "southeastasia",
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_SouthEastAsia_1",
    maxSizeBytes: 1073741824,
    sku: { name: "S2", tier: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/CreateDatabaseConfiguredBackupStorageRedundancy.json
 */
async function createsADatabaseWithSpecifiedBackupStorageRedundancy() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    location: "southeastasia",
    requestedBackupStorageRedundancy: "Zone",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/UpdateDatabaseHyperscaleMigrationWithManualCutover.json
 */
async function updatesADatabaseToHyperscaleSloWithManualCutover() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000111122223333444444444444/resourcegroups/DefaultSqlSouthEastAsia/providers/MicrosoftSql/userAssignedIdentities/umi":
          {},
        "/subscriptions/00000000111122223333444444444444/resourcegroups/DefaultSqlSouthEastAsia/providers/MicrosoftSql/userAssignedIdentities/umiToDelete":
          {},
      },
    },
    location: "southeastasia",
    manualCutover: true,
    sku: { name: "HS_Gen5_2", tier: "Hyperscale" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates a new database or updates an existing database.
 *
 * @summary Creates a new database or updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/UpdateDatabaseHyperscaleMigrationPerformCutover.json
 */
async function updatesADatabaseToHyperscaleTierByTriggeringManualCutoverDuringMigrationWorkflow() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000111122223333444444444444/resourcegroups/DefaultSqlSouthEastAsia/providers/MicrosoftSql/userAssignedIdentities/umi":
          {},
        "/subscriptions/00000000111122223333444444444444/resourcegroups/DefaultSqlSouthEastAsia/providers/MicrosoftSql/userAssignedIdentities/umiToDelete":
          {},
      },
    },
    location: "southeastasia",
    performCutover: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createsAVCoreDatabaseBySpecifyingServiceObjectiveName();
  await createsAVCoreDatabaseBySpecifyingSkuNameAndCapacity();
  await createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromABackupOfADroppedDatabase();
  await createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromAGeoBackup();
  await createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromARestorePointOfAnExistingDatabase();
  await createsADatabaseAsACopy();
  await createsADatabaseAsAStandbySecondary();
  await createsADatabaseAsAnOnLineSecondary();
  await createsADatabaseAsNamedReplicaSecondary();
  await createsADatabaseFromPointInTimeRestore();
  await createsADatabaseWithDefaultEnclaveType();
  await createsADatabaseWithVbsEnclaveType();
  await createsADatabaseWithAvailabilityZoneSpecified();
  await createsADatabaseWithDatabaseLevelCustomerManagedKeys();
  await createsADatabaseWithDefaultMode();
  await createsADatabaseWithLedgerOn();
  await createsADatabaseWithMinimumNumberOfParameters();
  await createsADatabaseWithPreferredMaintenanceWindow();
  await createsADatabaseWithSpecifiedBackupStorageRedundancy();
  await updatesADatabaseToHyperscaleSloWithManualCutover();
  await updatesADatabaseToHyperscaleTierByTriggeringManualCutoverDuringMigrationWorkflow();
}

main().catch(console.error);
