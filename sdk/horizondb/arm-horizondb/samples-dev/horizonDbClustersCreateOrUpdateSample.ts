// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new HorizonDb cluster or updates an existing cluster.
 *
 * @summary creates a new HorizonDb cluster or updates an existing cluster.
 * x-ms-original-file: 2026-01-20-preview/Clusters_CreateOrUpdate.json
 */
async function createOrUpdateAHorizonDbCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbClusters.createOrUpdate(
    "exampleresourcegroup",
    "examplecluster",
    {
      location: "westus2",
      tags: { env: "dev" },
      properties: {
        createMode: "Create",
        sourceClusterResourceId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/examplesourceresourcegroup/providers/Microsoft.HorizonDb/clusters/examplesourcecluster",
        version: "17",
        administratorLogin: "exampleadministratorlogin",
        administratorLoginPassword: "examplepassword",
        vCores: 4,
        replicaCount: 2,
        zonePlacementPolicy: "Strict",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAHorizonDbCluster();
}

main().catch(console.error);
