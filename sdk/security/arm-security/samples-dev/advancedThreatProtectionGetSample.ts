// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Advanced Threat Protection settings for the specified resource.
 *
 * @summary gets the Advanced Threat Protection settings for the specified resource.
 * x-ms-original-file: 2019-01-01/AdvancedThreatProtection/GetAdvancedThreatProtectionSettings_example.json
 */
async function getsTheAdvancedThreatProtectionSettingsForTheSpecifiedResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.advancedThreatProtection.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheAdvancedThreatProtectionSettingsForTheSpecifiedResource();
}

main().catch(console.error);
