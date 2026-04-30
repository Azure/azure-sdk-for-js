// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Supercomputer
 *
 * @summary create a Supercomputer
 * x-ms-original-file: 2026-02-01-preview/Supercomputers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function supercomputersCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.supercomputers.createOrUpdate("rgdiscovery", "85fd61f68e7207bbd3", {
    properties: {
      subnetId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/subnet1",
      managementSubnetId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/managementSubnet1",
      outboundType: "LoadBalancer",
      systemSku: "Standard_D4s_v6",
      identities: {
        clusterIdentity: {
          id: "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedid1",
        },
        kubeletIdentity: {
          id: "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.ManagedIdentity/userAssignedIdentities/managedid1",
        },
        workloadIdentities: { key1149: {} },
      },
      customerManagedKeys: "Enabled",
      diskEncryptionSetId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Compute/diskEncryptionSets/diskencryptionset1",
      logAnalyticsClusterId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.OperationalInsights/clusters/cluster1",
    },
    tags: { key5625: "spcjwrxnslfkiqbzdkhhbano" },
    location: "uksouth",
  });
  console.log(result);
}

async function main() {
  await supercomputersCreateOrUpdateMaximumSet();
}

main().catch(console.error);
