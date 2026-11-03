// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDB cluster.
 *
 * @summary gets information about a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/Clusters_Get.json
 */
async function getAHorizonDBCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.clusters.get("example-resource-group", "example-cluster");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a HorizonDB cluster.
 *
 * @summary gets information about a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/Clusters_GetAfterPoolCreationOnEmptyCluster.json
 */
async function getAClusterAfterPoolCreationWhileItHadNoExistingPools(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.clusters.get("example-resource-group", "example-cluster");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a HorizonDB cluster.
 *
 * @summary gets information about a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/Clusters_GetMinimumDefaults.json
 */
async function getAMinimumHorizonDBClusterWithMaterializedServiceDefaults(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.clusters.get("example-resource-group", "minimum-defaults");
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDBCluster();
  await getAClusterAfterPoolCreationWhileItHadNoExistingPools();
  await getAMinimumHorizonDBClusterWithMaterializedServiceDefaults();
}

main().catch(console.error);
