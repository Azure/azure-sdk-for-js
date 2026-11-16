// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeRecommenderManagementClient } = require("@azure/arm-computerecommender");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Compute Placement Scores metadata.
 *
 * @summary gets Compute Placement Scores metadata.
 * x-ms-original-file: 2026-10-05-preview/GetComputePlacementScores.json
 */
async function getsTheMetadataOfComputePlacementScores() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.computePlacementScores.get("eastus");
  console.log(result);
}

async function main() {
  await getsTheMetadataOfComputePlacementScores();
}

main().catch(console.error);
