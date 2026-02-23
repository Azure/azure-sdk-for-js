// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the network manager connectivity configuration in a specified network manager.
 *
 * @summary Lists all the network manager connectivity configuration in a specified network manager.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerConnectivityConfigurationList.json
 */
async function connectivityConfigurationsList() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "myResourceGroup";
  const networkManagerName = "testNetworkManager";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectivityConfigurations.list(
    resourceGroupName,
    networkManagerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await connectivityConfigurationsList();
}

main().catch(console.error);
