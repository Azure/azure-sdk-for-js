// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to promotes a replica mongo cluster to a primary role.
 *
 * @summary promotes a replica mongo cluster to a primary role.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_ForcePromoteReplica.json
 */
async function promotesAReplicaMongoClusterResourceToAPrimaryRole(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.promote("TestGroup", "myMongoCluster", {
    promoteOption: "Forced",
    mode: "Switchover",
  });
}

/**
 * This sample demonstrates how to promotes a replica mongo cluster to a primary role.
 *
 * @summary promotes a replica mongo cluster to a primary role.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_PlannedPromoteReplica.json
 */
async function promotesAReplicaMongoClusterResourceToAPrimaryRoleWaitingForTheReplicaToCatchUpBeforePromoting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.promote("TestGroup", "myMongoCluster", {
    promoteOption: "Planned",
    mode: "Switchover",
  });
}

async function main(): Promise<void> {
  await promotesAReplicaMongoClusterResourceToAPrimaryRole();
  await promotesAReplicaMongoClusterResourceToAPrimaryRoleWaitingForTheReplicaToCatchUpBeforePromoting();
}

main().catch(console.error);
