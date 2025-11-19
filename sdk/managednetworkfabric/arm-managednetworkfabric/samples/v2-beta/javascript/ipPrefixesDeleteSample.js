// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements IP Prefix DELETE method.
 *
 * @summary implements IP Prefix DELETE method.
 * x-ms-original-file: 2024-06-15-preview/IpPrefixes_Delete.json
 */
async function ipPrefixesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  await client.ipPrefixes.delete("example-rg", "example-ipPrefix");
}

async function main() {
  await ipPrefixesDeleteMaximumSetGen();
}

main().catch(console.error);
