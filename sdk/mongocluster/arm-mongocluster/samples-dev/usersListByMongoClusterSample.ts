// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the users on a mongo cluster.
 *
 * @summary list all the users on a mongo cluster.
 * x-ms-original-file: 2025-08-01-preview/MongoClusters_UserList.json
 */
async function listTheUsersOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.users.listByMongoCluster("TestGroup", "myMongoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheUsersOnAMongoClusterResource();
}

main().catch(console.error);
