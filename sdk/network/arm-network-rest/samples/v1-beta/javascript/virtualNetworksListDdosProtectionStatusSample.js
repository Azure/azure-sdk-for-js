// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  {
    // getLongRunningPoller,
    paginate,
  } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets the Ddos Protection Status of all IP Addresses under the Virtual Network
 *
 * @summary Gets the Ddos Protection Status of all IP Addresses under the Virtual Network
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGetDdosProtectionStatus.json
 */
async function getDdosProtectionStatusOfAVirtualNetwork() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options = {
    queryParameters: { top: 75, "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/ddosProtectionStatus",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName
    )
    .post(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getDdosProtectionStatusOfAVirtualNetwork().catch(console.error);
