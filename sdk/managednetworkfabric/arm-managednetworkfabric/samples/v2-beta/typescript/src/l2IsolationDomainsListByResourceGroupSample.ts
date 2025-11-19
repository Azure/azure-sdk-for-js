// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to displays L2IsolationDomains list by resource group GET method.
 *
 * @summary displays L2IsolationDomains list by resource group GET method.
 * x-ms-original-file: 2024-06-15-preview/L2IsolationDomains_ListByResourceGroup.json
 */
async function l2IsolationDomainsListByResourceGroupMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.l2IsolationDomains.listByResourceGroup("example-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await l2IsolationDomainsListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
