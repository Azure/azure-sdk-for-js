// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an private endpoint in the specified resource group.
 *
 * @summary Creates or updates an private endpoint in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointCreate.json
 */

import type { PrivateEndpointsCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createPrivateEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const privateEndpointName = "testPe";
  const options: PrivateEndpointsCreateOrUpdateParameters = {
    body: {
      location: "eastus2euap",
      properties: {
        customNetworkInterfaceName: "testPeNic",
        ipConfigurations: [
          {
            name: "pestaticconfig",
            properties: {
              groupId: "file",
              memberName: "file",
              privateIPAddress: "192.168.0.6",
            },
          },
        ],
        privateLinkServiceConnections: [
          {
            properties: {
              groupIds: ["groupIdFromResource"],
              privateLinkServiceId:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/privateLinkServices/testPls",
              requestMessage: "Please approve my connection.",
            },
          },
        ],
        subnet: {
          id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}",
      subscriptionId,
      resourceGroupName,
      privateEndpointName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPrivateEndpoint().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates an private endpoint in the specified resource group.
 *
 * @summary Creates or updates an private endpoint in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointCreateWithASG.json
 */
async function createPrivateEndpointWithApplicationSecurityGroups(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const privateEndpointName = "testPe";
  const options: PrivateEndpointsCreateOrUpdateParameters = {
    body: {
      location: "eastus2euap",
      properties: {
        applicationSecurityGroups: [
          {
            id: "/subscriptions/subId/resourceGroups/rg1/provders/Microsoft.Network/applicationSecurityGroup/asg1",
          },
        ],
        privateLinkServiceConnections: [
          {
            properties: {
              groupIds: ["groupIdFromResource"],
              privateLinkServiceId:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/privateLinkServices/testPls",
              requestMessage: "Please approve my connection.",
            },
          },
        ],
        subnet: {
          id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}",
      subscriptionId,
      resourceGroupName,
      privateEndpointName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPrivateEndpointWithApplicationSecurityGroups().catch(console.error);
/**
 * This sample demonstrates how to Creates or updates an private endpoint in the specified resource group.
 *
 * @summary Creates or updates an private endpoint in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/PrivateEndpointCreateForManualApproval.json
 */
async function createPrivateEndpointWithManualApprovalConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const privateEndpointName = "testPe";
  const options: PrivateEndpointsCreateOrUpdateParameters = {
    body: {
      location: "eastus",
      properties: {
        customNetworkInterfaceName: "testPeNic",
        ipConfigurations: [
          {
            name: "pestaticconfig",
            properties: {
              groupId: "file",
              memberName: "file",
              privateIPAddress: "192.168.0.5",
            },
          },
        ],
        manualPrivateLinkServiceConnections: [
          {
            properties: {
              groupIds: ["groupIdFromResource"],
              privateLinkServiceId:
                "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/privateLinkServices/testPls",
              requestMessage: "Please manually approve my connection.",
            },
          },
        ],
        subnet: {
          id: "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
        },
      },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateEndpoints/{privateEndpointName}",
      subscriptionId,
      resourceGroupName,
      privateEndpointName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createPrivateEndpointWithManualApprovalConnection().catch(console.error);
