// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a Network Fabric Controller.
 *
 * @summary creates a Network Fabric Controller.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabricControllers_Create.json
 */
async function networkFabricControllersCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabricControllers.create(
    "example-rg",
    "example-networkController",
    {
      properties: {
        annotation: "annotation",
        infrastructureExpressRouteConnections: [
          {
            expressRouteCircuitId:
              "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName",
            expressRouteAuthorizationKey: "xxx-xxx-xxx",
          },
        ],
        workloadExpressRouteConnections: [
          {
            expressRouteCircuitId:
              "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName",
            expressRouteAuthorizationKey: "xxx-xxx-xxx",
          },
        ],
        infrastructureServices: {
          ipv4AddressSpaces: ["172.253.0.0/19"],
          ipv6AddressSpaces: [],
        },
        workloadServices: {
          ipv4AddressSpaces: ["172.253.28.0/22"],
          ipv6AddressSpaces: [],
        },
        managedResourceGroupConfiguration: {
          name: "managedResourceGroupName",
          location: "eastus",
        },
        isWorkloadManagementNetworkEnabled: "True",
        ipv4AddressSpace: "172.253.0.0/19",
        ipv6AddressSpace: "::/60",
        nfcSku: "Standard",
      },
      tags: { keyId: "KeyValue" },
      location: "eastus",
    },
  );
  console.log(result);
}

async function main() {
  await networkFabricControllersCreateMaximumSetGen();
}

main().catch(console.error);
