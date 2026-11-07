// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a DocumentDB cluster.
 *
 * @summary gets information about a DocumentDB cluster.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_Get.json
 */
async function getsADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.get("TestResourceGroup", "myMongoCluster");
  console.log(result);
}

async function main() {
  await getsADocumentDBClusterResource();
}

main().catch(console.error);
