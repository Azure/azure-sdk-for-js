// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an private endpoint in the specified resource group.
 *
 * @summary creates or updates an private endpoint in the specified resource group.
 * x-ms-original-file: 2025-05-01/PrivateEndpointCreate.json
 */
async function createPrivateEndpoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateEndpoints.createOrUpdate("rg1", "testPe", {
    location: "eastus2euap",
    customNetworkInterfaceName: "testPeNic",
    ipConfigurations: [
      {
        name: "pestaticconfig",
        groupId: "file",
        memberName: "file",
        privateIPAddress: "192.168.0.6",
      },
    ],
    ipVersionType: "IPv4",
    privateLinkServiceConnections: [
      {
        groupIds: ["groupIdFromResource"],
        privateLinkServiceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/privateLinkServices/testPls",
        requestMessage: "Please approve my connection.",
      },
    ],
    subnet: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an private endpoint in the specified resource group.
 *
 * @summary creates or updates an private endpoint in the specified resource group.
 * x-ms-original-file: 2025-05-01/PrivateEndpointCreateForManualApproval.json
 */
async function createPrivateEndpointWithManualApprovalConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateEndpoints.createOrUpdate("rg1", "testPe", {
    location: "eastus",
    customNetworkInterfaceName: "testPeNic",
    ipConfigurations: [
      {
        name: "pestaticconfig",
        groupId: "file",
        memberName: "file",
        privateIPAddress: "192.168.0.5",
      },
    ],
    manualPrivateLinkServiceConnections: [
      {
        groupIds: ["groupIdFromResource"],
        privateLinkServiceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/privateLinkServices/testPls",
        requestMessage: "Please manually approve my connection.",
      },
    ],
    subnet: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an private endpoint in the specified resource group.
 *
 * @summary creates or updates an private endpoint in the specified resource group.
 * x-ms-original-file: 2025-05-01/PrivateEndpointCreateWithASG.json
 */
async function createPrivateEndpointWithApplicationSecurityGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateEndpoints.createOrUpdate("rg1", "testPe", {
    location: "eastus2euap",
    applicationSecurityGroups: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/provders/Microsoft.Network/applicationSecurityGroup/asg1",
      },
    ],
    privateLinkServiceConnections: [
      {
        groupIds: ["groupIdFromResource"],
        privateLinkServiceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/privateLinkServices/testPls",
        requestMessage: "Please approve my connection.",
      },
    ],
    subnet: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
    },
  });
  console.log(result);
}

async function main() {
  await createPrivateEndpoint();
  await createPrivateEndpointWithManualApprovalConnection();
  await createPrivateEndpointWithApplicationSecurityGroups();
}

main().catch(console.error);
