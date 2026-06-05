// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops a new region frontload release.
 *
 * @summary stops a new region frontload release.
 * x-ms-original-file: 2024-09-01/NewRegionFrontloadRelease_Stop.json
 */
async function newRegionFrontloadReleaseStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.newRegionFrontloadRelease.stop("Microsoft.Contoso", "2020week10");
}

async function main() {
  await newRegionFrontloadReleaseStop();
}

main().catch(console.error);
