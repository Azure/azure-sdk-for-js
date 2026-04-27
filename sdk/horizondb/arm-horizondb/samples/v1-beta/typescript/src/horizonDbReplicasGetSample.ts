// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDb replica.
 *
 * @summary gets information about a HorizonDb replica.
 * x-ms-original-file: 2026-01-20-preview/Replicas_Get.json
 */
async function getAHorizonDbReplica(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbReplicas.get(
    "exampleresourcegroup",
    "examplecluster",
    "examplepool",
    "examplereplica",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDbReplica();
}

main().catch(console.error);
