// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to provides a pageable list of all items that are backed up within a vault.
 *
 * @summary provides a pageable list of all items that are backed up within a vault.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/BackupProtectedItems_List.json
 */
async function listProtectedItemsWithBackupManagementTypeFilterAsAzureIaasVm(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupProtectedItems.list("NetSDKTestRsVault", "SwaggerTestRg", {
    filter: "backupManagementType eq 'AzureIaasVM' and itemType eq 'VM'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listProtectedItemsWithBackupManagementTypeFilterAsAzureIaasVm();
}

main().catch(console.error);
