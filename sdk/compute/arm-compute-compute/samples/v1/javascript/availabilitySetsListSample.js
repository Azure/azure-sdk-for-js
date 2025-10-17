// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all availability sets in a resource group.
 *
 * @summary lists all availability sets in a resource group.
 * x-ms-original-file: 2025-04-01/availabilitySetExamples/AvailabilitySet_List_MaximumSet_Gen.json
 */
async function availabilitySetListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
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
async function availabilitySetListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilitySets.list("rgcompute")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await availabilitySetListMaximumSetGen();
  await availabilitySetListMinimumSetGen();
}

main().catch(console.error);
