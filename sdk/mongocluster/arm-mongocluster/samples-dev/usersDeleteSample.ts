// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a mongo cluster user.
 *
 * @summary deletes a mongo cluster user.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_UserDelete.json
 */
async function deletesAUserOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.users.delete("TestGroup", "myMongoCluster", "uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu");
}

async function main(): Promise<void> {
  await deletesAUserOnAMongoClusterResource();
}

main().catch(console.error);
