// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get all ip configurations in a network interface.
 *
 * @summary Get all ip configurations in a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkInterfaceIPConfigurationList.json
 */
async function networkInterfaceIPConfigurationList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const networkInterfaceName = "nic1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaceIPConfigurations.list(
    resourceGroupName,
    networkInterfaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await networkInterfaceIPConfigurationList();
}

main().catch(console.error);
