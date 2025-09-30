// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of backup instances associated with a tracked resource
 *
 * @summary gets a list of backup instances associated with a tracked resource
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/ListBackupInstancesExtensionRouting.json
 */
async function listBackupInstancesAssociatedWithAnAzureResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupInstancesExtensionRouting.list(
    "subscriptions/36d32b25-3dc7-41b0-bde1-397500644591/resourceGroups/testRG/providers/Microsoft.Compute/disks/testDisk",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBackupInstancesAssociatedWithAnAzureResource();
}

main().catch(console.error);
