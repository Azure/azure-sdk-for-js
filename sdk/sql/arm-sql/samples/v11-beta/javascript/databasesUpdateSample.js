// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates an existing database.
 *
 * @summary Updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/PatchVCoreDatabaseAssignMaintenanceConfiguration.json
 */
async function assignsMaintenanceWindowToADatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_SouthEastAsia_1",
    sku: { name: "BC_Gen5_4" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing database.
 *
 * @summary Updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/PatchDatabaseVBSEnclave.json
 */
async function createsADatabaseWithVbsEnclaveType() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = { preferredEnclaveType: "VBS" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing database.
 *
 * @summary Updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/PatchVCoreDatabaseWithKeysAndEncryptionProtector.json
 */
async function patchADatabaseWithDatabaseLevelCustomerManagedKeys() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    encryptionProtector: "https://your-key-vault-name.vault.azure.net/yourKey/yourKeyVersion",
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000111122223333444444444444/resourcegroups/DefaultSqlSouthEastAsia/providers/MicrosoftManagedIdentity/userAssignedIdentities/umi":
          {},
        "/subscriptions/00000000111122223333444444444444/resourcegroups/DefaultSqlSouthEastAsia/providers/MicrosoftManagedIdentity/userAssignedIdentities/umiToDelete":
          {},
      },
    },
    keys: {
      "https://yourKeyVaultNameVaultAzureNet/yourKey/yourKeyVersion": {},
      "https://yourKeyVaultNameVaultAzureNet/yourKey2/yourKey2VersionToDelete": {},
    },
    sku: { name: "S0", tier: "Standard" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing database.
 *
 * @summary Updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/PatchVCoreDatabaseResetMaintenanceConfiguration.json
 */
async function resetsMaintenanceWindowOfADatabaseToDefault() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default",
    sku: { name: "BC_Gen5_4" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing database.
 *
 * @summary Updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/PatchDatabaseDefaultEnclave.json
 */
async function updatesADatabaseWithDefaultEnclaveType() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = { preferredEnclaveType: "Default" };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Updates an existing database.
 *
 * @summary Updates an existing database.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-02-01-preview/examples/PatchVCoreDatabase.json
 */
async function updatesADatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const parameters = {
    licenseType: "LicenseIncluded",
    maxSizeBytes: 1073741824,
    sku: { name: "BC_Gen4_4" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    serverName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await assignsMaintenanceWindowToADatabase();
  await createsADatabaseWithVbsEnclaveType();
  await patchADatabaseWithDatabaseLevelCustomerManagedKeys();
  await resetsMaintenanceWindowOfADatabaseToDefault();
  await updatesADatabaseWithDefaultEnclaveType();
  await updatesADatabase();
}

main().catch(console.error);
