// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to rehydrate recovery point for restore for a BackupInstance
 *
 * @summary rehydrate recovery point for restore for a BackupInstance
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/TriggerRehydrate.json
 */
async function triggerRehydrate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.triggerRehydrate(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
    {
      recoveryPointId: "hardcodedRP",
      rehydrationPriority: "High",
      rehydrationRetentionDuration: "7D",
    },
  );
}

async function main(): Promise<void> {
  await triggerRehydrate();
}

main().catch(console.error);
