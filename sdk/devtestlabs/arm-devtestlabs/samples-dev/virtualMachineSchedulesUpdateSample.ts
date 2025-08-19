// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ScheduleFragment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Allows modifying tags of schedules. All other properties will be ignored.
 *
 * @summary Allows modifying tags of schedules. All other properties will be ignored.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/VirtualMachineSchedules_Update.json
 */
async function virtualMachineSchedulesUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const virtualMachineName = "{vmName}";
  const name = "LabVmsShutdown";
  const schedule: ScheduleFragment = { tags: { tagName1: "tagValue1" } };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.virtualMachineSchedules.update(
    resourceGroupName,
    labName,
    virtualMachineName,
    name,
    schedule,
  );
  console.log(result);
}

virtualMachineSchedulesUpdate().catch(console.error);
