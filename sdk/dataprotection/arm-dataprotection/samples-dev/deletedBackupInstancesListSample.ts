// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets deleted backup instances belonging to a backup vault
 *
 * @summary Gets deleted backup instances belonging to a backup vault
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/DeletedBackupInstanceOperations/ListDeletedBackupInstances.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listDeletedBackupInstancesInAVault(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "000pikumar";
  const vaultName = "PratikPrivatePreviewVault1";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedBackupInstances.list(
    resourceGroupName,
    vaultName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDeletedBackupInstancesInAVault();
}

main().catch(console.error);
