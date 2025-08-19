// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Delete schedule.
 *
 * @summary Delete schedule.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualMachineSchedules_Delete.json
 */
async function virtualMachineSchedulesDelete(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const virtualMachineName = "{vmName}";
  const name = "LabVmsShutdown";
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualMachineSchedules.delete(
    resourceGroupName,
    labName,
    virtualMachineName,
    name,
  );
  console.log(result);
}

virtualMachineSchedulesDelete().catch(console.error);
