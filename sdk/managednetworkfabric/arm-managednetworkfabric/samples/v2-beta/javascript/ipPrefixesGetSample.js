// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements IP Prefix GET method.
 *
 * @summary implements IP Prefix GET method.
 * x-ms-original-file: 2024-06-15-preview/IpPrefixes_Get.json
 */
async function ipPrefixesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.ipPrefixes.get("example-rg", "example-ipPrefix");
  console.log(result);
}

async function main() {
  await ipPrefixesGetMaximumSetGen();
}

main().catch(console.error);
