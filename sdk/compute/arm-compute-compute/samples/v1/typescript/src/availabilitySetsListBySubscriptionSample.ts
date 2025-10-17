// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all availability sets in a subscription.
 *
 * @summary lists all availability sets in a subscription.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_ListBySubscription.json
 */
async function listAvailabilitySetsInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilitySets.listBySubscription({
    expand: "virtualMachines\\$ref",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAvailabilitySetsInASubscription();
}

main().catch(console.error);
