// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the vpnSiteLinks in a resource group for a vpn site.
 *
 * @summary lists all the vpnSiteLinks in a resource group for a vpn site.
 * x-ms-original-file: 2025-05-01/VpnSiteLinkListByVpnSite.json
 */
async function vpnSiteLinkListByVpnSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnSiteLinks.listByVpnSite("rg1", "vpnSite1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await vpnSiteLinkListByVpnSite();
}

main().catch(console.error);
