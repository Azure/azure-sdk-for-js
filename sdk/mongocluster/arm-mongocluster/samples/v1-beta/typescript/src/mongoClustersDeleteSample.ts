// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a mongo cluster.
 *
 * @summary deletes a mongo cluster.
 * x-ms-original-file: 2024-07-01/MongoClusters_Delete.json
 */
async function deletesAMongoClusterResource(): void {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.delete(
    "TestResourceGroup",
    "myMongoCluster",
  );
  console.log(result);
}

async function main() {
  deletesAMongoClusterResource();
}

main().catch(console.error);
