// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeRecommenderManagementClient } = require("@azure/arm-computerecommender");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates placement scores for Spot VM skus.
 *
 * @summary generates placement scores for Spot VM skus.
 * x-ms-original-file: 2025-06-05/GenerateSpotPlacementScores.json
 */
async function returnsSpotVMPlacementScoresForGivenConfigurations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.spotPlacementScores.post("eastus", {
    availabilityZones: true,
    desiredCount: 1,
    desiredLocations: ["eastus", "eastus2"],
    desiredSizes: [{ sku: "Standard_D2_v2" }],
  });
  console.log(result);
}

async function main() {
  await returnsSpotVMPlacementScoresForGivenConfigurations();
}

main().catch(console.error);
