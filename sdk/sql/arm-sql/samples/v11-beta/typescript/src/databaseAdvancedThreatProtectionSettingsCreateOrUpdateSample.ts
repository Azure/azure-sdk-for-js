// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a database's Advanced Threat Protection state.
 *
 * @summary creates or updates a database's Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAdvancedThreatProtectionSettingsCreateMax.json
 */
async function updateADatabaseAdvancedThreatProtectionSettingsWithAllParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseAdvancedThreatProtectionSettings.createOrUpdate(
    "threatprotection-4799",
    "threatprotection-6440",
    "testdb",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a database's Advanced Threat Protection state.
 *
 * @summary creates or updates a database's Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAdvancedThreatProtectionSettingsCreateMin.json
 */
async function updateADatabaseAdvancedThreatProtectionSettingsWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseAdvancedThreatProtectionSettings.createOrUpdate(
    "threatprotection-4799",
    "threatprotection-6440",
    "testdb",
    "Default",
    { state: "Disabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateADatabaseAdvancedThreatProtectionSettingsWithAllParameters();
  await updateADatabaseAdvancedThreatProtectionSettingsWithMinimalParameters();
}

main().catch(console.error);
