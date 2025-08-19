// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Start a virtual machine. This operation can take a while to complete.
 *
 * @summary Start a virtual machine. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualMachines_Start.json
 */

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

async function virtualMachinesStart(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const name = "{vmName}";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginStartAndWait(resourceGroupName, labName, name);
  console.log(result);
}

virtualMachinesStart().catch(console.error);
