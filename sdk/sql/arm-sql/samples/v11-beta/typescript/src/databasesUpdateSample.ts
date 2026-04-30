// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/PatchDatabaseDefaultEnclave.json
 */
async function updatesADatabaseWithDefaultEnclaveType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.update("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    preferredEnclaveType: "Default",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/PatchDatabaseVBSEnclave.json
 */
async function updatesADatabaseWithVBSEnclaveType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.update("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    preferredEnclaveType: "VBS",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/PatchVCoreDatabase.json
 */
async function updatesADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.update("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    licenseType: "LicenseIncluded",
    maxSizeBytes: 1073741824,
    sku: { name: "BC_Gen4_4" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/PatchVCoreDatabaseAssignMaintenanceConfiguration.json
 */
async function assignsMaintenanceWindowToADatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.update("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_SouthEastAsia_1",
    sku: { name: "BC_Gen5_4" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/PatchVCoreDatabaseResetMaintenanceConfiguration.json
 */
async function resetsMaintenanceWindowOfADatabaseToDefault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.update("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    maintenanceConfigurationId:
      "/subscriptions/00000000-1111-2222-3333-444444444444/providers/Microsoft.Maintenance/publicMaintenanceConfigurations/SQL_Default",
    sku: { name: "BC_Gen5_4" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing database.
 *
 * @summary updates an existing database.
 * x-ms-original-file: 2025-02-01-preview/PatchVCoreDatabaseWithKeysAndEncryptionProtector.json
 */
async function patchADatabaseWithDatabaseLevelCustomerManagedKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databases.update("Default-SQL-SouthEastAsia", "testsvr", "testdb", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourcegroups/Default-SQL-SouthEastAsia/providers/Microsoft.ManagedIdentity/userAssignedIdentities/umi":
          {},
      },
    },
    encryptionProtector: "https://your-key-vault-name.vault.azure.net/yourKey/yourKeyVersion",
    keys: { "https://your-key-vault-name.vault.azure.net/yourKey/yourKeyVersion": {} },
    sku: { name: "S0", tier: "Standard" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesADatabaseWithDefaultEnclaveType();
  await updatesADatabaseWithVBSEnclaveType();
  await updatesADatabase();
  await assignsMaintenanceWindowToADatabase();
  await resetsMaintenanceWindowOfADatabaseToDefault();
  await patchADatabaseWithDatabaseLevelCustomerManagedKeys();
}

main().catch(console.error);
