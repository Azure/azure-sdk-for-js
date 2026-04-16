// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
 *
 * @summary Lists all Network Virtual Appliance Sites in a Network Virtual Appliance resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceSiteList.json
 */
async function listAllNetworkVirtualApplianceSitesForAGivenNetworkVirtualAppliance() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualApplianceSites.list(
    resourceGroupName,
    networkVirtualApplianceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listAllNetworkVirtualApplianceSitesForAGivenNetworkVirtualAppliance();
}

main().catch(console.error);
