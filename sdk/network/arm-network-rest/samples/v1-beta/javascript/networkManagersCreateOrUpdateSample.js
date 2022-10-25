// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates or updates a Network Manager.
 *
 * @summary Creates or updates a Network Manager.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerPut.json
 */
async function putNetworkManager() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkManagerName = "TestNetworkManager";
  const options = {
    body: {
      properties: {
        description: "My Test Network Manager",
        networkManagerScopeAccesses: ["Connectivity"],
        networkManagerScopes: {
          managementGroups: ["/Microsoft.Management/testmg"],
          subscriptions: ["/subscriptions/00000000-0000-0000-0000-000000000000"],
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}",
      subscriptionId,
      resourceGroupName,
      networkManagerName
    )
    .put(options);
  console.log(result);
}

putNetworkManager().catch(console.error);
