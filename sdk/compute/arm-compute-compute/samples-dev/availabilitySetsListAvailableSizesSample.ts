// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.
 *
 * @summary lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_ListAvailableSizes_MaximumSet_Gen.json
 */
async function availabilitySetListAvailableSizesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilitySets.listAvailableSizes(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaa",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.
 *
 * @summary lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_ListAvailableSizes_MinimumSet_Gen.json
 */
async function availabilitySetListAvailableSizesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilitySets.listAvailableSizes("rgcompute", "aa")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await availabilitySetListAvailableSizesMaximumSetGen();
  await availabilitySetListAvailableSizesMinimumSetGen();
}

main().catch(console.error);
