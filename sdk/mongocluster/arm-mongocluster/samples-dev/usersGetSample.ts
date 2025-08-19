// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to gets the defintion of a Mongo cluster user.
 *
 * @summary gets the defintion of a Mongo cluster user.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_UserGet.json
 */

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

async function getsAUserOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.users.get(
    "TestGroup",
    "myMongoCluster",
    "uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAUserOnAMongoClusterResource();
}

main().catch(console.error);
