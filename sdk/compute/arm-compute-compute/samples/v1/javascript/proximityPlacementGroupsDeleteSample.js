// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a proximity placement group.
 *
 * @summary delete a proximity placement group.
 * x-ms-original-file: 2025-04-01/proximityPlacementGroupExamples/ProximityPlacementGroup_Delete.json
 */
async function deleteAProximityPlacementGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.proximityPlacementGroups.delete("myResourceGroup", "myProximityPlacementGroup");
}

async function main() {
  await deleteAProximityPlacementGroup();
}

main().catch(console.error);
