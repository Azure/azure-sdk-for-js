// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Bookshelf
 *
 * @summary create a Bookshelf
 * x-ms-original-file: 2026-06-01/Bookshelves_CreateOrUpdate_MaximumSet_Gen.json
 */
async function bookshelvesCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.bookshelves.createOrUpdate("rgdiscovery", "899a72bfc67be99cd8", {
    properties: {
      workloadIdentities: { key3650: {} },
      customerManagedKeys: "Enabled",
      keyVaultProperties: {
        keyVaultUri: "https://microsoft.com/a",
        keyName: "picc",
        keyVersion: "bnzaxtmzrsjovfifuizqsfsphspdyc",
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
    tags: { key3815: "lrfxoxtbcgjpokrmtlzvknkcu" },
    location: "uksouth",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await bookshelvesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
