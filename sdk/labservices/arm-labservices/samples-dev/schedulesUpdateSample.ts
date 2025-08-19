// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ScheduleUpdate } from "@azure/arm-labservices";
import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Operation to update a lab schedule.
 *
 * @summary Operation to update a lab schedule.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/Schedules/patchSchedule.json
 */
async function patchSchedule(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LABSERVICES_RESOURCE_GROUP"] || "testrg123";
  const labName = "testlab";
  const scheduleName = "schedule1";
  const body: ScheduleUpdate = {
    recurrencePattern: {
      expirationDate: new Date("2020-08-14T23:59:59Z"),
      frequency: "Daily",
      interval: 2,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.schedules.update(resourceGroupName, labName, scheduleName, body);
  console.log(result);
}

async function main(): Promise<void> {
  await patchSchedule();
}

main().catch(console.error);
