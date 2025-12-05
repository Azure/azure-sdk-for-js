// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create an elastic backup under the elastic Backup Vault
 *
 * @summary create an elastic backup under the elastic Backup Vault
 * x-ms-original-file: 2025-09-01-preview/ElasticBackups_CreateOrUpdate.json
 */
async function elasticBackupsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticBackups.createOrUpdate(
    "myRG",
    "account1",
    "backupVault1",
    "backup1",
    {
      properties: {
        label: "myLabel",
        elasticVolumeResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/elasticAccounts/account1/elasticCapacityPools/pool1/elasticVolumes/volume1",
        snapshotUsage: "UseExistingSnapshot",
        elasticSnapshotResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/elasticAccounts/account1/elasticCapacityPools/pool1/elasticVolumes/volume1/elasticSnapshots/snap1",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticBackupsCreateOrUpdate();
}

main().catch(console.error);
