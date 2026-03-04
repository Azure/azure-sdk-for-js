// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides a pageable list of all items that are backed up within a vault.
 *
 * @summary provides a pageable list of all items that are backed up within a vault.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/BackupProtectedItems_List.json
 */
async function listProtectedItemsWithBackupManagementTypeFilterAsAzureIaasVm() {
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

async function main() {
  await listProtectedItemsWithBackupManagementTypeFilterAsAzureIaasVm();
}

main().catch(console.error);
