// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of backup instances associated with a tracked resource
 *
 * @summary Gets a list of backup instances associated with a tracked resource
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/BackupInstanceOperations/ListBackupInstancesExtensionRouting.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listBackupInstancesAssociatedWithAnAzureResource(): Promise<void> {
  const resourceId =
    "subscriptions/36d32b25-3dc7-41b0-bde1-397500644591/resourceGroups/testRG/providers/Microsoft.Compute/disks/testDisk";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential);
  const resArray = new Array();
  for await (const item of client.backupInstancesExtensionRouting.list(
    resourceId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listBackupInstancesAssociatedWithAnAzureResource();
}

main().catch(console.error);
