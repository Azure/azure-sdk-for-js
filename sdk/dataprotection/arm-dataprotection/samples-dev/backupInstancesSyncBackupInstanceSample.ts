// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sync backup instance again in case of failure
 * This action will retry last failed operation and will bring backup instance to valid state
 *
 * @summary sync backup instance again in case of failure
 * This action will retry last failed operation and will bring backup instance to valid state
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/SyncBackupInstance.json
 */
async function syncBackupInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.syncBackupInstance("testrg", "testvault", "testbi", {
    syncType: "Default",
  });
}

async function main(): Promise<void> {
  await syncBackupInstance();
}

main().catch(console.error);
