// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub.
 *
 * @summary Creates a VirtualHub resource if it doesn't exist else updates the existing VirtualHub.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualHubPut.json
 */
async function virtualHubPut() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualHubName = "virtualHub2";
  const virtualHubParameters = {
    addressPrefix: "10.168.0.0/24",
    location: "West US",
    sku: "Basic",
    tags: { key1: "value1" },
    virtualWan: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.Network/virtualWans/virtualWan1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualHubs.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualHubName,
    virtualHubParameters,
  );
  console.log(result);
}

async function main() {
  await virtualHubPut();
}

main().catch(console.error);
