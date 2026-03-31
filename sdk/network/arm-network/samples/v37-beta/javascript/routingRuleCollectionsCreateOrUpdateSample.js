// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a routing rule collection.
 *
 * @summary creates or updates a routing rule collection.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingRuleCollectionPut.json
 */
async function createOrUpdateARoutingRuleCollection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routingRuleCollections.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
    "testRuleCollection",
    {
      description: "A sample policy",
      appliesTo: [
        {
          networkGroupId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager/networkGroups/testGroup",
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateARoutingRuleCollection();
}

main().catch(console.error);
