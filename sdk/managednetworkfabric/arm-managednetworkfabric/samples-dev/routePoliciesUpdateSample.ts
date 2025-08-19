// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RoutePolicyPatch } from "@azure/arm-managednetworkfabric";
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to API to update certain properties of the Route Policy resource.
 *
 * @summary API to update certain properties of the Route Policy resource.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/RoutePolicies_Update_MaximumSet_Gen.json
 */
async function routePoliciesUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] || "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const resourceGroupName = process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] || "example-rg";
  const routePolicyName = "example-routePolicy";
  const body: RoutePolicyPatch = {
    statements: [
      {
        action: {
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
          localPreference: 20,
        },
        annotation: "annotation",
        condition: {
          type: "Or",
          ipCommunityIds: [
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipCommunities/example-ipCommunity",
          ],
          ipExtendedCommunityIds: [
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipExtendedCommunities/example-ipExtendedCommunity",
          ],
          ipPrefixId:
            "/subscriptions/1234ABCD-0A1B-1234-5678-123456ABCDEF/resourceGroups/example-rg/providers/Microsoft.ManagedNetworkFabric/ipPrefixes/example-ipPrefix",
        },
        sequenceNumber: 7,
      },
    ],
    tags: { keyID: "keyValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.routePolicies.beginUpdateAndWait(
    resourceGroupName,
    routePolicyName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await routePoliciesUpdateMaximumSetGen();
}

main().catch(console.error);
