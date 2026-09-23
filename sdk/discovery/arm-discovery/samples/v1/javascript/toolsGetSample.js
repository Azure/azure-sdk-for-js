// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Tool
 *
 * @summary get a Tool
 * x-ms-original-file: 2026-06-01/Tools_Get_MaximumSet_Gen.json
 */
async function toolsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.tools.get("rgdiscovery", "1ba7068ab4d3671156");
  console.log(result);
}

async function main() {
  await toolsGetMaximumSet();
}

main().catch(console.error);
