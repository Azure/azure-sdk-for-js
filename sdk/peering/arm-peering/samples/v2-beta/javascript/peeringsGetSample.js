// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing peering with the specified name under the given subscription and resource group.
 *
 * @summary gets an existing peering with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/GetPeering.json
 */
async function getAPeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerings.get("rgName", "peeringName");
  console.log(result);
}

async function main() {
  await getAPeering();
}

main().catch(console.error);
