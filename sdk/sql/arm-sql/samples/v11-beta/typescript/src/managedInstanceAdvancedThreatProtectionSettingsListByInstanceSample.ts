// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the managed instance's Advanced Threat Protection settings.
 *
 * @summary get the managed instance's Advanced Threat Protection settings.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceAdvancedThreatProtectionSettingsListByInstance.json
 */
async function listTheManagedInstanceAdvancedThreatProtectionSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstanceAdvancedThreatProtectionSettings.listByInstance(
    "threatprotection-4799",
    "threatprotection-6440",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheManagedInstanceAdvancedThreatProtectionSettings();
}

main().catch(console.error);
