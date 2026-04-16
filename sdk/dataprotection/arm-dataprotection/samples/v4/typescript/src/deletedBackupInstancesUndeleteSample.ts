// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-07-01/DeletedBackupInstanceOperations/UndeleteDeletedBackupInstance.json
 */
async function undeleteDeletedBackupInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.deletedBackupInstances.undelete("testrg", "testvault", "testbi");
}

async function main(): Promise<void> {
  await undeleteDeletedBackupInstance();
}

main().catch(console.error);
