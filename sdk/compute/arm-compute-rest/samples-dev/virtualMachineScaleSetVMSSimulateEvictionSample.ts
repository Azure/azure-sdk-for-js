// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to simulate the eviction of spot virtual machine in a VM scale set.
 *
 * @summary The operation to simulate the eviction of spot virtual machine in a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_SimulateEviction.json
 */

import type { VirtualMachineScaleSetVMsSimulateEvictionParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function simulateEvictionAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ResourceGroup";
  const vmScaleSetName = "VmScaleSetName";
  const instanceId = "InstanceId";
  const options: VirtualMachineScaleSetVMsSimulateEvictionParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/simulateEviction",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId,
    )
    .post(options);
  console.log(result);
}

simulateEvictionAVirtualMachine().catch(console.error);
