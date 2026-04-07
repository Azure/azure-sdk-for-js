// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a managed database's Advanced Threat Protection state.
 *
 * @summary gets a managed database's Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseAdvancedThreatProtectionSettingsGet.json
 */
async function getAManagedDatabaseAdvancedThreatProtectionSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabaseAdvancedThreatProtectionSettings.get(
    "threatprotection-6852",
    "threatprotection-2080",
    "testdb",
    "Default",
  );
  console.log(result);
}

async function main() {
  await getAManagedDatabaseAdvancedThreatProtectionSettings();
}

main().catch(console.error);
