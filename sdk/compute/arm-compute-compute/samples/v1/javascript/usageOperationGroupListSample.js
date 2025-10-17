// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.
 *
 * @summary gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.
 * x-ms-original-file: 2025-04-01/computeRPCommonExamples/Usage_List_MaximumSet_Gen.json
 */
async function usageListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usageOperationGroup.list("4_.")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.
 *
 * @summary gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.
 * x-ms-original-file: 2025-04-01/computeRPCommonExamples/Usage_List_MinimumSet_Gen.json
 */
async function usageListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usageOperationGroup.list("_--")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await usageListMaximumSetGen();
  await usageListMinimumSetGen();
}

main().catch(console.error);
