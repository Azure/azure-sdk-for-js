// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of all virtual machines in a VM scale sets.
 *
 * @summary Gets a list of all virtual machines in a VM scale sets.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMs_List_MaximumSet_Gen.json
 */

import type { VirtualMachineScaleSetVMsListParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { paginate } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualMachineScaleSetVMSListMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const virtualMachineScaleSetName = "aaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetVMsListParameters = {
    queryParameters: {
      $filter: "aaaaaaaaaaaaaa",
      $select: "aaaaaaaaaaaaaaaaaaaaa",
      $expand: "aaaaaaaaaaaaa",
      "api-version": "2022-08-01",
    },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines",
      subscriptionId,
      resourceGroupName,
      virtualMachineScaleSetName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

virtualMachineScaleSetVMSListMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of all virtual machines in a VM scale sets.
 *
 * @summary Gets a list of all virtual machines in a VM scale sets.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMs_List_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMSListMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const virtualMachineScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetVMsListParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{virtualMachineScaleSetName}/virtualMachines",
      subscriptionId,
      resourceGroupName,
      virtualMachineScaleSetName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

virtualMachineScaleSetVMSListMinimumSetGen().catch(console.error);
