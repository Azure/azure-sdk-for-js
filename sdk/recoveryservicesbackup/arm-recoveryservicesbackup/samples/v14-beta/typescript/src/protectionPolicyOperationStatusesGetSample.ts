// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides the status of the asynchronous operations like backup, restore. The status can be in progress, completed
 * or failed. You can refer to the Operation Status enum for all the possible states of an operation. Some operations
 * create jobs. This method returns the list of jobs associated with operation.
 *
 * @summary provides the status of the asynchronous operations like backup, restore. The status can be in progress, completed
 * or failed. You can refer to the Operation Status enum for all the possible states of an operation. Some operations
 * create jobs. This method returns the list of jobs associated with operation.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectionPolicyOperationStatuses_Get.json
 */
async function getProtectionPolicyOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicyOperationStatuses.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "testPolicy1",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getProtectionPolicyOperationStatus();
}

main().catch(console.error);
