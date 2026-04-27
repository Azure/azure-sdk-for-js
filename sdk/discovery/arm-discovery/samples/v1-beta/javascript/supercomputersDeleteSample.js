// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Supercomputer
 *
 * @summary delete a Supercomputer
 * x-ms-original-file: 2026-02-01-preview/Supercomputers_Delete_MaximumSet_Gen.json
 */
async function supercomputersDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  await client.supercomputers.delete("rgdiscovery", "44f7621cf75873fb53");
}

async function main() {
  await supercomputersDeleteMaximumSet();
}

main().catch(console.error);
