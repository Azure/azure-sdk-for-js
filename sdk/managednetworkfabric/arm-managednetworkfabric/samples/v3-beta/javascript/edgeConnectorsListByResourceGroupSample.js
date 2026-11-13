// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists EdgeConnectors by resource group.
 *
 * @summary lists EdgeConnectors by resource group.
 * x-ms-original-file: 2026-01-15-preview/EdgeConnectors_ListByResourceGroup.json
 */
async function edgeConnectorsListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeConnectors.listByResourceGroup("example-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await edgeConnectorsListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
