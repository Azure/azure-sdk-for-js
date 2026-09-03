// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to change the recovery point of a failed over replication protected item.
 *
 * @summary the operation to change the recovery point of a failed over replication protected item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_ApplyRecoveryPoint.json
 */
async function changeOrApplyRecoveryPoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.applyRecoveryPoint(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
    {
      properties: {
        providerSpecificDetails: { instanceType: "HyperVReplicaAzure" },
        recoveryPointId:
          "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/cloud1/replicationProtectionContainers/cloud_6d224fc6-f326-5d35-96de-fbf51efb3179/replicationProtectedItems/f8491e4f-817a-40dd-a90c-af773978c75b/recoveryPoints/e4d05fe9-5dfd-47be-b50b-aad306b2802d",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await changeOrApplyRecoveryPoint();
}

main().catch(console.error);
