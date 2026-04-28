// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a virtual machine scale set lifecycle hook event.
 *
 * @summary the operation to update a virtual machine scale set lifecycle hook event.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetLifeCycleHookEvent_Update.json
 */
async function theOperationToUpdateTheVirtualMachineScaleSetLifecycleHookEvent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2167b012-c9f9-4b04-83b2-0ff304e7d51d";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetLifeCycleHookEvents.update(
    "RG01",
    "VMSS01",
    "445c0a08-cfc5-4ef6-bb89-fe77c5178628",
    {
      waitUntil: "2025-05-08T11:17:55.6844555+00:00",
      targetResources: [
        {
          resource: {
            id: "/subscriptions/2167b012-c9f9-4b04-83b2-0ff304e7d51d/resourceGroups/RG01/providers/Microsoft.Compute/virtualMachineScaleSets/VMSS01/virtualMachines/2",
          },
          actionState: "Approved",
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await theOperationToUpdateTheVirtualMachineScaleSetLifecycleHookEvent();
}

main().catch(console.error);
