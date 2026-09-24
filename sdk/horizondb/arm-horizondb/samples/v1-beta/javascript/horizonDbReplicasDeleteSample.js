// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a HorizonDB replica.
 *
 * @summary deletes a HorizonDB replica.
 * x-ms-original-file: 2026-05-01-preview/Replicas_Delete.json
 */
async function deleteAHorizonDBReplica() {
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

async function main() {
  await deleteAHorizonDBReplica();
}

main().catch(console.error);
