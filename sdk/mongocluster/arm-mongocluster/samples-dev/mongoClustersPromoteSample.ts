// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to promotes a replica DocumentDB cluster to a primary role.
 *
 * @summary promotes a replica DocumentDB cluster to a primary role.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_ForcePromoteReplica.json
 */
async function promotesAReplicaDocumentDBClusterResourceToAPrimaryRole(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.promote("TestGroup", "myMongoCluster", {
    promoteOption: "Forced",
    mode: "Switchover",
  });
}

/**
 * This sample demonstrates how to promotes a replica DocumentDB cluster to a primary role.
 *
 * @summary promotes a replica DocumentDB cluster to a primary role.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PlannedPromoteReplica.json
 */
async function promotesAReplicaDocumentDBClusterResourceToAPrimaryRoleWaitingForTheReplicaToCatchUpBeforePromoting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.promote("TestGroup", "myMongoCluster", {
    promoteOption: "Planned",
    mode: "Switchover",
  });
}

async function main(): Promise<void> {
  await promotesAReplicaDocumentDBClusterResourceToAPrimaryRole();
  await promotesAReplicaDocumentDBClusterResourceToAPrimaryRoleWaitingForTheReplicaToCatchUpBeforePromoting();
}

main().catch(console.error);
