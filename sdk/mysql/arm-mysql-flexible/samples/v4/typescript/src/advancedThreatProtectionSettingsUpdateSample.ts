// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a server's Advanced Threat Protection state.
 *
 * @summary updates a server's Advanced Threat Protection state.
 * x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsPatchDisabled.json
 */
async function disableAServerAdvancedThreatProtectionSettingsWithAllParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.advancedThreatProtectionSettings.update(
    "threatprotection-4799",
    "threatprotection-6440",
    "Default",
    { properties: { state: "Disabled" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates a server's Advanced Threat Protection state.
 *
 * @summary updates a server's Advanced Threat Protection state.
 * x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsPatchEnabled.json
 */
async function enableAServerAdvancedThreatProtectionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.advancedThreatProtectionSettings.update(
    "threatprotection-4799",
    "threatprotection-6440",
    "Default",
    { properties: { state: "Enabled" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disableAServerAdvancedThreatProtectionSettingsWithAllParameters();
  await enableAServerAdvancedThreatProtectionSettings();
}

main().catch(console.error);
