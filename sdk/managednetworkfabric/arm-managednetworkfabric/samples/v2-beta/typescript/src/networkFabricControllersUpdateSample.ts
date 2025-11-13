// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates are currently not supported for the Network Fabric Controller resource.
 *
 * @summary updates are currently not supported for the Network Fabric Controller resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabricControllers_Update.json
 */
async function networkFabricControllersUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabricControllers.update(
    "example-rg",
    "example-networkController",
    {
      tags: { keyId: "KeyValue" },
      properties: {
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
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricControllersUpdateMaximumSetGen();
}

main().catch(console.error);
