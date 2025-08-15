// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LabVirtualMachineFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Allows modifying tags of virtual machines. All other properties will be ignored.
 *
 * @summary Allows modifying tags of virtual machines. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualMachines_Update.json
 */
async function virtualMachinesUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{vmName}";
  const labVirtualMachine: LabVirtualMachineFragment = {};
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualMachines.update(
    resourceGroupName,
    labName,
    name,
    labVirtualMachine,
  );
  console.log(result);
}

virtualMachinesUpdate().catch(console.error);
