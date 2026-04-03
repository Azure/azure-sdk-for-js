// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Generate a letter of authorization for the requested ExpressRoutePort resource.
 *
 * @summary Generate a letter of authorization for the requested ExpressRoutePort resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/GenerateExpressRoutePortsLOA.json
 */
async function generateExpressRoutePortLoa() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const expressRoutePortName = "portName";
  const request = {
    customerName: "customerName",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRoutePorts.generateLOA(
    resourceGroupName,
    expressRoutePortName,
    request,
  );
  console.log(result);
}

async function main() {
  await generateExpressRoutePortLoa();
}

main().catch(console.error);
