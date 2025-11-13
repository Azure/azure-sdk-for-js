// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to update certain properties of the L3 Isolation Domain resource.
 *
 * @summary aPI to update certain properties of the L3 Isolation Domain resource.
 * x-ms-original-file: 2024-06-15-preview/L3IsolationDomains_Update.json
 */
async function l3IsolationDomainsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l3IsolationDomains.update("example-rg", "example-l3domain", {
    tags: { KeyId: "KeyValue" },
    properties: {
      annotation: "annotation1",
      redistributeConnectedSubnets: "True",
      redistributeStaticRoutes: "True",
      aggregateRouteConfiguration: {
        ipv4Routes: [{ prefix: "10.0.0.0/24" }],
        ipv6Routes: [{ prefix: "3FFE:FFFF:0:CD30::a0/29" }],
      },
      connectedSubnetRoutePolicy: {
        exportRoutePolicy: {
          exportIpv4RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy",
          exportIpv6RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy",
        },
      },
      staticRouteRoutePolicy: {
        exportRoutePolicy: {
          exportIpv4RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy",
          exportIpv6RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy",
        },
      },
      routePrefixLimit: { hardLimit: 28, threshold: 50 },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await l3IsolationDomainsUpdateMaximumSetGen();
}

main().catch(console.error);
