// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates ExternalNetwork PUT method.
 *
 * @summary creates ExternalNetwork PUT method.
 * x-ms-original-file: 2024-06-15-preview/ExternalNetworks_Create.json
 */
async function externalNetworksCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.externalNetworks.create(
    "example-rg",
    "example-externalnetwork",
    "example-ext",
    {
      properties: {
        annotation: "annotation",
        networkToNetworkInterconnectId:
          "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric/networkToNetworkInterconnects/example-nni",
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
        peeringOption: "OptionA",
        optionBProperties: {
          importRouteTargets: ["65046:10039"],
          exportRouteTargets: ["65046:10039"],
          routeTargets: {
            importIpv4RouteTargets: ["65046:10050"],
            importIpv6RouteTargets: ["65046:10050"],
            exportIpv4RouteTargets: ["65046:10050"],
            exportIpv6RouteTargets: ["65046:10050"],
          },
        },
        optionAProperties: {
          primaryIpv4Prefix: "10.1.1.0/30",
          primaryIpv6Prefix: "3FFE:FFFF:0:CD30::a0/126",
          secondaryIpv4Prefix: "10.1.1.4/30",
          secondaryIpv6Prefix: "3FFE:FFFF:0:CD30::a4/126",
          mtu: 1500,
          vlanId: 1001,
          peerASN: 65047,
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          ingressAclId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
          bmpConfiguration: { configurationState: "Enabled" },
          egressAclId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/accessControlLists/example-acl",
          v4OverV6BgpSession: "Enabled",
          v6OverV4BgpSession: "Enabled",
          nativeIpv4PrefixLimit: {
            prefixLimits: [{ maximumRoutes: 14, threshold: 17, idleTimeExpiry: 7 }],
          },
          nativeIpv6PrefixLimit: {
            prefixLimits: [{ maximumRoutes: 14, threshold: 17, idleTimeExpiry: 7 }],
          },
        },
        staticRouteConfiguration: {
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          ipv4Routes: [{ prefix: "10.0.0.1/24", nextHop: ["10.0.0.1"] }],
          ipv6Routes: [{ prefix: "2fff::/64", nextHop: ["3ffe::1"] }],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await externalNetworksCreateMaximumSetGen();
}

main().catch(console.error);
