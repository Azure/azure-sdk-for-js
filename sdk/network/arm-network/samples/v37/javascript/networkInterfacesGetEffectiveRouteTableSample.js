// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all route tables applied to a network interface.
 *
 * @summary gets all route tables applied to a network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceEffectiveRouteTableList.json
 */
async function showNetworkInterfaceEffectiveRouteTables() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.getEffectiveRouteTable("rg1", "nic1");
  console.log(result);
}

async function main() {
  await showNetworkInterfaceEffectiveRouteTables();
}

main().catch(console.error);
