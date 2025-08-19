// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to change the recovery point of a failed over replication protected item.
 *
 * @summary The operation to change the recovery point of a failed over replication protected item.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectedItems_ApplyRecoveryPoint.json
 */

import {
  ApplyRecoveryPointInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function changeOrApplyRecoveryPoint(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "cloud1";
  const protectionContainerName = "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179";
  const replicatedProtectedItemName = "f8491e4f-817a-40dd-a90c-af773978c75b";
  const applyRecoveryPointInput: ApplyRecoveryPointInput = {
    properties: {
      providerSpecificDetails: { instanceType: "HyperVReplicaAzure" },
      recoveryPointId:
        "/Subscriptions/c183865e-6077-46f2-a3b1-deb0f4f4650a/resourceGroups/resourceGroupPS1/providers/Microsoft.RecoveryServices/vaults/vault1/replicationFabrics/cloud1/replicationProtectionContainers/cloud_6d224fc6-f326-5d35-96de-fbf51efb3179/replicationProtectedItems/f8491e4f-817a-40dd-a90c-af773978c75b/recoveryPoints/e4d05fe9-5dfd-47be-b50b-aad306b2802d",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectedItems.beginApplyRecoveryPointAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      replicatedProtectedItemName,
      applyRecoveryPointInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await changeOrApplyRecoveryPoint();
}

main().catch(console.error);
