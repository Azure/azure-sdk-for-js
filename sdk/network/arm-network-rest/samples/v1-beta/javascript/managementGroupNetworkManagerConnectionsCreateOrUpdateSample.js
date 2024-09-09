// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create a network manager connection on this management group.
 *
 * @summary Create a network manager connection on this management group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerConnectionManagementGroupPut.json
 */
async function createOrUpdateManagementGroupNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const managementGroupId = "managementGroupA";
  const networkManagerConnectionName = "TestNMConnection";
  const options = {
    body: {
      properties: {
        networkManagerId:
          "/subscriptions/subscriptionC/resourceGroup/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager",
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Network/networkManagerConnections/{networkManagerConnectionName}",
      managementGroupId,
      networkManagerConnectionName
    )
    .put(options);
  console.log(result);
}

createOrUpdateManagementGroupNetworkManagerConnection().catch(console.error);
