// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to List all effective connectivity configurations applied on a virtual network.
 *
 * @summary List all effective connectivity configurations applied on a virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkManagerEffectiveConnectivityConfigurationsList.json
 */
async function listEffectiveConnectivityConfiguration() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const virtualNetworkName = "testVirtualNetwork";
  const options = {
    body: { skipToken: "FakeSkipTokenCode" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/listNetworkManagerEffectiveConnectivityConfigurations",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName
    )
    .post(options);
  console.log(result);
}

listEffectiveConnectivityConfiguration().catch(console.error);
