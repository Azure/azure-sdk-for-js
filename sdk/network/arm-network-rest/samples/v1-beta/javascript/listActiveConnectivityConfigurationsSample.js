// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Lists active connectivity configurations in a network manager.
 *
 * @summary Lists active connectivity configurations in a network manager.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerActiveConnectivityConfigurationsList.json
 */
async function listActiveConnectivityConfigurations() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const networkManagerName = "testNetworkManager";
  const options = {
    body: { regions: ["westus"], skipToken: "fakeSkipTokenCode" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkManagers/{networkManagerName}/listActiveConnectivityConfigurations",
      subscriptionId,
      resourceGroupName,
      networkManagerName
    )
    .post(options);
  console.log(result);
}

listActiveConnectivityConfigurations().catch(console.error);
