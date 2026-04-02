// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified custom IP prefix in a specified resource group.
 *
 * @summary gets the specified custom IP prefix in a specified resource group.
 * x-ms-original-file: 2025-05-01/CustomIpPrefixGet.json
 */
async function getCustomIPPrefix() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.customIPPrefixes.get("rg1", "test-customipprefix");
  console.log(result);
}

async function main() {
  await getCustomIPPrefix();
}

main().catch(console.error);
