// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all shared keys of VpnLink connection specified.
 *
 * @summary lists all shared keys of VpnLink connection specified.
 * x-ms-original-file: 2025-05-01/VpnSiteLinkConnectionSharedKeysGet.json
 */
async function vpnSiteLinkConnectionSharedKeysGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vpnLinkConnections.listAllSharedKeys(
    "rg1",
    "gateway1",
    "vpnConnection1",
    "Connection-Link1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await vpnSiteLinkConnectionSharedKeysGet();
}

main().catch(console.error);
