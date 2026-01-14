// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeMarketplaceClient } from "@azure/arm-edgemarketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-10-01-preview/GenerateAccessToken.json
 */
async function offersGenerateAccessToken(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EdgeMarketplaceClient(credential);
  const result = await client.offers.generateAccessToken(
    "subscriptions/4bed37fd-19a1-4d31-8b44-40267555bec5/resourceGroups/edgemarketplace-rg/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/edgemarketplace-demo",
    "0001-com-ubuntu-pro-jammy",
    {
      deviceVersion: "1.0.18062.1",
      deviceSku: "edge",
      egeMarketPlaceResourceId: "testid",
      edgeMarketPlaceRegion: "EastUS2Euap",
      hypervGeneration: "V2",
      marketPlaceSku: "2022-datacenter-azure-edition-core",
      marketPlaceSkuVersion: "20348.1129.221007",
      publisherName: "ubuntu",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await offersGenerateAccessToken();
}

main().catch(console.error);
