// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a maintenance configuration in the specified managed cluster.
 *
 * @summary creates or updates a maintenance configuration in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/MaintenanceConfigurationsCreate_Update_MaintenanceWindow.json
 */
async function createOrUpdateMaintenanceConfigurationWithMaintenanceWindow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.createOrUpdate(
    "rg1",
    "clustername1",
    "aksManagedAutoUpgradeSchedule",
    {
      maintenanceWindow: {
        durationHours: 10,
        notAllowedDates: [
          { end: new Date("2023-02-25"), start: new Date("2023-02-18") },
          { end: new Date("2024-01-05"), start: new Date("2023-12-23") },
        ],
        schedule: {
          relativeMonthly: { dayOfWeek: "Monday", intervalMonths: 3, weekIndex: "First" },
        },
        startDate: new Date("2023-01-01"),
        startTime: "08:30",
        utcOffset: "+05:30",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateMaintenanceConfigurationWithMaintenanceWindow();
}

main().catch(console.error);
