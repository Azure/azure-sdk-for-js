// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements External Networks list by resource group GET method.
 *
 * @summary implements External Networks list by resource group GET method.
 * x-ms-original-file: 2024-06-15-preview/ExternalNetworks_ListByL3IsolationDomain.json
 */
async function externalNetworksListByL3IsolationDomainMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.externalNetworks.listByL3IsolationDomain(
    "example-rg",
    "example-externalnetwork",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await externalNetworksListByL3IsolationDomainMaximumSetGen();
}

main().catch(console.error);
