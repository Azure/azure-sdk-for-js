// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of a VM scale set instance.
 *
 * @summary gets the status of a VM scale set instance.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_GetInstanceView_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetGetInstanceViewMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.getInstanceView(
    "rgcompute",
    "aaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the status of a VM scale set instance.
 *
 * @summary gets the status of a VM scale set instance.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_GetInstanceView_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetGetInstanceViewMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.getInstanceView(
    "rgcompute",
    "aaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetGetInstanceViewMaximumSetGen();
  await virtualMachineScaleSetGetInstanceViewMinimumSetGen();
}

main().catch(console.error);
