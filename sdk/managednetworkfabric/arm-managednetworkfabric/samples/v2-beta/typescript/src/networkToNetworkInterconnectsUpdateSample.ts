// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update certain properties of the Network To NetworkInterconnects resource.
 *
 * @summary update certain properties of the Network To NetworkInterconnects resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkToNetworkInterconnects_Update.json
 */
async function networkToNetworkInterconnectsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkToNetworkInterconnects.update(
    "example-rg",
    "example-nf",
    "example-nni",
    {
      properties: {
        layer2Configuration: {
          mtu: 1500,
          interfaces: [
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkDevices/example-networkDevice/networkInterfaces/example-networkInterface",
          ],
        },
        optionBLayer3Configuration: {
          primaryIpv4Prefix: "20.0.0.12/29",
          primaryIpv6Prefix: "4FFE:FFFF:0:CD30::a8/127",
          secondaryIpv4Prefix: "20.0.0.14/29",
          secondaryIpv6Prefix: "6FFE:FFFF:0:CD30::ac/127",
          peerASN: 2345,
          vlanId: 1235,
          peLoopbackIpAddress: ["10.0.0.1"],
          bmpConfiguration: { configurationState: "Enabled" },
          prefixLimits: [{ maximumRoutes: 1 }],
        },
        npbStaticRouteConfiguration: {
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          ipv4Routes: [{ prefix: "10.0.0.1/24", nextHop: ["10.0.0.1"] }],
          ipv6Routes: [{ prefix: "fe80::/64", nextHop: ["fe80::1"] }],
        },
        staticRouteConfiguration: {
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          ipv4Routes: [{ prefix: "10.0.0.1", nextHop: ["10.0.0.1"] }],
          ipv6Routes: [{ prefix: "2fff::/64", nextHop: ["3ffe::1"] }],
        },
        importRoutePolicy: {
          importIpv4RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy",
          importIpv6RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy",
        },
        exportRoutePolicy: {
          exportIpv4RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy",
          exportIpv6RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/example-routePolicy",
        },
        ingressAclId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
        egressAclId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
        microBfdState: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkToNetworkInterconnectsUpdateMaximumSetGen();
}

main().catch(console.error);
