// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a Network Fabric Controller.
 *
 * @summary Creates a Network Fabric Controller.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabricControllers_Create_MaximumSet_Gen.json
 */

import type { NetworkFabricController } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkFabricControllersCreateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricControllerName = "example-networkController";
  const body: NetworkFabricController = {
    annotation: "annotation",
    infrastructureExpressRouteConnections: [
      {
        expressRouteAuthorizationKey: "1234ABCD-0A1B-1234-5678-123456ABCDEF",
        expressRouteCircuitId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName",
      },
    ],
    ipv4AddressSpace: "172.253.0.0/19",
    ipv6AddressSpace: "::/60",
    isWorkloadManagementNetworkEnabled: "True",
    location: "eastus",
    managedResourceGroupConfiguration: {
      name: "managedResourceGroupName",
      location: "eastus",
    },
    nfcSku: "Standard",
    workloadExpressRouteConnections: [
      {
        expressRouteAuthorizationKey: "xxxxx",
        expressRouteCircuitId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabricControllers.beginCreateAndWait(
    resourceGroupName,
    networkFabricControllerName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricControllersCreateMaximumSetGen();
}

main().catch(console.error);
