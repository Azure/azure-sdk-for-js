// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a proximity placement group.
 *
 * @summary update a proximity placement group.
 * x-ms-original-file: 2025-04-01/proximityPlacementGroupExamples/ProximityPlacementGroup_Patch.json
 */
async function updateAProximityPlacementGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.proximityPlacementGroups.update(
    "myResourceGroup",
    "myProximityPlacementGroup",
    { tags: { additionalProp1: "string" } },
  );
  console.log(result);
}

async function main() {
  await updateAProximityPlacementGroup();
}

main().catch(console.error);
