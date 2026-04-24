// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a service gateway.
 *
 * @summary Creates or updates a service gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ServiceGatewayCreate.json
 */
async function createServiceGateway() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceGatewayName = "sg";
  const parameters = {
    location: "eastus",
    routeTargetAddress: {
      privateIPAddress: "10.0.1.4",
      privateIPAllocationMethod: "Static",
      subnet: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet/subnets/subnet",
      },
    },
    virtualNetwork: {
      id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualNetworks/vnet",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceGateways.beginCreateOrUpdateAndWait(
    resourceGroupName,
    serviceGatewayName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createServiceGateway();
}

main().catch(console.error);
