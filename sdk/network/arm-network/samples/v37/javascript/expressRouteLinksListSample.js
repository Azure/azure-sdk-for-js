// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource.
 *
 * @summary retrieve the ExpressRouteLink sub-resources of the specified ExpressRoutePort resource.
 * x-ms-original-file: 2025-05-01/ExpressRouteLinkList.json
 */
async function expressRouteLinkGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteLinks.list("rg1", "portName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await expressRouteLinkGet();
}

main().catch(console.error);
