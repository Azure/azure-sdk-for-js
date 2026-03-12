// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCreate.json
 */

import type { VirtualNetworksCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createVirtualNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        flowTimeoutInMinutes: 10,
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetwork().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCreateWithBgpCommunities.json
 */
async function createVirtualNetworkWithBgpCommunities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        bgpCommunities: { virtualNetworkCommunity: "12076:20000" },
        subnets: [{ name: "test-1", properties: { addressPrefix: "10.0.0.0/24" } }],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetworkWithBgpCommunities().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCreateSubnetWithDelegation.json
 */
async function createVirtualNetworkWithDelegatedSubnets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksCreateOrUpdateParameters = {
    body: {
      location: "westcentralus",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        subnets: [
          {
            name: "test-1",
            properties: {
              addressPrefix: "10.0.0.0/24",
              delegations: [
                {
                  name: "myDelegation",
                  properties: { serviceName: "Microsoft.Sql/managedInstances" },
                },
              ],
            },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetworkWithDelegatedSubnets().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCreateWithEncryption.json
 */
async function createVirtualNetworkWithEncryption(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        encryption: { enabled: true, enforcement: "AllowUnencrypted" },
        subnets: [{ name: "test-1", properties: { addressPrefix: "10.0.0.0/24" } }],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetworkWithEncryption().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCreateServiceEndpoints.json
 */
async function createVirtualNetworkWithServiceEndpoints(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "vnetTest";
  const virtualNetworkName = "vnet1";
  const options: VirtualNetworksCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        subnets: [
          {
            name: "test-1",
            properties: {
              addressPrefix: "10.0.0.0/16",
              serviceEndpoints: [{ service: "Microsoft.Storage" }],
            },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetworkWithServiceEndpoints().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCreateServiceEndpointPolicy.json
 */
async function createVirtualNetworkWithServiceEndpointsAndServiceEndpointPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "vnetTest";
  const virtualNetworkName = "vnet1";
  const options: VirtualNetworksCreateOrUpdateParameters = {
    body: {
      location: "eastus2euap",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        subnets: [
          {
            name: "test-1",
            properties: {
              addressPrefix: "10.0.0.0/16",
              serviceEndpointPolicies: [
                {
                  id: "/subscriptions/subid/resourceGroups/vnetTest/providers/Microsoft.Network/serviceEndpointPolicies/ServiceEndpointPolicy1",
                },
              ],
              serviceEndpoints: [{ service: "Microsoft.Storage" }],
            },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetworkWithServiceEndpointsAndServiceEndpointPolicy().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCreateSubnet.json
 */
async function createVirtualNetworkWithSubnet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        subnets: [{ name: "test-1", properties: { addressPrefix: "10.0.0.0/24" } }],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetworkWithSubnet().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates a virtual network in the specified resource group.
 *
 * @summary Creates or updates a virtual network in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkCreateSubnetWithAddressPrefixes.json
 */
async function createVirtualNetworkWithSubnetContainingAddressPrefixes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        addressSpace: { addressPrefixes: ["10.0.0.0/16"] },
        subnets: [
          {
            name: "test-2",
            properties: { addressPrefixes: ["10.0.0.0/28", "10.0.1.0/28"] },
          },
        ],
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createVirtualNetworkWithSubnetContainingAddressPrefixes().catch(console.error);
