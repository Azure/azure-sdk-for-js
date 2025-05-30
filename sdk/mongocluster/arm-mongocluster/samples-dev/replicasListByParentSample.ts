// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the replicas for the mongo cluster.
 *
 * @summary list all the replicas for the mongo cluster.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_ReplicaList.json
 */
async function listTheReplicasLinkedToAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicas.listByParent("TestGroup", "myMongoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheReplicasLinkedToAMongoClusterResource();
}

main().catch(console.error);
