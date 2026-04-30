// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the status of an operation such as triggering a backup, restore. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of the operation. Some operations
 * create jobs. This method returns the list of jobs associated with the operation.
 *
 * @summary fetches the status of an operation such as triggering a backup, restore. The status can be in progress, completed
 * or failed. You can refer to the OperationStatus enum for all the possible states of the operation. Some operations
 * create jobs. This method returns the list of jobs associated with the operation.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectedItemOperationStatus.json
 */
async function getOperationStatusOfProtectedVm(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectedItemOperationStatuses.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getOperationStatusOfProtectedVm();
}

main().catch(console.error);
