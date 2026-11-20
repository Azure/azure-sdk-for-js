// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the virtual network connection from a silo.
 *
 * @summary deletes the virtual network connection from a silo.
 * x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_DeleteSiteSiloVnetConnection.json
 */
async function deleteTheVirtualNetworkConnectionOfAWebAppSilo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.siteSiloVirtualNetworkConnections.deleteSiteSiloVnetConnection(
    "testrg123",
    "sitef6141",
    "silo1",
  );
}

async function main() {
  await deleteTheVirtualNetworkConnectionOfAWebAppSilo();
}

main().catch(console.error);
