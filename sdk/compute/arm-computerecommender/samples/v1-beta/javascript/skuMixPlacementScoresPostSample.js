// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeRecommenderManagementClient } = require("@azure/arm-computerecommender");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates placement scores for VM SKU mix placement.
 *
 * @summary generates placement scores for VM SKU mix placement.
 * x-ms-original-file: 2026-09-05-preview/GenerateSkuMixPlacementScores.json
 */
async function generatesSkuMixPlacementScoresForVMSKUMixPlacementWithExplicitVMSizes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.skuMixPlacementScores.post("eastus", {
    zones: ["1", "2", "3"],
    capacityProfile: {
      capacity: 10,
      capacityType: "VM",
      priority: "Regular",
      allocationStrategy: "LowestPrice",
      osType: "Linux",
      zoneAllocationPolicy: { distributionStrategy: "BestEffortBalanced" },
    },
    instanceDescription: {
      vmSizes: [
        { name: "Standard_D2s_v3" },
        { name: "Standard_D4s_v3" },
        { name: "Standard_D8s_v3" },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await generatesSkuMixPlacementScoresForVMSKUMixPlacementWithExplicitVMSizes();
}

main().catch(console.error);
