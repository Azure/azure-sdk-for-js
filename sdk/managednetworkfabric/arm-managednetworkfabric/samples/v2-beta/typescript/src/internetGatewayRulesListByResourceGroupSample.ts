// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to implements Internet Gateway Rules list by resource group GET method.
 *
 * @summary implements Internet Gateway Rules list by resource group GET method.
 * x-ms-original-file: 2024-06-15-preview/InternetGatewayRules_ListByResourceGroup.json
 */
async function internetGatewayRulesListByResourceGroupMaximumSetGen(): Promise<void> {
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

async function main(): Promise<void> {
  await internetGatewayRulesListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
