// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists usage stats.
 *
 * @summary lists usage stats.
 * x-ms-original-file: 2025-05-01/VirtualNetworkListUsage.json
 */
async function vnetGetUsage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworks.listUsage("rg1", "vnetName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await vnetGetUsage();
}

main().catch(console.error);
