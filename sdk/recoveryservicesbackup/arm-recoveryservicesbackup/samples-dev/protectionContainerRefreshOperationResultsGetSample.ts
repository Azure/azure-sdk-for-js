// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Provides the result of the refresh operation triggered by the BeginRefresh operation.
 *
 * @summary Provides the result of the refresh operation triggered by the BeginRefresh operation.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/Common/RefreshContainers_OperationResults.json
 */

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function azureVMDiscoveryOperationResult(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "NetSDKTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "SwaggerTestRg";
  const fabricName = "Azure";
  const operationId = "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionContainerRefreshOperationResults.get(
    vaultName,
    resourceGroupName,
    fabricName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await azureVMDiscoveryOperationResult();
}

main().catch(console.error);
