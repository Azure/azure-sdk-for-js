// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to promotes a replica mongo cluster to a primary role.
 *
 * @summary promotes a replica mongo cluster to a primary role.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_ForcePromoteReplica.json
 */
async function promotesAReplicaMongoClusterResourceToAPrimaryRole() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.promote("TestGroup", "myMongoCluster", {
    promoteOption: "Forced",
    mode: "Switchover",
  });
}

async function main() {
  await promotesAReplicaMongoClusterResourceToAPrimaryRole();
}

main().catch(console.error);
