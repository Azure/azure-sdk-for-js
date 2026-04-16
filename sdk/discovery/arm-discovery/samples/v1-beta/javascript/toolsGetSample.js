// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Tool
 *
 * @summary get a Tool
 * x-ms-original-file: 2026-02-01-preview/Tools_Get_MaximumSet_Gen.json
 */
async function toolsGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.tools.get("rgdiscovery", "30ebfda6785888d26f");
  console.log(result);
}

async function main() {
  await toolsGetMaximumSet();
}

main().catch(console.error);
