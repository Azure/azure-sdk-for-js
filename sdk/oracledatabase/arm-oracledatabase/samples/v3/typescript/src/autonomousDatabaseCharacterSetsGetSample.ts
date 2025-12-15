// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AutonomousDatabaseCharacterSet
 *
 * @summary get a AutonomousDatabaseCharacterSet
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseCharacterSets_Get_MaximumSet_Gen.json
 */
async function getAutonomousDbCharacterSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseCharacterSets.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AutonomousDatabaseCharacterSet
 *
 * @summary get a AutonomousDatabaseCharacterSet
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseCharacterSets_Get_MinimumSet_Gen.json
 */
async function getAutonomousDbCharacterSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseCharacterSets.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AutonomousDatabaseCharacterSet
 *
 * @summary get a AutonomousDatabaseCharacterSet
 * x-ms-original-file: 2025-09-01/autonomousDatabaseCharacterSet_get.json
 */
async function autonomousDatabaseCharacterSetsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseCharacterSets.get("eastus", "DATABASE");
  console.log(result);
}

async function main(): Promise<void> {
  await getAutonomousDbCharacterSetGeneratedByMaximumSetRule();
  await getAutonomousDbCharacterSetGeneratedByMinimumSetRule();
  await autonomousDatabaseCharacterSetsGet();
}

main().catch(console.error);
