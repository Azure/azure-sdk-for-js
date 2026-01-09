// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list and describe all Backup Vaults in the NetApp account.
 *
 * @summary list and describe all Backup Vaults in the NetApp account.
 * x-ms-original-file: 2025-09-01-preview/BackupVaults_List.json
 */
async function backupVaultsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupVaults.listByNetAppAccount("myRG", "account1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await backupVaultsList();
}

main().catch(console.error);
