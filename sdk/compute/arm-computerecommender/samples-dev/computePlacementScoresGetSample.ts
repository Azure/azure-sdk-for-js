// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeRecommenderManagementClient } from "@azure/arm-computerecommender";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Compute Placement Scores metadata.
 *
 * @summary gets Compute Placement Scores metadata.
 * x-ms-original-file: 2026-10-05-preview/GetComputePlacementScores.json
 */
async function getsTheMetadataOfComputePlacementScores(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.computePlacementScores.get("eastus");
  console.log(result);
}

async function main(): Promise<void> {
  await getsTheMetadataOfComputePlacementScores();
}

main().catch(console.error);
