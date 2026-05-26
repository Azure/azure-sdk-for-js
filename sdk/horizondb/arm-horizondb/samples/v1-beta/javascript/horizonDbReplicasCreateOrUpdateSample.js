// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new HorizonDb replica or updates an existing replica.
 *
 * @summary creates a new HorizonDb replica or updates an existing replica.
 * x-ms-original-file: 2026-01-20-preview/Replicas_CreateOrUpdate.json
 */
async function createOrUpdateAHorizonDbReplica() {
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

async function main() {
  await createOrUpdateAHorizonDbReplica();
}

main().catch(console.error);
