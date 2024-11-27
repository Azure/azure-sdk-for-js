// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { getLongRunningPoller } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Creates or updates a subnet in the specified virtual network.
 *
 * @summary Creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/SubnetCreate.json
 */
async function createSubnet() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const options = {
    body: { properties: { addressPrefix: "10.0.0.0/16" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      subnetName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createSubnet().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a subnet in the specified virtual network.
 *
 * @summary Creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/SubnetCreateWithDelegation.json
 */
async function createSubnetWithADelegation() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const options = {
    body: { properties: { addressPrefix: "10.0.0.0/16" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      subnetName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createSubnetWithADelegation().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a subnet in the specified virtual network.
 *
 * @summary Creates or updates a subnet in the specified virtual network.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/SubnetCreateServiceEndpoint.json
 */
async function createSubnetWithServiceEndpoints() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "subnet-test";
  const virtualNetworkName = "vnetname";
  const subnetName = "subnet1";
  const options = {
    body: {
      properties: {
        addressPrefix: "10.0.0.0/16",
        serviceEndpoints: [{ service: "Microsoft.Storage" }],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
      subnetName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createSubnetWithServiceEndpoints().catch(console.error);
