// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResizeLabVirtualMachineProperties } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Resize Virtual Machine. This operation can take a while to complete.
 *
 * @summary Resize Virtual Machine. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualMachines_Resize.json
 */
async function virtualMachinesResize(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{vmName}";
  const resizeLabVirtualMachineProperties: ResizeLabVirtualMachineProperties = {
    size: "Standard_A4_v2",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginResizeAndWait(
    resourceGroupName,
    labName,
    name,
    resizeLabVirtualMachineProperties,
  );
  console.log(result);
}

virtualMachinesResize().catch(console.error);
