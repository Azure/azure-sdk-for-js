// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.
 *
 * @summary Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/computeRPCommonExamples/Usage_List_MaximumSet_Gen.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function usageListMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "4_.";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usageOperations.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.
 *
 * @summary Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/computeRPCommonExamples/Usage_List_MinimumSet_Gen.json
 */
async function usageListMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "_--";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usageOperations.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await usageListMaximumSetGen();
  await usageListMinimumSetGen();
}

main().catch(console.error);
