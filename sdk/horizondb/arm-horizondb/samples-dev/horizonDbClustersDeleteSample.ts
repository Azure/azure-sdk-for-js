// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a HorizonDB cluster.
 *
 * @summary deletes a HorizonDB cluster.
 * x-ms-original-file: 2026-01-20-preview/Clusters_Delete.json
 */
async function deleteAHorizonDBCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbClusters.delete("exampleresourcegroup", "examplecluster");
}

async function main(): Promise<void> {
  await deleteAHorizonDBCluster();
}

main().catch(console.error);
