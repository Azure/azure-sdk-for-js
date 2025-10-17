// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an availability set.
 *
 * @summary delete an availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_Delete_MaximumSet_Gen.json
 */
async function availabilitySetDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.availabilitySets.delete("rgcompute", "aaaaaaaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to delete an availability set.
 *
 * @summary delete an availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_Delete_MinimumSet_Gen.json
 */
async function availabilitySetDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.availabilitySets.delete("rgcompute", "aaaaaaaaaaa");
}

async function main() {
  await availabilitySetDeleteMaximumSetGen();
  await availabilitySetDeleteMinimumSetGen();
}

main().catch(console.error);
