// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource.
 *
 * @summary Retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRouteLinkList.json
 */
async function expressRouteLinkGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const expressRoutePortName = "portName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteLinks.list(resourceGroupName, expressRoutePortName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await expressRouteLinkGet();
}

main().catch(console.error);
