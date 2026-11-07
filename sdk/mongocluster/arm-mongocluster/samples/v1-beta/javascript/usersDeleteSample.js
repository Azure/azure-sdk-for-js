// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a DocumentDB cluster user.
 *
 * @summary deletes a DocumentDB cluster user.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_UserDelete.json
 */
async function deletesAUserOnADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.users.delete("TestGroup", "myMongoCluster", "uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu");
}

async function main() {
  await deletesAUserOnADocumentDBClusterResource();
}

main().catch(console.error);
