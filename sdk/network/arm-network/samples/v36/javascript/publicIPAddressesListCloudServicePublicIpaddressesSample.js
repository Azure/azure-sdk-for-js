// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets information about all public IP addresses on a cloud service level.
 *
 * @summary Gets information about all public IP addresses on a cloud service level.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/CloudServicePublicIpListAll.json
 */
async function listVmssPublicIP() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "cs-tester";
  const cloudServiceName = "cs1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicIPAddresses.listCloudServicePublicIPAddresses(
    resourceGroupName,
    cloudServiceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listVmssPublicIP();
}

main().catch(console.error);
