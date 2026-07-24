// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the upgrade preferences for an Event Hubs Dedicated cluster.
 *
 * @summary creates or updates the upgrade preferences for an Event Hubs Dedicated cluster.
 * x-ms-original-file: 2026-07-01-preview/Clusters/UpgradePreferencesCreateOrUpdate.json
 */
async function createOrUpdateClusterUpgradePreferences() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.upgradePreferencesOperations.createOrUpdate(
    "contoso-rg",
    "contoso-cluster",
    {
      properties: {
        exceptionWindows: [
          {
            action: "Allow",
            date: new Date("2026-08-22"),
            durationMinutes: 480,
            startTimeOfDay: "PT4H",
          },
        ],
        maintenanceWindows: [
          { dayOfWeek: "Saturday", durationMinutes: 480, startTimeOfDay: "PT2H" },
          { dayOfWeek: "Sunday", durationMinutes: 480, startTimeOfDay: "PT2H" },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateClusterUpgradePreferences();
}

main().catch(console.error);
