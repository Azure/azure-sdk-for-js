// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a Backup under the Backup Vault
 *
 * @summary Delete a Backup under the Backup Vault
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/BackupsUnderBackupVault_Delete.json
 */

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function backupsUnderBackupVaultDelete(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NETAPP_RESOURCE_GROUP"] || "resourceGroup";
  const accountName = "account1";
  const backupVaultName = "backupVault1";
  const backupName = "backup1";
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backups.beginDeleteAndWait(
    resourceGroupName,
    accountName,
    backupVaultName,
    backupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await backupsUnderBackupVaultDelete();
}

main().catch(console.error);
