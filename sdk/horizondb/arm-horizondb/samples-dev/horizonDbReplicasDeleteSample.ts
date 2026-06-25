// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a HorizonDB replica.
 *
 * @summary deletes a HorizonDB replica.
 * x-ms-original-file: 2026-01-20-preview/Replicas_Delete.json
 */
async function deleteAHorizonDBReplica(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbReplicas.delete(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
    "examplereplica",
  );
}

async function main(): Promise<void> {
  await deleteAHorizonDBReplica();
}

main().catch(console.error);
