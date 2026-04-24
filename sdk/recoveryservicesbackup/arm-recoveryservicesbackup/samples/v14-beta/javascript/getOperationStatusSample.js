// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches Operation Result for Prepare Data Move
 *
 * @summary fetches Operation Result for Prepare Data Move
 * x-ms-original-file: 2026-01-01-preview/BackupDataMove/BackupDataMoveOperationStatus_Get.json
 */
async function getOperationStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.getOperationStatus(
    "source-rsv",
    "sourceRG",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await getOperationStatus();
}

main().catch(console.error);
