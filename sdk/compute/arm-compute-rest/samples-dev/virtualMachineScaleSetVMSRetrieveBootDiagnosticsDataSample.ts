// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set.
 *
 * @summary The operation to retrieve SAS URIs of boot diagnostic logs for a virtual machine in a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_RetrieveBootDiagnosticsData.json
 */

import type { VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveBootDiagnosticsDataOfAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const options: VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataParameters = {
    queryParameters: {
      sasUriExpirationTimeInMinutes: 60,
      "api-version": "2022-08-01",
    },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualmachines/{instanceId}/retrieveBootDiagnosticsData",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId,
    )
    .post(options);
  console.log(result);
}

retrieveBootDiagnosticsDataOfAVirtualMachine().catch(console.error);
