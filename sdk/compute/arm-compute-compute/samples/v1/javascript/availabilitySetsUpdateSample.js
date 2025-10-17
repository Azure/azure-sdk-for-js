// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an availability set.
 *
 * @summary update an availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_Update_MaximumSet_Gen.json
 */
async function availabilitySetUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.availabilitySets.update("rgcompute", "aaaaaaaaaaaaaaaaaaa", {
    properties: {
      platformFaultDomainCount: 2,
      platformUpdateDomainCount: 20,
      virtualMachines: [
        {
          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
        },
      ],
      proximityPlacementGroup: {
        id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
      },
    },
    sku: { name: "DSv3-Type1", tier: "aaa", capacity: 7 },
    tags: { key2574: "aaaaaaaa" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update an availability set.
 *
 * @summary update an availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_Update_MinimumSet_Gen.json
 */
async function availabilitySetUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.availabilitySets.update("rgcompute", "aaaaaaaaaaaaaaaaaaaa", {});
  console.log(result);
}

async function main() {
  await availabilitySetUpdateMaximumSetGen();
  await availabilitySetUpdateMinimumSetGen();
}

main().catch(console.error);
