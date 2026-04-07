// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates Advanced Threat Protection settings.
 *
 * @summary creates or updates Advanced Threat Protection settings.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAdvancedThreatProtectionSettingsCreateMax.json
 */
async function updateAManagedInstanceAdvancedThreatProtectionSettingsWithAllParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstanceAdvancedThreatProtectionSettings.createOrUpdate(
    "threatprotection-4799",
    "threatprotection-6440",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates Advanced Threat Protection settings.
 *
 * @summary creates or updates Advanced Threat Protection settings.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAdvancedThreatProtectionSettingsCreateMin.json
 */
async function updateAManagedInstanceAdvancedThreatProtectionSettingsWithMinimalParameters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstanceAdvancedThreatProtectionSettings.createOrUpdate(
    "threatprotection-4799",
    "threatprotection-6440",
    "Default",
    { state: "Disabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAManagedInstanceAdvancedThreatProtectionSettingsWithAllParameters();
  await updateAManagedInstanceAdvancedThreatProtectionSettingsWithMinimalParameters();
}

main().catch(console.error);
