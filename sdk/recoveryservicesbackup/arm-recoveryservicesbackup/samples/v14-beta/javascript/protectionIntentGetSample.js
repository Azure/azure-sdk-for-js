// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides the details of the protection intent up item. This is an asynchronous operation. To know the status of the operation,
 * call the GetItemOperationResult API.
 *
 * @summary provides the details of the protection intent up item. This is an asynchronous operation. To know the status of the operation,
 * call the GetItemOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureWorkload/BackupProtectionIntent_Get.json
 */
async function getProtectionIntentForAnItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionIntent.get(
    "myVault",
    "myRG",
    "Azure",
    "249D9B07-D2EF-4202-AA64-65F35418564E",
  );
  console.log(result);
}

async function main() {
  await getProtectionIntentForAnItem();
}

main().catch(console.error);
