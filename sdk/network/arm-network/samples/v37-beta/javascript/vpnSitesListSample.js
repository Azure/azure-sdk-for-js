// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the VpnSites in a subscription.
 *
 * @summary lists all the VpnSites in a subscription.
 * x-ms-original-file: 2025-05-01/VpnSiteList.json
 */
async function vpnSiteList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnSites.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await vpnSiteList();
}

main().catch(console.error);
