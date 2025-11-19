// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements Internet Gateway Rules list by resource group GET method.
 *
 * @summary implements Internet Gateway Rules list by resource group GET method.
 * x-ms-original-file: 2024-06-15-preview/InternetGatewayRules_ListByResourceGroup.json
 */
async function internetGatewayRulesListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.internetGatewayRules.listByResourceGroup(
    "example-internetGatewayRule",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await internetGatewayRulesListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
