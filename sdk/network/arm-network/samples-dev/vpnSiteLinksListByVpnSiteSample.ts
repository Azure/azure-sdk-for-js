// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the vpnSiteLinks in a resource group for a vpn site.
 *
 * @summary Lists all the vpnSiteLinks in a resource group for a vpn site.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/VpnSiteLinkListByVpnSite.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function vpnSiteLinkListByVpnSite(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const vpnSiteName = "vpnSite1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnSiteLinks.listByVpnSite(
    resourceGroupName,
    vpnSiteName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await vpnSiteLinkListByVpnSite();
}

main().catch(console.error);
