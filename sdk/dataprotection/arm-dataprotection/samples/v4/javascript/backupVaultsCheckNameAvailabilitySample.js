// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI to check for resource name availability
 *
 * @summary aPI to check for resource name availability
 * x-ms-original-file: 2025-07-01/VaultCRUD/CheckBackupVaultsNameAvailability.json
 */
async function checkBackupVaultsNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.checkNameAvailability("SampleResourceGroup", "westus", {
    name: "swaggerExample",
    type: "Microsoft.DataProtection/BackupVaults",
  });
  console.log(result);
}

async function main() {
  await checkBackupVaultsNameAvailability();
}

main().catch(console.error);
