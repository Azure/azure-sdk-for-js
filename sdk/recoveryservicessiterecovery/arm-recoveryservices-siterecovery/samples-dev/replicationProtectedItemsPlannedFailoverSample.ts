// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Operation to initiate a planned failover of the replication protected item.
 *
 * @summary Operation to initiate a planned failover of the replication protected item.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectedItems_PlannedFailover.json
 */

import {
  PlannedFailoverInput,
  SiteRecoveryManagementClient,
} from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function executePlannedFailover(): Promise<void> {
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
  const failoverInput: PlannedFailoverInput = {
    properties: {
      failoverDirection: "PrimaryToRecovery",
      providerSpecificDetails: { instanceType: "HyperVReplicaAzure" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result =
    await client.replicationProtectedItems.beginPlannedFailoverAndWait(
      resourceGroupName,
      resourceName,
      fabricName,
      protectionContainerName,
      replicatedProtectedItemName,
      failoverInput,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await executePlannedFailover();
}

main().catch(console.error);
