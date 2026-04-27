// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Bookshelf
 *
 * @summary create a Bookshelf
 * x-ms-original-file: 2026-02-01-preview/Bookshelves_CreateOrUpdate_MaximumSet_Gen.json
 */
async function bookshelvesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelves.createOrUpdate("rgdiscovery", "21b8f5a6a47fa1fdcc", {
    properties: {
      workloadIdentities: { key8334: {} },
      customerManagedKeys: "Enabled",
      keyVaultProperties: {
        keyVaultUri: "https://microsoft.com/a",
        keyName: "tjjzitmclgtahulm",
        keyVersion: "dnoogjozeqlpubvkxwrujbncstsm",
        identityClientId: "00000011-1111-2222-2222-123456789111",
      },
      logAnalyticsClusterId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.OperationalInsights/clusters/cluster1",
      publicNetworkAccess: "Enabled",
      privateEndpointSubnetId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/privateEndpointSubnet1",
      searchSubnetId:
        "/subscriptions/31735C59-6307-4464-8B80-3675223F23D2/providers/Microsoft.Network/virtualNetworks/virtualnetwork1/subnets/searchSubnet1",
    },
    tags: { key782: "hmvugqbu" },
    location: "uksouth",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await bookshelvesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
