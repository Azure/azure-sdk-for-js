// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Schedule } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or replace an existing schedule.
 *
 * @summary Create or replace an existing schedule.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/GlobalSchedules_CreateOrUpdate.json
 */
async function globalSchedulesCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const name = "labvmautostart";
  const schedule: Schedule = {
    status: "Enabled",
    taskType: "LabVmsStartupTask",
    timeZoneId: "Hawaiian Standard Time",
    weeklyRecurrence: {
      time: "0700",
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.globalSchedules.createOrUpdate(resourceGroupName, name, schedule);
  console.log(result);
}

globalSchedulesCreateOrUpdate().catch(console.error);
