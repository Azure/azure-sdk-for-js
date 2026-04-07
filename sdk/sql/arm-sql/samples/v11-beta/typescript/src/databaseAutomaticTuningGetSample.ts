// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a database's automatic tuning.
 *
 * @summary gets a database's automatic tuning.
 * x-ms-original-file: 2025-02-01-preview/DatabaseAutomaticTuningGet.json
 */
async function getADatabaseAutomaticTuningSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c3aa9078-0000-0000-0000-e36f151182d7";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseAutomaticTuning.get("default-sql-onebox", "testsvr11", "db1");
  console.log(result);
}

async function main(): Promise<void> {
  await getADatabaseAutomaticTuningSettings();
}

main().catch(console.error);
