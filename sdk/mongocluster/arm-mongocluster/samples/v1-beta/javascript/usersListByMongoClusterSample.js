// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the users on a DocumentDB cluster.
 *
 * @summary list all the users on a DocumentDB cluster.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_UserList.json
 */
async function listTheUsersOnADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.users.listByMongoCluster("TestGroup", "myMongoCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheUsersOnADocumentDBClusterResource();
}

main().catch(console.error);
