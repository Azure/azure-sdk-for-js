// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a HorizonDb replica.
 *
 * @summary deletes a HorizonDb replica.
 * x-ms-original-file: 2026-01-20-preview/Replicas_Delete.json
 */
async function deleteAHorizonDbReplica(): Promise<void> {
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
  await deleteAHorizonDbReplica();
}

main().catch(console.error);
