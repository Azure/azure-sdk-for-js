// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified Backup under Backup Vault.
 *
 * @summary Get the specified Backup under Backup Vault.
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/BackupsUnderBackupVault_Get.json
 */

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function backupsUnderBackupVaultGet(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const backupVaultName = "backupVault1";
  const backupName = "backup1";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backups.get(
    resourceGroupName,
    accountName,
    backupVaultName,
    backupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await backupsUnderBackupVaultGet();
}

main().catch(console.error);
