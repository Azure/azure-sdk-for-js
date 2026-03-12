// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Fetches Operation Result for Prepare Data Move
 *
 * @summary Fetches Operation Result for Prepare Data Move
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/BackupDataMove/PrepareDataMoveOperationResult_Get.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getOperationResultForPrepareDataMove(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "source-rsv";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "sourceRG";
  const operationId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.bMSPrepareDataMoveOperationResult.get(
    vaultName,
    resourceGroupName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getOperationResultForPrepareDataMove();
}

main().catch(console.error);
