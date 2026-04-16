// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeRecommenderManagementClient } = require("@azure/arm-computerecommender");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Spot Placement Scores metadata.
 *
 * @summary gets Spot Placement Scores metadata.
 * x-ms-original-file: 2025-06-05/GetSpotPlacementScores.json
 */
async function getsTheMetadataOfSpotPlacementScores() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.spotPlacementScores.get("eastus");
  console.log(result);
}

async function main() {
  await getsTheMetadataOfSpotPlacementScores();
}

main().catch(console.error);
