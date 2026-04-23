// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the vpnSiteLinks in a resource group for a vpn site.
 *
 * @summary Lists all the vpnSiteLinks in a resource group for a vpn site.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnSiteLinkListByVpnSite.json
 */
async function vpnSiteLinkListByVpnSite() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const vpnSiteName = "vpnSite1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnSiteLinks.listByVpnSite(resourceGroupName, vpnSiteName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await vpnSiteLinkListByVpnSite();
}

main().catch(console.error);
