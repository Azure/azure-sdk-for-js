// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a new region frontload release.
 *
 * @summary gets a new region frontload release.
 * x-ms-original-file: 2024-09-01/NewRegionFrontloadRelease_Get.json
 */
async function newRegionFrontloadReleaseGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.newRegionFrontloadRelease.get("Microsoft.Contoso", "2020week10");
  console.log(result);
}

async function main() {
  await newRegionFrontloadReleaseGet();
}

main().catch(console.error);
