// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeRecommenderManagementClient } = require("@azure/arm-computerecommender");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets SkuMixPlacement scoring metadata.
 *
 * @summary gets SkuMixPlacement scoring metadata.
 * x-ms-original-file: 2026-09-05-preview/GetSkuMixPlacementScores.json
 */
async function getsTheMetadataOfSkuMixPlacementScores() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeRecommenderManagementClient(credential, subscriptionId);
  const result = await client.skuMixPlacementScores.get("eastus");
  console.log(result);
}

async function main() {
  await getsTheMetadataOfSkuMixPlacementScores();
}

main().catch(console.error);
