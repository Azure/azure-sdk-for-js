// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create isolation domain resources for layer 3 connectivity between compute nodes and for communication with external services .This configuration is applied on the devices only after the creation of networks is completed and isolation domain is enabled.
 *
 * @summary create isolation domain resources for layer 3 connectivity between compute nodes and for communication with external services .This configuration is applied on the devices only after the creation of networks is completed and isolation domain is enabled.
 * x-ms-original-file: 2024-06-15-preview/L3IsolationDomains_Create.json
 */
async function l3IsolationDomainsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.l3IsolationDomains.create("example-rg", "example-l3domain", {
    properties: {
      annotation: "annotation",
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
      networkFabricId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric",
      uniqueRdConfiguration: {},
      routePrefixLimit: { hardLimit: 1, threshold: 90 },
      administrativeState: "Enabled",
    },
    tags: { KeyId: "KeyValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await l3IsolationDomainsCreateMaximumSetGen();
}

main().catch(console.error);
