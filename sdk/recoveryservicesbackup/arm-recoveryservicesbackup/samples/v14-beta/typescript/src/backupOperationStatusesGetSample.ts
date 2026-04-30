// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the status of an operation such as triggering a backup, restore. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of an operation. Some operations
 * create jobs. This method returns the list of jobs when the operation is complete.
 *
 * @summary fetches the status of an operation such as triggering a backup, restore. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of an operation. Some operations
 * create jobs. This method returns the list of jobs when the operation is complete.
 * x-ms-original-file: 2026-01-01-preview/Common/ProtectedItem_Delete_OperationStatus.json
 */
async function getProtectedItemDeleteOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.backupOperationStatuses.get(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProtectedItemDeleteOperationStatus();
}

main().catch(console.error);
