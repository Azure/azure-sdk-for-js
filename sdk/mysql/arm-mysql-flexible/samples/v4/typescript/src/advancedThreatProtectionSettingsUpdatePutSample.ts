// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a server's Advanced Threat Protection state.
 *
 * @summary updates a server's Advanced Threat Protection state.
 * x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsPutDisabled.json
 */
async function disableAServerAdvancedThreatProtectionSettingsWithAllParametersUsingPUT(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.advancedThreatProtectionSettings.updatePut(
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
 * x-ms-original-file: 2024-12-30/AdvancedThreatProtectionSettingsPutEnabled.json
 */
async function enableAServerAdvancedThreatProtectionSettingsUsingPUT(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.advancedThreatProtectionSettings.updatePut(
    "threatprotection-4799",
    "threatprotection-6440",
    "Default",
    { properties: { state: "Enabled" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disableAServerAdvancedThreatProtectionSettingsWithAllParametersUsingPUT();
  await enableAServerAdvancedThreatProtectionSettingsUsingPUT();
}

main().catch(console.error);
