// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables a compute limit feature for the subscription at the specified location.
 *
 * @summary enables a compute limit feature for the subscription at the specified location.
 * x-ms-original-file: 2026-03-20/Features_Enable.json
 */
async function enableFeature() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74219ad7-63fc-442f-8037-4b43c627c07d";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.features.enable("eastus", "VmCategoryQuota");
  console.log(result);
}

async function main() {
  await enableFeature();
}

main().catch(console.error);
