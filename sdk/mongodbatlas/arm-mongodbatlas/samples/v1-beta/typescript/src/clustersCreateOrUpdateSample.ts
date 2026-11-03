// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AtlasClient } from "@azure/arm-mongodbatlas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Cluster
 *
 * @summary create a Cluster
 * x-ms-original-file: 2026-03-01-preview/Clusters_CreateOrUpdate_MaximumSet_Gen.json
 */
async function clustersCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1E4BD993-6890-4E69-8966-81482D7502EF";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate(
    "rgopenapi",
    "myOrganization",
    "myProject",
    "myCluster",
    { properties: { clusterTier: "FREE", regionName: "eastus" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clustersCreateOrUpdateMaximumSet();
}

main().catch(console.error);
