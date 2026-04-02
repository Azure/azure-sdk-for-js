// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the ExpressRoutePort resources in the specified resource group.
 *
 * @summary list all the ExpressRoutePort resources in the specified resource group.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortListByResourceGroup.json
 */
async function expressRoutePortListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRoutePorts.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await expressRoutePortListByResourceGroup();
}

main().catch(console.error);
