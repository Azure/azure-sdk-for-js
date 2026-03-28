// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a VpnSite.
 *
 * @summary deletes a VpnSite.
 * x-ms-original-file: 2025-05-01/VpnSiteDelete.json
 */
async function vpnSiteDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.vpnSites.delete("rg1", "vpnSite1");
}

async function main() {
  await vpnSiteDelete();
}

main().catch(console.error);
