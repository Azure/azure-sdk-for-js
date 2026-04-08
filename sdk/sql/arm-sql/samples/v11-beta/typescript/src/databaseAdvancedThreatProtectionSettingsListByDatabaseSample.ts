// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of database's Advanced Threat Protection states.
 *
 * @summary gets a list of database's Advanced Threat Protection states.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAdvancedThreatProtectionSettingsListByDatabase.json
 */
async function listsTheDatabaseAdvancedThreatProtectionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseAdvancedThreatProtectionSettings.listByDatabase(
    "threatprotection-6852",
    "threatprotection-2080",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsTheDatabaseAdvancedThreatProtectionSettings();
}

main().catch(console.error);
