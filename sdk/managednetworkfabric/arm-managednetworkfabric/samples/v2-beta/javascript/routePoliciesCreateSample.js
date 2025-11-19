// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements Route Policy PUT method.
 *
 * @summary implements Route Policy PUT method.
 * x-ms-original-file: 2024-06-15-preview/RoutePolicies_Create.json
 */
async function routePoliciesCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.routePolicies.create("example-rg", "example-routePolicy", {
    properties: {
      annotation: "annotation",
      defaultAction: "Permit",
      statements: [
        {
          annotation: "annotation",
          sequenceNumber: 7,
          condition: {
            ipCommunityIds: [
              "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipCommunities/example-ipCommunity",
            ],
            ipExtendedCommunityIds: [
              "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/example-ipExtendedCommunity",
            ],
            type: "Or",
            ipPrefixId:
              "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/example-ipPrefix",
          },
          action: {
            localPreference: 20,
            actionType: "Permit",
            ipCommunityProperties: {
              add: {
                ipCommunityIds: [
                  "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipCommunities/example-ipCommunity",
                ],
              },
              delete: {
                ipCommunityIds: [
                  "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipCommunities/example-ipCommunity",
                ],
              },
              set: {
                ipCommunityIds: [
                  "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipCommunities/example-ipCommunity",
                ],
              },
            },
            ipExtendedCommunityProperties: {
              add: {
                ipExtendedCommunityIds: [
                  "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/example-ipExtendedCommunity",
                ],
              },
              delete: {
                ipExtendedCommunityIds: [
                  "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/example-ipExtendedCommunity",
                ],
              },
              set: {
                ipExtendedCommunityIds: [
                  "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/example-ipExtendedCommunity",
                ],
              },
            },
          },
        },
      ],
      networkFabricId:
        "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/networkFabrics/example-fabric",
      addressFamilyType: "IPv4",
      administrativeState: "Enabled",
    },
    tags: { keyId: "keyValue" },
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await routePoliciesCreateMaximumSetGen();
}

main().catch(console.error);
