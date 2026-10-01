// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the Defender for Storage settings for the specified storage account.
 *
 * @summary gets the Defender for Storage settings for the specified storage account.
 * x-ms-original-file: 2025-09-01-preview/DefenderForStorage/GetDefenderForStorageSettings_example.json
 */
async function getsTheDefenderForStorageSettingsForTheSpecifiedResource() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.defenderForStorage.get(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount",
    "current",
  );
  console.log(result);
}

async function main() {
  await getsTheDefenderForStorageSettingsForTheSpecifiedResource();
}

main().catch(console.error);
