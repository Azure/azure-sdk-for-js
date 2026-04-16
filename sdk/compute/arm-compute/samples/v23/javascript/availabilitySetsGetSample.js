// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves information about an availability set.
 *
 * @summary Retrieves information about an availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/availabilitySetExamples/AvailabilitySet_Get_MaximumSet_Gen.json
 */
async function availabilitySetGetMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const availabilitySetName = "aaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.availabilitySets.get(resourceGroupName, availabilitySetName);
  console.log(result);
}

/**
 * This sample demonstrates how to Retrieves information about an availability set.
 *
 * @summary Retrieves information about an availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/availabilitySetExamples/AvailabilitySet_Get_MinimumSet_Gen.json
 */
async function availabilitySetGetMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const availabilitySetName = "aaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.availabilitySets.get(resourceGroupName, availabilitySetName);
  console.log(result);
}

async function main() {
  await availabilitySetGetMaximumSetGen();
  await availabilitySetGetMinimumSetGen();
}

main().catch(console.error);
