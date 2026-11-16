// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the status of the fabric level asynchronous operation identified by the given operation id. The status
 * can be in progress, completed or failed. You can refer to the OperationStatus enum for all the possible states of
 * an operation. This is the endpoint reported in the Azure-AsyncOperation header of the fabric level operations
 * that start one, such as RefreshContainers and GetRPExtendedInfo.
 *
 * @summary fetches the status of the fabric level asynchronous operation identified by the given operation id. The status
 * can be in progress, completed or failed. You can refer to the OperationStatus enum for all the possible states of
 * an operation. This is the endpoint reported in the Azure-AsyncOperation header of the fabric level operations
 * that start one, such as RefreshContainers and GetRPExtendedInfo.
 * x-ms-original-file: 2026-10-01/Common/RefreshContainers_OperationStatus.json
 */
async function getFabricLevelOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionContainerRefreshOperationStatuses.get(
    "SwaggerTestRg",
    "NetSDKTestRsVault",
    "Azure",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getFabricLevelOperationStatus();
}

main().catch(console.error);
