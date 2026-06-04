// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Advanced Threat Protection settings for the specified resource.
 *
 * @summary gets the Advanced Threat Protection settings for the specified resource.
 * x-ms-original-file: 2019-01-01/AdvancedThreatProtection/GetAdvancedThreatProtectionSettings_example.json
 */
async function getsTheAdvancedThreatProtectionSettingsForTheSpecifiedResource() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.advancedThreatProtection.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount",
  );
  console.log(result);
}

async function main() {
  await getsTheAdvancedThreatProtectionSettingsForTheSpecifiedResource();
}

main().catch(console.error);
