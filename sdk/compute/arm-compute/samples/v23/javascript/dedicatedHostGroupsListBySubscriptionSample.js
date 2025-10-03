// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all of the dedicated host groups in the subscription. Use the nextLink property in the response to get the next page of dedicated host groups.
 *
 * @summary Lists all of the dedicated host groups in the subscription. Use the nextLink property in the response to get the next page of dedicated host groups.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/dedicatedHostExamples/DedicatedHostGroup_ListBySubscription_MaximumSet_Gen.json
 */
async function dedicatedHostGroupListBySubscriptionMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHostGroups.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all of the dedicated host groups in the subscription. Use the nextLink property in the response to get the next page of dedicated host groups.
 *
 * @summary Lists all of the dedicated host groups in the subscription. Use the nextLink property in the response to get the next page of dedicated host groups.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/dedicatedHostExamples/DedicatedHostGroup_ListBySubscription_MinimumSet_Gen.json
 */
async function dedicatedHostGroupListBySubscriptionMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dedicatedHostGroups.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await dedicatedHostGroupListBySubscriptionMaximumSetGen();
  await dedicatedHostGroupListBySubscriptionMinimumSetGen();
}

main().catch(console.error);
