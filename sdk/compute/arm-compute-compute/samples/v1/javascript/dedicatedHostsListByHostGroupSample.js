// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in the response to get the next page of dedicated hosts.
 *
 * @summary lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in the response to get the next page of dedicated hosts.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_ListByHostGroup_MaximumSet_Gen.json
 */
async function dedicatedHostListByHostGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHosts.listByHostGroup(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in the response to get the next page of dedicated hosts.
 *
 * @summary lists all of the dedicated hosts in the specified dedicated host group. Use the nextLink property in the response to get the next page of dedicated hosts.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_ListByHostGroup_MinimumSet_Gen.json
 */
async function dedicatedHostListByHostGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHosts.listByHostGroup("rgcompute", "aaaa")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await dedicatedHostListByHostGroupMaximumSetGen();
  await dedicatedHostListByHostGroupMinimumSetGen();
}

main().catch(console.error);
