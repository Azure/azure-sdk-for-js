// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to displays InternalNetworks list by resource group GET method.
 *
 * @summary displays InternalNetworks list by resource group GET method.
 * x-ms-original-file: 2024-06-15-preview/InternalNetworks_ListByL3IsolationDomain.json
 */
async function internalNetworksListByL3IsolationDomainMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.internalNetworks.listByL3IsolationDomain(
    "example-rg",
    "example-l3isd",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await internalNetworksListByL3IsolationDomainMaximumSetGen();
}

main().catch(console.error);
