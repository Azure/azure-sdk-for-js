// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to discovers all the containers in the subscription that can be backed up to Recovery Services Vault. This is an
 * asynchronous operation. To know the status of the operation, call GetRefreshOperationResult API.
 *
 * @summary discovers all the containers in the subscription that can be backed up to Recovery Services Vault. This is an
 * asynchronous operation. To know the status of the operation, call GetRefreshOperationResult API.
 * x-ms-original-file: 2026-01-01-preview/Common/RefreshContainers.json
 */
async function triggerAzureVmDiscovery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionContainers.refresh("NetSDKTestRsVault", "SwaggerTestRg", "Azure");
}

async function main(): Promise<void> {
  await triggerAzureVmDiscovery();
}

main().catch(console.error);
