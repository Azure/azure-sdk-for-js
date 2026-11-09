// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a DocumentDB cluster.
 *
 * @summary deletes a DocumentDB cluster.
 * x-ms-original-file: 2026-06-15-preview/MongoClusters_Delete.json
 */
async function deletesADocumentDBClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.delete("TestResourceGroup", "myMongoCluster");
}

async function main(): Promise<void> {
  await deletesADocumentDBClusterResource();
}

main().catch(console.error);
