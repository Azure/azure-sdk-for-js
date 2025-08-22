// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets information about a mongo cluster.
 *
 * @summary gets information about a mongo cluster.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_Get.json
 */

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

async function getsAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.get("TestResourceGroup", "myMongoCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAMongoClusterResource();
}

main().catch(console.error);
