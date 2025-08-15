// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkFabricControllerPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates are currently not supported for the Network Fabric Controller resource.
 *
 * @summary Updates are currently not supported for the Network Fabric Controller resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/NetworkFabricControllers_Update_MaximumSet_Gen.json
 */
async function networkFabricControllersUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const networkFabricControllerName = "example-networkController";
  const body: NetworkFabricControllerPatch = {
    infrastructureExpressRouteConnections: [
      {
        expressRouteAuthorizationKey: "xxxxxxx",
        expressRouteCircuitId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName",
      },
    ],
    workloadExpressRouteConnections: [
      {
        expressRouteAuthorizationKey: "xxxxxxx",
        expressRouteCircuitId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.Network/expressRouteCircuits/expressRouteCircuitName",
      },
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkFabricControllers.beginUpdateAndWait(
    resourceGroupName,
    networkFabricControllerName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricControllersUpdateMaximumSetGen();
}

main().catch(console.error);
