// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Supercomputer
 *
 * @summary get a Supercomputer
 * x-ms-original-file: 2026-06-01/Supercomputers_Get_MaximumSet_Gen.json
 */
async function supercomputersGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.supercomputers.get("rgdiscovery", "871f8fdcf046bf0e2f");
  console.log(result);
}

async function main() {
  await supercomputersGetMaximumSet();
}

main().catch(console.error);
