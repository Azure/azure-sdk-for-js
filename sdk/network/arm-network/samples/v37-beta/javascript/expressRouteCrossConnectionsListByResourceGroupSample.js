// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves all the ExpressRouteCrossConnections in a resource group.
 *
 * @summary retrieves all the ExpressRouteCrossConnections in a resource group.
 * x-ms-original-file: 2025-05-01/ExpressRouteCrossConnectionListByResourceGroup.json
 */
async function expressRouteCrossConnectionListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteCrossConnections.listByResourceGroup(
    "CrossConnection-SiliconValley",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await expressRouteCrossConnectionListByResourceGroup();
}

main().catch(console.error);
