// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets maintenance windows settings for a database.
 *
 * @summary sets maintenance windows settings for a database.
 * x-ms-original-file: 2025-02-01-preview/CreateOrUpdateMaintenanceWindows.json
 */
async function setsMaintenanceWindowSettingsForASelectedDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.maintenanceWindows.createOrUpdate(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdwdb",
    "current",
    { timeRanges: [{ dayOfWeek: "Saturday", duration: "PT60M", startTime: "00:00:00" }] },
  );
}

async function main(): Promise<void> {
  await setsMaintenanceWindowSettingsForASelectedDatabase();
}

main().catch(console.error);
