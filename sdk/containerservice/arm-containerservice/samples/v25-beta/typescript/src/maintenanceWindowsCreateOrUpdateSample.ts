// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a maintenance window.
 *
 * @summary creates or updates a maintenance window.
 * x-ms-original-file: 2026-04-02-preview/MaintenanceWindowsCreateOrUpdate.json
 */
async function createOrUpdateMaintenanceWindow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceWindows.createOrUpdate(
    "rg-maintenance",
    "production-weekends",
    {
      location: "eastus",
      tags: { environment: "production" },
      properties: {
        schedule: { weekly: { intervalWeeks: 1, dayOfWeek: "Saturday" } },
        startDate: new Date("2026-04-05"),
        startTime: "02:00",
        durationHours: 8,
        utcOffset: "-07:00",
        notAllowedDates: [{ start: new Date("2026-12-23"), end: new Date("2027-01-03") }],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateMaintenanceWindow();
}

main().catch(console.error);
