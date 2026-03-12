// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs.
 *
 * @summary The operation to retrieve SAS URIs for a virtual machine's boot diagnostic logs.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_RetrieveBootDiagnosticsData.json
 */

import type { VirtualMachinesRetrieveBootDiagnosticsDataParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function retrieveBootDiagnosticsDataOfAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ResourceGroup";
  const vmName = "VMName";
  const options: VirtualMachinesRetrieveBootDiagnosticsDataParameters = {
    queryParameters: {
      sasUriExpirationTimeInMinutes: 60,
      "api-version": "2022-08-01",
    },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/retrieveBootDiagnosticsData",
      subscriptionId,
      resourceGroupName,
      vmName,
    )
    .post(options);
  console.log(result);
}

retrieveBootDiagnosticsDataOfAVirtualMachine().catch(console.error);
