// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing HorizonDB replica (e.g., role).
 *
 * @summary updates an existing HorizonDB replica (e.g., role).
 * x-ms-original-file: 2026-01-20-preview/Replicas_Update.json
 */
async function updateAHorizonDBReplica(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbReplicas.update(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
    "examplereplica",
    { properties: { role: "ReadWrite" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAHorizonDBReplica();
}

main().catch(console.error);
