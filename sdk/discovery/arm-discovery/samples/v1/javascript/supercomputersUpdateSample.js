// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Supercomputer
 *
 * @summary update a Supercomputer
 * x-ms-original-file: 2026-06-01/Supercomputers_Update_MaximumSet_Gen.json
 */
async function supercomputersUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.supercomputers.update("rgdiscovery", "1d951e48d0e7383455", {
    properties: { identities: { workloadIdentities: { key7289: {} } } },
    tags: { key40: "guakqh" },
  });
  console.log(result);
}

async function main() {
  await supercomputersUpdateMaximumSet();
}

main().catch(console.error);
