// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a InternalNetworks.
 *
 * @summary updates a InternalNetworks.
 * x-ms-original-file: 2024-06-15-preview/InternalNetworks_Update.json
 */
async function internalNetworksUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internalNetworks.update(
    "example-rg",
    "example-l3isd",
    "example-internalnetwork",
    {
      properties: {
        annotation: "annotation",
        mtu: 1500,
        connectedIPv4Subnets: [{ annotation: "annotation", prefix: "10.0.0.0/24" }],
        connectedIPv6Subnets: [{ annotation: "annotation", prefix: "10.0.0.0/24" }],
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
              address: "10.1.0.0",
              bfdAdministrativeState: "Enable",
              bgpAdministrativeState: "Enable",
            },
          ],
          bmpConfiguration: {
            neighborIpExclusions: ["10.0.0.10"],
            bmpConfigurationState: "Enabled",
          },
          v4OverV6BgpSession: "Enabled",
          v6OverV4BgpSession: "Enabled",
        },
        staticRouteConfiguration: {
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          ipv4Routes: [{ prefix: "jffgck", nextHop: ["10.0.0.1"] }],
          ipv6Routes: [{ prefix: "jffgck", nextHop: ["10.0.0.1"] }],
        },
        nativeIpv4PrefixLimit: {
          prefixLimits: [{ maximumRoutes: 24, threshold: 6, idleTimeExpiry: 20 }],
        },
        nativeIpv6PrefixLimit: {
          prefixLimits: [{ maximumRoutes: 24, threshold: 6, idleTimeExpiry: 20 }],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internalNetworksUpdateMaximumSetGen();
}

main().catch(console.error);
