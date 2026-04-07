// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Advanced Threat Protection state.
 *
 * @summary creates or updates an Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/ServerAdvancedThreatProtectionSettingsCreateMax.json
 */
async function updateAServerAdvancedThreatProtectionSettingsWithAllParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverAdvancedThreatProtectionSettings.createOrUpdate(
    "threatprotection-4799",
    "threatprotection-6440",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Advanced Threat Protection state.
 *
 * @summary creates or updates an Advanced Threat Protection state.
 * x-ms-original-file: 2025-02-01-preview/ServerAdvancedThreatProtectionSettingsCreateMin.json
 */
async function updateAServerAdvancedThreatProtectionSettingsWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.serverAdvancedThreatProtectionSettings.createOrUpdate(
    "threatprotection-4799",
    "threatprotection-6440",
    "Default",
    { state: "Disabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAServerAdvancedThreatProtectionSettingsWithAllParameters();
  await updateAServerAdvancedThreatProtectionSettingsWithMinimalParameters();
}

main().catch(console.error);
