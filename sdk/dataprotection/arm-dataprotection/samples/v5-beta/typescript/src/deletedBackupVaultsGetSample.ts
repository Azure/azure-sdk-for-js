// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a deleted backup vault
 *
 * @summary gets a deleted backup vault
 * x-ms-original-file: 2026-03-01/DeletedBackupVaults_Get.json
 */
async function getADeletedBackupVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.deletedBackupVaults.get("westus", "deleted-vault-01");
  console.log(result);
}

async function main(): Promise<void> {
  await getADeletedBackupVault();
}

main().catch(console.error);
