// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new HorizonDB replica or updates an existing replica.
 *
 * @summary creates a new HorizonDB replica or updates an existing replica.
 * x-ms-original-file: 2026-01-20-preview/Replicas_CreateOrUpdate.json
 */
async function createOrUpdateAHorizonDBReplica(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbReplicas.createOrUpdate(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
    "examplereplica",
    { properties: { role: "Read", availabilityZone: "1" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAHorizonDBReplica();
}

main().catch(console.error);
