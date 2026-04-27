// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the status of a triggered validate operation. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of the operation.
 * If operation has completed, this method returns the list of errors obtained while validating the operation.
 *
 * @summary fetches the status of a triggered validate operation. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of the operation.
 * If operation has completed, this method returns the list of errors obtained while validating the operation.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ValidateOperationStatus.json
 */
async function getOperationStatusOfValidateOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.validateOperationStatuses.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getOperationStatusOfValidateOperation();
}

main().catch(console.error);
