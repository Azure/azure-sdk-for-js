// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeRecommenderManagementClient } from "@azure/arm-computerecommender";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Spot Placement Scores metadata.
 *
 * @summary gets Spot Placement Scores metadata.
 * x-ms-original-file: 2025-06-05/GetSpotPlacementScores.json
 */
async function getsTheMetadataOfSpotPlacementScores(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.spotPlacementScores.get("eastus");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheMetadataOfSpotPlacementScores();
}

main().catch(console.error);
