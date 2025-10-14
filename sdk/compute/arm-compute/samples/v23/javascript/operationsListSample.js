// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List the operations for the provider
 *
 * @summary List the operations for the provider
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/computeRPCommonExamples/Operations_List_MaximumSet_Gen.json
 */
async function operationsListMaximumSetGen() {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List the operations for the provider
 *
 * @summary List the operations for the provider
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/computeRPCommonExamples/Operations_List_MinimumSet_Gen.json
 */
async function operationsListMinimumSetGen() {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await operationsListMaximumSetGen();
  await operationsListMinimumSetGen();
}

main().catch(console.error);
