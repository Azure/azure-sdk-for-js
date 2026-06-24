// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AutonomousDbVersion
 *
 * @summary get a AutonomousDbVersion
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseVersions_Get_MaximumSet_Gen.json
 */
async function getAnAutonomousVersionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseVersions.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AutonomousDbVersion
 *
 * @summary get a AutonomousDbVersion
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseVersions_Get_MinimumSet_Gen.json
 */
async function getAnAutonomousVersionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseVersions.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AutonomousDbVersion
 *
 * @summary get a AutonomousDbVersion
 * x-ms-original-file: 2025-09-01/autonomousDatabaseVersion_get.json
 */
async function autonomousDatabaseVersionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseVersions.get("eastus", "18.4.0.0");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAutonomousVersionGeneratedByMaximumSetRule();
  await getAnAutonomousVersionGeneratedByMinimumSetRule();
  await autonomousDatabaseVersionsGet();
}

main().catch(console.error);
