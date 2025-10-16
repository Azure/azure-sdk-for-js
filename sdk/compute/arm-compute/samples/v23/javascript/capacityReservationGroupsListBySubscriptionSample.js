// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.
 *
 * @summary Lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/CapacityReservationGroup_ListBySubscription.json
 */
async function listCapacityReservationGroupsInSubscription() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const expand = "virtualMachines/$ref";
  const options = {
    expand,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacityReservationGroups.listBySubscription(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.
 *
 * @summary Lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/capacityReservationExamples/CapacityReservationGroup_ListBySubscriptionWithResourceIdsQuery.json
 */
async function listCapacityReservationGroupsWithResourceIdsOnlyInSubscription() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceIdsOnly = "All";
  const options = {
    resourceIdsOnly,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacityReservationGroups.listBySubscription(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listCapacityReservationGroupsInSubscription();
  await listCapacityReservationGroupsWithResourceIdsOnlyInSubscription();
}

main().catch(console.error);
