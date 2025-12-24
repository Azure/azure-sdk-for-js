// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a maintenance configuration in the specified managed cluster.
 *
 * @summary Creates or updates a maintenance configuration in the specified managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/stable/2025-10-01/examples/MaintenanceConfigurationsCreate_Update_MaintenanceWindow.json
 */
async function createOrUpdateMaintenanceConfigurationWithMaintenanceWindow() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const configName = "aksManagedAutoUpgradeSchedule";
  const parameters = {
    maintenanceWindow: {
      durationHours: 10,
      notAllowedDates: [
        { end: new Date("2023-02-25"), start: new Date("2023-02-18") },
        { end: new Date("2024-01-05"), start: new Date("2023-12-23") },
      ],
      schedule: {
        relativeMonthly: {
          dayOfWeek: "Monday",
          intervalMonths: 3,
          weekIndex: "First",
        },
      },
      startDate: new Date("2023-01-01"),
      startTime: "08:30",
      utcOffset: "+05:30",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.maintenanceConfigurations.createOrUpdate(
    resourceGroupName,
    resourceName,
    configName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateMaintenanceConfigurationWithMaintenanceWindow();
}

main().catch(console.error);
