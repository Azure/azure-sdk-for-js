// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the replicas for the mongo cluster.
 *
 * @summary list all the replicas for the mongo cluster.
 * x-ms-original-file: 2024-07-01/MongoClusters_ReplicaList.json
 */
async function listTheReplicasLinkedToAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.replicas.listByParent(
    "TestGroup",
    "myMongoCluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listTheReplicasLinkedToAMongoClusterResource();
}

main().catch(console.error);
