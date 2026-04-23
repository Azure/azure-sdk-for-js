// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides the information of the backed up data identified using RecoveryPointID. This is an asynchronous operation.
 * To know the status of the operation, call the GetProtectedItemOperationResult API.
 *
 * @summary provides the information of the backed up data identified using RecoveryPointID. This is an asynchronous operation.
 * To know the status of the operation, call the GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/RecoveryPoints_Get.json
 */
async function getAzureVmRecoveryPointDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.recoveryPoints.get(
    "rshvault",
    "rshhtestmdvmrg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;rshhtestmdvmrg;rshmdvmsmall",
    "VM;iaasvmcontainerv2;rshhtestmdvmrg;rshmdvmsmall",
    "26083826328862",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAzureVmRecoveryPointDetails();
}

main().catch(console.error);
