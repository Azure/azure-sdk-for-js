// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.
 *
 * @summary lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_ListBySubscription.json
 */
async function listCapacityReservationGroupsInSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacityReservationGroups.listBySubscription({
    expand: "virtualMachines/$ref",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.
 *
 * @summary lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_ListBySubscriptionWithResourceIdsQuery.json
 */
async function listCapacityReservationGroupsWithResourceIdsOnlyInSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacityReservationGroups.listBySubscription({
    resourceIdsOnly: "All",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCapacityReservationGroupsInSubscription();
  await listCapacityReservationGroupsWithResourceIdsOnlyInSubscription();
}

main().catch(console.error);
