// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeRecommenderManagementClient } from "@azure/arm-computerecommender";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates placement scores for Compute VM skus.
 *
 * @summary generates placement scores for Compute VM skus.
 * x-ms-original-file: 2026-10-05-preview/GenerateComputePlacementScores.json
 */
async function returnsComputeVMPlacementScoresForGivenConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.computePlacementScores.post("eastus", {
    availabilityZones: true,
    desiredCount: 1,
    desiredLocations: ["eastus", "eastus2"],
    desiredSizes: [{ sku: "Standard_D2_v2" }],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to generates placement scores for Compute VM skus.
 *
 * @summary generates placement scores for Compute VM skus.
 * x-ms-original-file: 2026-10-05-preview/GenerateComputePlacementScoresWithoutDesiredLocation.json
 */
async function returnsComputeVMPlacementScoresUsingTheRequestURILocationAsTheDesiredLocationWhenDesiredLocationsIsNotSpecified(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.computePlacementScores.post("eastus", {
    availabilityZones: true,
    desiredCount: 1,
    desiredSizes: [{ sku: "Standard_D2_v2" }],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await returnsComputeVMPlacementScoresForGivenConfigurations();
  await returnsComputeVMPlacementScoresUsingTheRequestURILocationAsTheDesiredLocationWhenDesiredLocationsIsNotSpecified();
}

main().catch(console.error);
