// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a network manager routing configuration rule collection.
 *
 * @summary gets a network manager routing configuration rule collection.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingRuleCollectionGet.json
 */
async function getsRoutingRuleCollection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routingRuleCollections.get(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
    "testRuleCollection",
  );
  console.log(result);
}

async function main() {
  await getsRoutingRuleCollection();
}

main().catch(console.error);
