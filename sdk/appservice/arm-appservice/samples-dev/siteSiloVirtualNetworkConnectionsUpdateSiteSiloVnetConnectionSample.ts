// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the properties of a virtual network connection on a silo.
 *
 * @summary updates the properties of a virtual network connection on a silo.
 * x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_UpdateSiteSiloVnetConnection.json
 */
async function updateTheVirtualNetworkConnectionOfAWebAppSilo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.siteSiloVirtualNetworkConnections.updateSiteSiloVnetConnection(
    "testrg123",
    "sitef6141",
    "silo1",
    {
      subnetResourceId:
        "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.Network/virtualNetworks/vnet1/subnets/silo-subnet-2",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateTheVirtualNetworkConnectionOfAWebAppSilo();
}

main().catch(console.error);
