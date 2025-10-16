// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to check for resource name availability
 *
 * @summary aPI to check for resource name availability
 * x-ms-original-file: 2025-07-01/VaultCRUD/CheckBackupVaultsNameAvailability.json
 */
async function checkBackupVaultsNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupVaults.checkNameAvailability(
    "SampleResourceGroup",
    "westus",
    { name: "swaggerExample", type: "Microsoft.DataProtection/BackupVaults" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkBackupVaultsNameAvailability();
}

main().catch(console.error);
