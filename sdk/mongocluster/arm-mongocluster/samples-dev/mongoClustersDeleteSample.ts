// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a mongo cluster.
 *
 * @summary deletes a mongo cluster.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_Delete.json
 */
async function deletesAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.delete("TestResourceGroup", "myMongoCluster");
}

async function main(): Promise<void> {
  await deletesAMongoClusterResource();
}

main().catch(console.error);
