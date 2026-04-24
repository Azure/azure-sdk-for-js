// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists NetworkVirtualApplianceConnections under the NVA.
 *
 * @summary Lists NetworkVirtualApplianceConnections under the NVA.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceConnectionList.json
 */
async function networkVirtualApplianceConnectionList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkVirtualApplianceConnections.list(
    resourceGroupName,
    networkVirtualApplianceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await networkVirtualApplianceConnectionList();
}

main().catch(console.error);
