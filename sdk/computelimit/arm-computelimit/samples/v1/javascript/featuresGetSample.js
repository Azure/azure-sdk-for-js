// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of a compute limit feature.
 *
 * @summary gets the properties of a compute limit feature.
 * x-ms-original-file: 2026-03-20/Features_Get.json
 */
async function getFeature() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74219ad7-63fc-442f-8037-4b43c627c07d";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.features.get("eastus", "VmCategoryQuota");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the properties of a compute limit feature.
 *
 * @summary gets the properties of a compute limit feature.
 * x-ms-original-file: 2026-03-20/Features_Get_SharedLimit.json
 */
async function getSharedLimitFeature() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74219ad7-63fc-442f-8037-4b43c627c07d";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.features.get("eastus", "SharedLimit");
  console.log(result);
}

async function main() {
  await getFeature();
  await getSharedLimitFeature();
}

main().catch(console.error);
