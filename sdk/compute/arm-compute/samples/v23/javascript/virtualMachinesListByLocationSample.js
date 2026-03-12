// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all the virtual machines under the specified subscription for the specified location.
 *
 * @summary Gets all the virtual machines under the specified subscription for the specified location.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineExamples/VirtualMachine_ListBySubscription_ByLocation.json
 */
async function listsAllTheVirtualMachinesUnderTheSpecifiedSubscriptionForTheSpecifiedLocation() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscriptionId}";
  const location = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachines.listByLocation(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listsAllTheVirtualMachinesUnderTheSpecifiedSubscriptionForTheSpecifiedLocation();
}

main().catch(console.error);
