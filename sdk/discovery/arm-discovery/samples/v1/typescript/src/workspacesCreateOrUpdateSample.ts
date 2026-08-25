// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Workspace
 *
 * @summary create a Workspace
 * x-ms-original-file: 2026-06-01/Workspaces_CreateOrUpdate_MaximumSet_Gen.json
 */
async function workspacesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("rgdiscovery", "a55c900f32bf865be0", {
    properties: {
      supercomputerIds: [
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/resourceGroups/rgdiscovery/providers/Microsoft.Discovery/supercomputers/supercomputer12",
      ],
      workspaceIdentity: {
        id: "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedid1",
      },
      customerManagedKeys: "Enabled",
      keyVaultProperties: {
        keyVaultUri: "https://microsoft.com/a",
        keyName: "cdrnokqonyvfzot",
        keyVersion: "pxfpvedkfuagtnk",
      },
      logAnalyticsClusterId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.OperationalInsights/clusters/cluster1",
      publicNetworkAccess: "Enabled",
      agentSubnetId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/agentSubnet1",
      privateEndpointSubnetId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/privateEndpointSubnet1",
      workspaceSubnetId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/workspaceSubnet1",
    },
    tags: { key8931: "verirbmpdzupxkkeblzfq" },
    location: "uksouth",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
