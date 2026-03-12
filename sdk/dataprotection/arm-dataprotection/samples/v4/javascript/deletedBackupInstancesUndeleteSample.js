// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-07-01/DeletedBackupInstanceOperations/UndeleteDeletedBackupInstance.json
 */
async function undeleteDeletedBackupInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  await client.deletedBackupInstances.undelete("testrg", "testvault", "testbi");
}

async function main() {
  await undeleteDeletedBackupInstance();
}

main().catch(console.error);
