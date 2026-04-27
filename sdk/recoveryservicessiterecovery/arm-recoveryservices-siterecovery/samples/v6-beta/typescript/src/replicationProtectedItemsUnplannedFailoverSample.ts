// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to initiate a failover of the replication protected item.
 *
 * @summary operation to initiate a failover of the replication protected item.
 * x-ms-original-file: 2025-08-01/ReplicationProtectedItems_UnplannedFailover.json
 */
async function executeUnplannedFailover(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectedItems.unplannedFailover(
    "resourceGroupPS1",
    "vault1",
    "cloud1",
    "cloud_6d224fc6-f326-5d35-96de-fbf51efb3179",
    "f8491e4f-817a-40dd-a90c-af773978c75b",
    {
      properties: {
        failoverDirection: "PrimaryToRecovery",
        providerSpecificDetails: { instanceType: "HyperVReplicaAzure" },
        sourceSiteOperations: "NotRequired",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await executeUnplannedFailover();
}

main().catch(console.error);
