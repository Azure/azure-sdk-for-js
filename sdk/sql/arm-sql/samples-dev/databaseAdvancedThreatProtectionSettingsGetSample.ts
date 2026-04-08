// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a database's Advanced Threat Protection state.
 *
 * @summary gets a database's Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAdvancedThreatProtectionSettingsGet.json
 */
async function getADatabaseAdvancedThreatProtectionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.databaseAdvancedThreatProtectionSettings.get(
    "threatprotection-6852",
    "threatprotection-2080",
    "testdb",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADatabaseAdvancedThreatProtectionSettings();
}

main().catch(console.error);
