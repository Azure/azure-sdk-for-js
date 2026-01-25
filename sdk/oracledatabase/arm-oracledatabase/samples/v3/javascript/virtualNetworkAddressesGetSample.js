// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a VirtualNetworkAddress
 *
 * @summary get a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/VirtualNetworkAddresses_Get_MaximumSet_Gen.json
 */
async function getVirtualNetworkAddressGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAddresses.get(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a VirtualNetworkAddress
 *
 * @summary get a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/VirtualNetworkAddresses_Get_MinimumSet_Gen.json
 */
async function getVirtualNetworkAddressGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAddresses.get(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a VirtualNetworkAddress
 *
 * @summary get a VirtualNetworkAddress
 * x-ms-original-file: 2025-09-01/virtualNetworkAddresses_get.json
 */
async function virtualNetworkAddressesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAddresses.get("rg000", "cluster1", "hostname1");
  console.log(result);
}

async function main() {
  await getVirtualNetworkAddressGeneratedByMaximumSetRule();
  await getVirtualNetworkAddressGeneratedByMinimumSetRule();
  await virtualNetworkAddressesGet();
}

main().catch(console.error);
