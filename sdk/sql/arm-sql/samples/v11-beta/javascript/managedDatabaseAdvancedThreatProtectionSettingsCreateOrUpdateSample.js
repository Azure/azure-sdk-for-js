// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a managed database's Advanced Threat Protection state.
 *
 * @summary creates or updates a managed database's Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseAdvancedThreatProtectionSettingsCreateMax.json
 */
async function updateAManagedDatabaseAdvancedThreatProtectionSettingsWithAllParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseAdvancedThreatProtectionSettings.createOrUpdate(
    "threatprotection-4799",
    "threatprotection-6440",
    "testdb",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a managed database's Advanced Threat Protection state.
 *
 * @summary creates or updates a managed database's Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseAdvancedThreatProtectionSettingsCreateMin.json
 */
async function updateAManagedDatabaseAdvancedThreatProtectionSettingsWithMinimalParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabaseAdvancedThreatProtectionSettings.createOrUpdate(
    "threatprotection-4799",
    "threatprotection-6440",
    "testdb",
    "Default",
    { state: "Disabled" },
  );
  console.log(result);
}

async function main() {
  await updateAManagedDatabaseAdvancedThreatProtectionSettingsWithAllParameters();
  await updateAManagedDatabaseAdvancedThreatProtectionSettingsWithMinimalParameters();
}

main().catch(console.error);
