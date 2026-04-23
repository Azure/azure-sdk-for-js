// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Get the specified network interface in a cloud service.
 *
 * @summary Get the specified network interface in a cloud service.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/CloudServiceNetworkInterfaceGet.json
 */
async function getCloudServiceNetworkInterface() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const cloudServiceName = "cs1";
  const roleInstanceName = "TestVMRole_IN_0";
  const networkInterfaceName = "nic1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkInterfaces.getCloudServiceNetworkInterface(
    resourceGroupName,
    cloudServiceName,
    roleInstanceName,
    networkInterfaceName,
  );
  console.log(result);
}

async function main() {
  await getCloudServiceNetworkInterface();
}

main().catch(console.error);
