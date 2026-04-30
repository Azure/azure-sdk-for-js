// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides the result of the refresh operation triggered by the BeginRefresh operation.
 *
 * @summary provides the result of the refresh operation triggered by the BeginRefresh operation.
 * x-ms-original-file: 2026-01-01-preview/Common/RefreshContainers_OperationResults.json
 */
async function azureVmDiscoveryOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionContainerRefreshOperationResults.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "Azure",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main(): Promise<void> {
  await azureVmDiscoveryOperationResult();
}

main().catch(console.error);
