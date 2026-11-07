// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a DocumentDB cluster.
 *
 * @summary deletes a DocumentDB cluster.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_Delete.json
 */
async function deletesADocumentDBClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.delete("TestResourceGroup", "myMongoCluster");
}

async function main() {
  await deletesADocumentDBClusterResource();
}

main().catch(console.error);
