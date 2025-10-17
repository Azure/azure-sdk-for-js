// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the capacity reservation groups in the specified resource group. Use the nextLink property in the response to get the next page of capacity reservation groups.
 *
 * @summary lists all of the capacity reservation groups in the specified resource group. Use the nextLink property in the response to get the next page of capacity reservation groups.
 * x-ms-original-file: 2025-04-01/capacityReservationExamples/CapacityReservationGroup_ListByResourceGroup.json
 */
async function listCapacityReservationGroupsInResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capacityReservationGroups.listByResourceGroup("myResourceGroup", {
    expand: "virtualMachines/$ref",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCapacityReservationGroupsInResourceGroup();
}

main().catch(console.error);
