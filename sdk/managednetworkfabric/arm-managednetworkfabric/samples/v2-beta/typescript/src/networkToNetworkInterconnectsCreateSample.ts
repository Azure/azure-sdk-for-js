// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to configuration used to setup CE-PE connectivity PUT Method.
 *
 * @summary configuration used to setup CE-PE connectivity PUT Method.
 * x-ms-original-file: 2024-06-15-preview/NetworkToNetworkInterconnects_Create.json
 */
async function networkToNetworkInterconnectsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkToNetworkInterconnects.create(
    "example-rg",
    "example-nf",
    "example-nni",
    {
      properties: {
        nniType: "CE",
        isManagementType: "True",
        useOptionB: "True",
        layer2Configuration: {
          mtu: 1500,
          interfaces: [
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkDevices/example-networkDevice/networkInterfaces/example-networkInterface",
          ],
        },
        optionBLayer3Configuration: {
          primaryIpv4Prefix: "10.0.0.12/30",
          primaryIpv6Prefix: "4FFE:FFFF:0:CD30::a8/127",
          secondaryIpv4Prefix: "40.0.0.14/30",
          secondaryIpv6Prefix: "6FFE:FFFF:0:CD30::ac/127",
          peerASN: 61234,
          vlanId: 1234,
          peLoopbackIpAddress: ["10.0.0.1"],
          bmpConfiguration: { configurationState: "Enabled" },
          prefixLimits: [{ maximumRoutes: 24 }],
        },
        npbStaticRouteConfiguration: {
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          ipv4Routes: [{ prefix: "jffgck", nextHop: ["10.0.0.1"] }],
          ipv6Routes: [{ prefix: "jffgck", nextHop: ["10.0.0.1"] }],
        },
        staticRouteConfiguration: {
          bfdConfiguration: { intervalInMilliSeconds: 300, multiplier: 10 },
          ipv4Routes: [{ prefix: "jffgck", nextHop: ["10.0.0.1"] }],
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
        conditionalDefaultRouteConfiguration: {
          ipv4Routes: [{ prefix: "10.0.0.1/24", nextHop: ["10.0.0.1"] }],
          ipv6Routes: [{ prefix: "fe08:00/64", nextHop: ["fe01::1"] }],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkToNetworkInterconnectsCreateMaximumSetGen();
}

main().catch(console.error);
