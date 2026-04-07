// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update automatic tuning properties for target database.
 *
 * @summary update automatic tuning properties for target database.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAutomaticTuningUpdateMax.json
 */
async function updatesDatabaseAutomaticTuningSettingsWithAllProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c3aa9078-0000-0000-0000-e36f151182d7";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseAutomaticTuning.update(
    "default-sql-onebox",
    "testsvr11",
    "db1",
    {
      desiredState: "Auto",
      options: {
        createIndex: { desiredState: "Off" },
        dropIndex: { desiredState: "On" },
        forceLastGoodPlan: { desiredState: "Default" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update automatic tuning properties for target database.
 *
 * @summary update automatic tuning properties for target database.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAutomaticTuningUpdateMin.json
 */
async function updatesDatabaseAutomaticTuningSettingsWithMinimalProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c3aa9078-0000-0000-0000-e36f151182d7";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseAutomaticTuning.update(
    "default-sql-onebox",
    "testsvr11",
    "db1",
    { desiredState: "Auto" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesDatabaseAutomaticTuningSettingsWithAllProperties();
  await updatesDatabaseAutomaticTuningSettingsWithMinimalProperties();
}

main().catch(console.error);
