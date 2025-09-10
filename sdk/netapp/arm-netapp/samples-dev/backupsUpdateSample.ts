// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patch a Backup under the Backup Vault
 *
 * @summary Patch a Backup under the Backup Vault
 * x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2025-06-01/examples/BackupsUnderBackupVault_Update.json
 */

import {
  BackupPatch,
  BackupsUpdateOptionalParams,
  NetAppManagementClient,
} from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function backupsUnderBackupVaultUpdate(): Promise<void> {
  const subscriptionId =
    process.env["NETAPP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETAPP_RESOURCE_GROUP"] || "myRG";
  const accountName = "account1";
  const backupVaultName = "backupVault1";
  const backupName = "backup1";
  const body: BackupPatch = {};
  const options: BackupsUpdateOptionalParams = { body };
  const credential = new DefaultAzureCredential();
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backups.beginUpdateAndWait(
    resourceGroupName,
    accountName,
    backupVaultName,
    backupName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await backupsUnderBackupVaultUpdate();
}

main().catch(console.error);
