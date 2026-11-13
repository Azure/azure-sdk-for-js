// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the virtual network connections of a Web App silo. Returns the singleton virtualNetwork connection when configured, or an empty collection otherwise.
 *
 * @summary lists the virtual network connections of a Web App silo. Returns the singleton virtualNetwork connection when configured, or an empty collection otherwise.
 * x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_ListSiteSiloVnetConnections.json
 */
async function listTheVirtualNetworkConnectionOfAWebAppSilo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.siteSiloVirtualNetworkConnections.listSiteSiloVnetConnections(
    "testrg123",
    "sitef6141",
    "silo1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists the virtual network connections of a Web App silo. Returns the singleton virtualNetwork connection when configured, or an empty collection otherwise.
 *
 * @summary lists the virtual network connections of a Web App silo. Returns the singleton virtualNetwork connection when configured, or an empty collection otherwise.
 * x-ms-original-file: 2026-08-01/SiteSiloVirtualNetworkConnections_ListSiteSiloVnetConnections_Empty.json
 */
async function listVirtualNetworkConnectionsForAWebAppSiloWithoutAConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.siteSiloVirtualNetworkConnections.listSiteSiloVnetConnections(
    "testrg123",
    "sitef6141",
    "silo1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheVirtualNetworkConnectionOfAWebAppSilo();
  await listVirtualNetworkConnectionsForAWebAppSiloWithoutAConnection();
}

main().catch(console.error);
