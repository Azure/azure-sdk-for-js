// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DetachDataDiskProperties } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Detach the specified disk from the virtual machine. This operation can take a while to complete.
 *
 * @summary Detach the specified disk from the virtual machine. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualMachines_DetachDataDisk.json
 */
async function virtualMachinesDetachDataDisk(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{virtualMachineName}";
  const detachDataDiskProperties: DetachDataDiskProperties = {
    existingLabDiskId:
      "/subscriptions/{subscriptionId}/resourcegroups/resourceGroupName/providers/microsoft.devtestlab/labs/{labName}/virtualmachines/{virtualMachineName}",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginDetachDataDiskAndWait(
    resourceGroupName,
    labName,
    name,
    detachDataDiskProperties,
  );
  console.log(result);
}

virtualMachinesDetachDataDisk().catch(console.error);
