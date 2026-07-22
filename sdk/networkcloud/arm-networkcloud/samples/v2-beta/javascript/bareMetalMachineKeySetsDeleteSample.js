// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the bare metal machine key set of the provided cluster.
 *
 * @summary delete the bare metal machine key set of the provided cluster.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachineKeySets_Delete.json
 */
async function deleteBareMetalMachineKeySetOfCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachineKeySets.delete(
    "resourceGroupName",
    "clusterName",
    "bareMetalMachineKeySetName",
  );
  console.log(result);
}

async function main() {
  await deleteBareMetalMachineKeySetOfCluster();
}

main().catch(console.error);
