// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation will resume backups for backup instance
 *
 * @summary this operation will resume backups for backup instance
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/ResumeBackups.json
 */
async function resumeBackups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.resumeBackups("testrg", "testvault", "testbi");
}

async function main(): Promise<void> {
  await resumeBackups();
}

main().catch(console.error);
