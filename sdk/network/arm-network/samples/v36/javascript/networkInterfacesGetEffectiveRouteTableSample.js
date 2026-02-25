// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all route tables applied to a network interface.
 *
 * @summary Gets all route tables applied to a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkInterfaceEffectiveRouteTableList.json
 */
async function showNetworkInterfaceEffectiveRouteTables() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkInterfaceName = "nic1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.beginGetEffectiveRouteTableAndWait(
    resourceGroupName,
    networkInterfaceName,
  );
  console.log(result);
}

async function main() {
  await showNetworkInterfaceEffectiveRouteTables();
}

main().catch(console.error);
