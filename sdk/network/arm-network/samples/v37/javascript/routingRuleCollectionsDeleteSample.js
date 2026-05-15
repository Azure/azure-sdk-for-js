// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an routing rule collection.
 *
 * @summary deletes an routing rule collection.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingRuleCollectionDelete.json
 */
async function deletesAnRoutingRuleCollection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.routingRuleCollections.delete(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
    "testRuleCollection",
  );
}

async function main() {
  await deletesAnRoutingRuleCollection();
}

main().catch(console.error);
