// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseConfiguredBackupStorageRedundancy.json
 */
async function createsADatabaseWithSpecifiedBackupStorageRedundancy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    { location: "southeastasia", requestedBackupStorageRedundancy: "Zone" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseCopyMode.json
 */
async function createsADatabaseAsACopy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "dbcopy",
    {
      location: "southeastasia",
      createMode: "Copy",
      sourceDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/testsvr/databases/testdb",
      sku: { name: "S0", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseDefaultEnclave.json
 */
async function createsADatabaseWithDefaultEnclaveType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    { location: "southeastasia", preferredEnclaveType: "Default" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseDefaultMode.json
 */
async function createsADatabaseWithDefaultMode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      location: "southeastasia",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "Default",
      maxSizeBytes: 1073741824,
      sku: { name: "S0", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseDefaultModeWithKeysAndEncryptionProtector.json
 */
async function createsADatabaseWithDatabaseLevelCustomerManagedKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/Default-SQL-SouthEastAsia/providers/Microsoft.ManagedIdentity/userAssignedIdentities/umi":
            {},
        },
      },
      location: "southeastasia",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "Default",
      encryptionProtector: "https://your-key-vault-name.vault.azure.net/yourKey/yourKeyVersion",
      keys: {
        "https://your-key-vault-name.vault.azure.net/yourKey/yourKeyVersion": {},
        "https://your-key-vault-name.vault.azure.net/yourKey2/yourKey2Version": {},
      },
      maxSizeBytes: 1073741824,
      sku: { name: "S0", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseDefaultModeWithVersionlessKeysAndVersionlessEncryptionProtector.json
 */
async function createsADatabaseWithDatabaseLevelVersionlessCustomerManagedKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/Default-SQL-SouthEastAsia/providers/Microsoft.ManagedIdentity/userAssignedIdentities/umi":
            {},
        },
      },
      location: "southeastasia",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "Default",
      encryptionProtector: "https://your-key-vault-name.vault.azure.net/yourKey",
      keys: {
        "https://your-key-vault-name.vault.azure.net/yourKey": {},
        "https://your-key-vault-name.vault.azure.net/yourKey2": {},
      },
      maxSizeBytes: 1073741824,
      sku: { name: "S0", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseLedger.json
 */
async function createsADatabaseWithLedgerOn() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    { location: "southeastasia", isLedgerOn: true },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseMaintenanceConfiguration.json
 */
async function createsADatabaseWithPreferredMaintenanceWindow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      location: "southeastasia",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "Default",
      maintenanceConfigurationId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_SouthEastAsia_1",
      maxSizeBytes: 1073741824,
      sku: { name: "S2", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseMin.json
 */
async function createsADatabaseWithMinimumNumberOfParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    { location: "southeastasia" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseNamedReplica.json
 */
async function createsADatabaseAsNamedReplicaSecondary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      location: "southeastasia",
      createMode: "Secondary",
      secondaryType: "Named",
      sourceDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-NorthEurope/providers/Microsoft.Sql/servers/testsvr1/databases/primarydb",
      sku: { name: "HS_Gen4", capacity: 2, tier: "Hyperscale" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabasePITRMode.json
 */
async function createsADatabaseFromPointInTimeRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "dbpitr",
    {
      location: "southeastasia",
      createMode: "PointInTimeRestore",
      restorePointInTime: new Date("2020-10-22T05:35:31.503Z"),
      sourceDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-SoutheastAsia/providers/Microsoft.Sql/servers/testsvr/databases/testdb",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseSecondaryMode.json
 */
async function createsADatabaseAsAnOnLineSecondary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      location: "southeastasia",
      createMode: "Secondary",
      secondaryType: "Geo",
      sourceDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-NorthEurope/providers/Microsoft.Sql/servers/testsvr1/databases/testdb",
      sku: { name: "S0", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseStandbyMode.json
 */
async function createsADatabaseAsAStandbySecondary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      location: "southeastasia",
      createMode: "Secondary",
      secondaryType: "Standby",
      sourceDatabaseId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/Default-SQL-NorthEurope/providers/Microsoft.Sql/servers/testsvr1/databases/testdb",
      sku: { name: "S0", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseVBSEnclave.json
 */
async function createsADatabaseWithVBSEnclaveType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    { location: "southeastasia", preferredEnclaveType: "VBS" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseWithAvailabilityZone.json
 */
async function createsADatabaseWithAvailabilityZoneSpecified() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      location: "southeastasia",
      availabilityZone: "1",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "Default",
      maxSizeBytes: 1073741824,
      sku: { name: "S0", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDatabaseWithEncryptionProtectorAutoRotation.json
 */
async function createsADatabaseWithEncryptionProtectorAutoRotation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/Default-SQL-SouthEastAsia/providers/Microsoft.ManagedIdentity/userAssignedIdentities/umi":
            {},
        },
      },
      location: "southeastasia",
      collation: "SQL_Latin1_General_CP1_CI_AS",
      createMode: "Default",
      encryptionProtector: "https://your-key-vault-name.vault.azure.net/yourKey/yourKeyVersion",
      encryptionProtectorAutoRotation: true,
      maxSizeBytes: 1073741824,
      sku: { name: "S0", tier: "Standard" },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDwDatabaseCrossSubscriptionPITR.json
 */
async function createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromARestorePointOfAnExistingDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdw",
    {
      location: "southeastasia",
      createMode: "PointInTimeRestore",
      restorePointInTime: new Date("2022-01-22T05:35:31.503Z"),
      sourceResourceId:
        "/subscriptions/55555555-6666-7777-8888-999999999999/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/srcsvr/databases/srcdw",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDwDatabaseCrossSubscriptionRecovery.json
 */
async function createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromAGeoBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate("Default-SQL-WestUS", "testsvr", "testdw", {
    location: "westus",
    createMode: "Recovery",
    sourceResourceId:
      "/subscriptions/55555555-6666-7777-8888-999999999999/resourceGroups/Default-SQL-EastUS/providers/Microsoft.Sql/servers/srcsvr/recoverabledatabases/srcdw",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateDwDatabaseCrossSubscriptionRestore.json
 */
async function createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromABackupOfADroppedDatabase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdw",
    {
      location: "southeastasia",
      createMode: "Restore",
      sourceResourceId:
        "/subscriptions/55555555-6666-7777-8888-999999999999/resourceGroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/servers/srcsvr/restorableDroppedDatabases/srcdw,131403269876900000",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateVCoreDatabaseByServiceObjective.json
 */
async function createsAVCoreDatabaseBySpecifyingServiceObjectiveName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    { location: "southeastasia", sku: { name: "BC", capacity: 2, family: "Gen4" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/CreateVCoreDatabaseBySkuNameCapacity.json
 */
async function createsAVCoreDatabaseBySpecifyingSkuNameAndCapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    { location: "southeastasia", sku: { name: "BC_Gen4", capacity: 2 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/UpdateDatabaseHyperscaleMigrationPerformCutover.json
 */
async function updatesADatabaseToHyperscaleTierByTriggeringManualCutoverDuringMigrationWorkflow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/userAssignedIdentities/umi":
            {},
        },
      },
      location: "southeastasia",
      performCutover: true,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new database or updates an existing database.
 *
 * @summary creates a new database or updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/UpdateDatabaseHyperscaleMigrationWithManualCutover.json
 */
async function updatesADatabaseToHyperscaleSLOWithManualCutover() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/Default-SQL-SouthEastAsia/providers/Microsoft.Sql/userAssignedIdentities/umi":
            {},
        },
      },
      location: "southeastasia",
      manualCutover: true,
      sku: { name: "HS_Gen5_2", tier: "Hyperscale" },
    },
  );
  console.log(result);
}

async function main() {
  await createsADatabaseWithSpecifiedBackupStorageRedundancy();
  await createsADatabaseAsACopy();
  await createsADatabaseWithDefaultEnclaveType();
  await createsADatabaseWithDefaultMode();
  await createsADatabaseWithDatabaseLevelCustomerManagedKeys();
  await createsADatabaseWithDatabaseLevelVersionlessCustomerManagedKeys();
  await createsADatabaseWithLedgerOn();
  await createsADatabaseWithPreferredMaintenanceWindow();
  await createsADatabaseWithMinimumNumberOfParameters();
  await createsADatabaseAsNamedReplicaSecondary();
  await createsADatabaseFromPointInTimeRestore();
  await createsADatabaseAsAnOnLineSecondary();
  await createsADatabaseAsAStandbySecondary();
  await createsADatabaseWithVBSEnclaveType();
  await createsADatabaseWithAvailabilityZoneSpecified();
  await createsADatabaseWithEncryptionProtectorAutoRotation();
  await createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromARestorePointOfAnExistingDatabase();
  await createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromAGeoBackup();
  await createsADataWarehouseDatabaseAsACrossSubscriptionRestoreFromABackupOfADroppedDatabase();
  await createsAVCoreDatabaseBySpecifyingServiceObjectiveName();
  await createsAVCoreDatabaseBySpecifyingSkuNameAndCapacity();
  await updatesADatabaseToHyperscaleTierByTriggeringManualCutoverDuringMigrationWorkflow();
  await updatesADatabaseToHyperscaleSLOWithManualCutover();
}

main().catch(console.error);
