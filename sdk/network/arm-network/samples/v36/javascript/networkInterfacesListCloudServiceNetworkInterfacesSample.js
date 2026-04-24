// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all network interfaces in a cloud service.
 *
 * @summary Gets all network interfaces in a cloud service.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/CloudServiceNetworkInterfaceList.json
 */
async function listCloudServiceNetworkInterfaces() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const cloudServiceName = "cs1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaces.listCloudServiceNetworkInterfaces(
    resourceGroupName,
    cloudServiceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listCloudServiceNetworkInterfaces();
}

main().catch(console.error);
