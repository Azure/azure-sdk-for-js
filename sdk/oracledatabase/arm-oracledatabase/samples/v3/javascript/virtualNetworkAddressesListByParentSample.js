// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list VirtualNetworkAddress resources by CloudVmCluster
 *
 * @summary list VirtualNetworkAddress resources by CloudVmCluster
 * x-ms-original-file: 2025-09-01/VirtualNetworkAddresses_ListByParent_MaximumSet_Gen.json
 */
async function listVirtualNetworkAddressesByVMClusterGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkAddresses.listByParent(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list VirtualNetworkAddress resources by CloudVmCluster
 *
 * @summary list VirtualNetworkAddress resources by CloudVmCluster
 * x-ms-original-file: 2025-09-01/VirtualNetworkAddresses_ListByParent_MinimumSet_Gen.json
 */
async function listVirtualNetworkAddressesByVMClusterGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkAddresses.listByParent(
    "rgopenapi",
    "Replace this value with a string matching RegExp .*",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualNetworkAddressesByVMClusterGeneratedByMaximumSetRule();
  await listVirtualNetworkAddressesByVMClusterGeneratedByMinimumSetRule();
}

main().catch(console.error);
