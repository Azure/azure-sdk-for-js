// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the Advanced Threat Protection settings on a specified resource.
 *
 * @summary creates or updates the Advanced Threat Protection settings on a specified resource.
 * x-ms-original-file: 2019-01-01/AdvancedThreatProtection/PutAdvancedThreatProtectionSettings_example.json
 */
async function createsOrUpdatesTheAdvancedThreatProtectionSettingsOnASpecifiedResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.advancedThreatProtection.create(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount",
    {
      type: "Microsoft.Security/advancedThreatProtectionSettings",
      id: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount/providers/Microsoft.Security/advancedThreatProtectionSettings/current",
      isEnabled: true,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesTheAdvancedThreatProtectionSettingsOnASpecifiedResource();
}

main().catch(console.error);
