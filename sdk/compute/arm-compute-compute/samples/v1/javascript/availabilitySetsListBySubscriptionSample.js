// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all availability sets in a subscription.
 *
 * @summary lists all availability sets in a subscription.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_ListBySubscription.json
 */
async function listAvailabilitySetsInASubscription() {
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

async function main() {
  await listAvailabilitySetsInASubscription();
}

main().catch(console.error);
