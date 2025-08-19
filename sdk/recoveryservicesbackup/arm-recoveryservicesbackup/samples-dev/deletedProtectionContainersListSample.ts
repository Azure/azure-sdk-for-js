// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the soft deleted containers registered to Recovery Services Vault.
 *
 * @summary Lists the soft deleted containers registered to Recovery Services Vault.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/AzureStorage/SoftDeletedContainers_List.json
 */

import {
  DeletedProtectionContainersListOptionalParams,
  RecoveryServicesBackupClient,
} from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listBackupProtectionContainers(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "testRg";
  const vaultName = "testVault";
  const filter = "backupManagementType eq 'AzureWorkload'";
  const options: DeletedProtectionContainersListOptionalParams = { filter };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedProtectionContainers.list(
    resourceGroupName,
    vaultName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listBackupProtectionContainers();
}

main().catch(console.error);
