// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a VPN site link.
 *
 * @summary retrieves the details of a VPN site link.
 * x-ms-original-file: 2025-05-01/VpnSiteLinkGet.json
 */
async function vpnSiteGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vpnSiteLinks.get("rg1", "vpnSite1", "vpnSiteLink1");
  console.log(result);
}

async function main() {
  await vpnSiteGet();
}

main().catch(console.error);
