// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation will resume protection for a stopped backup instance
 *
 * @summary this operation will resume protection for a stopped backup instance
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/ResumeProtection.json
 */
async function resumeProtection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.backupInstances.resumeProtection("testrg", "testvault", "testbi");
}

async function main(): Promise<void> {
  await resumeProtection();
}

main().catch(console.error);
