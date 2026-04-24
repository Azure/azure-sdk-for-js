// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the details of a VPN site link.
 *
 * @summary Retrieves the details of a VPN site link.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VpnSiteLinkGet.json
 */
async function vpnSiteGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const vpnSiteName = "vpnSite1";
  const vpnSiteLinkName = "vpnSiteLink1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnSiteLinks.get(resourceGroupName, vpnSiteName, vpnSiteLinkName);
  console.log(result);
}

async function main() {
  await vpnSiteGet();
}

main().catch(console.error);
