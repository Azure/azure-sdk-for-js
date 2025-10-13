// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a server's Advanced Threat Protection state
 *
 * @summary get a server's Advanced Threat Protection state
 * x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsGet.json
 */
async function getAServerAdvancedThreatProtectionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.advancedThreatProtectionSettings.get(
    "threatprotection-6852",
    "threatprotection-2080",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAServerAdvancedThreatProtectionSettings();
}

main().catch(console.error);
