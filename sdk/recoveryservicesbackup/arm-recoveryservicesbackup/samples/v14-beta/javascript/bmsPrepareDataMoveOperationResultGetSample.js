// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches operation status for data move operation on vault
 *
 * @summary fetches operation status for data move operation on vault
 * x-ms-original-file: 2026-01-01-preview/BackupDataMove/PrepareDataMoveOperationResult_Get.json
 */
async function getOperationResultForPrepareDataMove() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.bmsPrepareDataMoveOperationResult.get(
    "source-rsv",
    "sourceRG",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await getOperationResultForPrepareDataMove();
}

main().catch(console.error);
