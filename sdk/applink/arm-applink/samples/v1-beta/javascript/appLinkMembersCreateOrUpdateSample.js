// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppLinkClient } = require("@azure/arm-applink");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create an AppLinkMember.
 *
 * @summary create an AppLinkMember.
 * x-ms-original-file: 2025-08-01-preview/AppLinkMembers_CreateOrUpdate.json
 */
async function appLinkMembersCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const result = await client.appLinkMembers.createOrUpdate(
    "test_rg",
    "applink-test-01",
    "member-01",
    {
      properties: {
        clusterType: "AKS",
        metadata: {
          resourceId:
            "/subscriptions/bc7e0da9-5e4c-4a91-9252-9658837006cf/resourcegroups/applink-rg/providers/Microsoft.ContainerService/managedClusters/applink-member1",
        },
        upgradeProfile: {
          mode: "FullyManaged",
          fullyManagedUpgradeProfile: { releaseChannel: "Stable" },
        },
        connectivityProfile: {
          privateConnect: {
            subnetResourceId:
              "/subscriptions/bc7e0da9-5e4c-4a91-9252-9658837006cf/resourceGroups/applink-vnet-rg/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/subnet1",
          },
          eastWestGateway: { visibility: "Internal" },
        },
      },
      tags: { key2913: "test_tag" },
      location: "westus2",
    },
  );
  console.log(result);
}

async function main() {
  await appLinkMembersCreateOrUpdate();
}

main().catch(console.error);
