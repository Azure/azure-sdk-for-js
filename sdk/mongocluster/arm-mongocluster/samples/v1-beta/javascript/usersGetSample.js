// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the defintion of a DocumentDB cluster user.
 *
 * @summary gets the defintion of a DocumentDB cluster user.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_UserGet.json
 */
async function getsAUserOnADocumentDBClusterResource() {
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

async function main() {
  await getsAUserOnADocumentDBClusterResource();
}

main().catch(console.error);
