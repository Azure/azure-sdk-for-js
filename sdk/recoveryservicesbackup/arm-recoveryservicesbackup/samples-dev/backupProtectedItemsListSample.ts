// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Provides a pageable list of all items that are backed up within a vault.
 *
 * @summary Provides a pageable list of all items that are backed up within a vault.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/AzureIaasVm/BackupProtectedItems_List.json
 */

import {
  BackupProtectedItemsListOptionalParams,
  RecoveryServicesBackupClient,
} from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listProtectedItemsWithBackupManagementTypeFilterAsAzureIaasVM(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "NetSDKTestRsVault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "SwaggerTestRg";
  const filter = "backupManagementType eq 'AzureIaasVM' and itemType eq 'VM'";
  const options: BackupProtectedItemsListOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupProtectedItems.list(
    vaultName,
    resourceGroupName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listProtectedItemsWithBackupManagementTypeFilterAsAzureIaasVM();
}

main().catch(console.error);
