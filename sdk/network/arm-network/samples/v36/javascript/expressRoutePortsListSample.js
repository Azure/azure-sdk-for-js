// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all the ExpressRoutePort resources in the specified subscription.
 *
 * @summary List all the ExpressRoutePort resources in the specified subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ExpressRoutePortList.json
 */
async function expressRoutePortList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRoutePorts.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await expressRoutePortList();
}

main().catch(console.error);
