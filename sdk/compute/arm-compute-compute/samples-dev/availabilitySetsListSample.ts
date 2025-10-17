// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all availability sets in a resource group.
 *
 * @summary lists all availability sets in a resource group.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_List_MaximumSet_Gen.json
 */
async function availabilitySetListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilitySets.list("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all availability sets in a resource group.
 *
 * @summary lists all availability sets in a resource group.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_List_MinimumSet_Gen.json
 */
async function availabilitySetListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilitySets.list("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await availabilitySetListMaximumSetGen();
  await availabilitySetListMinimumSetGen();
}

main().catch(console.error);
