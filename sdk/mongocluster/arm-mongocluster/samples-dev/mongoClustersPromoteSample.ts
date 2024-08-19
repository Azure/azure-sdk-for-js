// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to promotes a replica mongo cluster to a primary role.
 *
 * @summary promotes a replica mongo cluster to a primary role.
 * x-ms-original-file: 2024-07-01/MongoClusters_ForcePromoteReplica.json
 */
async function promotesAReplicaMongoClusterResourceToAPrimaryRole(): void {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.promote(
    "TestGroup",
    "myMongoCluster",
    { promoteOption: "Forced", mode: "Switchover" },
  );
  console.log(result);
}

async function main() {
  promotesAReplicaMongoClusterResourceToAPrimaryRole();
}

main().catch(console.error);
