// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a backup instances belonging to a backup vault
 *
 * @summary gets a backup instances belonging to a backup vault
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/ListBackupInstances.json
 */
async function listBackupInstancesInAVault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupInstances.list(
    "000pikumar",
    "PratikPrivatePreviewVault1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBackupInstancesInAVault();
}

main().catch(console.error);
