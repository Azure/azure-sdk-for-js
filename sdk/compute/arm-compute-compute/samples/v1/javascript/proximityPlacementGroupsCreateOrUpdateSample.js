// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a proximity placement group.
 *
 * @summary create or update a proximity placement group.
 * x-ms-original-file: 2025-04-01/proximityPlacementGroupExamples/ProximityPlacementGroup_CreateOrUpdate.json
 */
async function createOrUpdateAProximityPlacementGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.proximityPlacementGroups.createOrUpdate(
    "myResourceGroup",
    "myProximityPlacementGroup",
    {
      location: "westus",
      zones: ["1"],
      properties: {
        proximityPlacementGroupType: "Standard",
        intent: { vmSizes: ["Basic_A0", "Basic_A2"] },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAProximityPlacementGroup();
}

main().catch(console.error);
