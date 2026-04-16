// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a backup instance in a backup vault
 *
 * @summary delete a backup instance in a backup vault
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/DeleteBackupInstance.json
 */
async function deleteBackupInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.delete("000pikumar", "PratikPrivatePreviewVault1", "testInstance1");
}

async function main(): Promise<void> {
  await deleteBackupInstance();
}

main().catch(console.error);
