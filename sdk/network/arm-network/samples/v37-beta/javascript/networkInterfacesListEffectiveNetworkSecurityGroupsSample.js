// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all network security groups applied to a network interface.
 *
 * @summary gets all network security groups applied to a network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceEffectiveNSGList.json
 */
async function listNetworkInterfaceEffectiveNetworkSecurityGroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.listEffectiveNetworkSecurityGroups("rg1", "nic1");
  console.log(result);
}

async function main() {
  await listNetworkInterfaceEffectiveNetworkSecurityGroups();
}

main().catch(console.error);
