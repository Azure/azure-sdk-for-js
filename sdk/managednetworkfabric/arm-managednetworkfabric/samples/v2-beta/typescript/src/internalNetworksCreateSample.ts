// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates InternalNetwork PUT method.
 *
 * @summary creates InternalNetwork PUT method.
 * x-ms-original-file: 2024-06-15-preview/InternalNetworks_Create.json
 */
async function internalNetworksCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internalNetworks.create(
    "example-rg",
    "example-l3isd",
    "example-internalnetwork",
    {
      properties: {
        annotation: "annotation",
        mtu: 1500,
        connectedIPv4Subnets: [{ annotation: "annotation", prefix: "10.0.0.0/24" }],
        connectedIPv6Subnets: [{ annotation: "annotation", prefix: "3FFE:FFFF:0:CD30::a0/29" }],
        importRoutePolicy: {
          importIpv4RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
          importIpv6RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
        },
        exportRoutePolicy: {
          exportIpv4RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
          exportIpv6RoutePolicyId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/routePolicies/routePolicyName",
        },
        ingressAclId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
        egressAclId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
        isMonitoringEnabled: "True",
        extension: "NoExtension",
        vlanId: 755,
        bgpConfiguration: {
          annotation: "annotation",
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          defaultRouteOriginate: "True",
          allowAS: 10,
          allowASOverride: "Enable",
          peerASN: 61234,
          ipv4ListenRangePrefixes: ["10.1.0.0/25"],
          ipv6ListenRangePrefixes: ["2fff::/66"],
          ipv4NeighborAddress: [
            {
              address: "10.1.0.0",
              bfdAdministrativeState: "Enable",
              bgpAdministrativeState: "Enable",
            },
          ],
          ipv6NeighborAddress: [
            {
              address: "2fff::",
              bfdAdministrativeState: "Enable",
              bgpAdministrativeState: "Enable",
            },
          ],
          bmpConfiguration: {
            neighborIpExclusions: ["10.0.0.1"],
            bmpConfigurationState: "Enabled",
          },
          v4OverV6BgpSession: "Enabled",
          v6OverV4BgpSession: "Enabled",
        },
        staticRouteConfiguration: {
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          ipv4Routes: [{ prefix: "10.0.0.1/24", nextHop: ["10.0.0.1"] }],
          ipv6Routes: [{ prefix: "2fff::/64", nextHop: ["3ffe::1"] }],
          extension: "NoExtension",
        },
        nativeIpv4PrefixLimit: {
          prefixLimits: [{ maximumRoutes: 23, threshold: 7, idleTimeExpiry: 28 }],
        },
        nativeIpv6PrefixLimit: {
          prefixLimits: [{ maximumRoutes: 23, threshold: 7, idleTimeExpiry: 28 }],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internalNetworksCreateMaximumSetGen();
}

main().catch(console.error);
