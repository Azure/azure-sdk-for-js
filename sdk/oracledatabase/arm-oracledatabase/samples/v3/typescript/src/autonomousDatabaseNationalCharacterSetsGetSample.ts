// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AutonomousDatabaseNationalCharacterSet
 *
 * @summary get a AutonomousDatabaseNationalCharacterSet
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseNationalCharacterSets_Get_MaximumSet_Gen.json
 */
async function getAutonomousDbNationalCharacterSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseNationalCharacterSets.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AutonomousDatabaseNationalCharacterSet
 *
 * @summary get a AutonomousDatabaseNationalCharacterSet
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseNationalCharacterSets_Get_MinimumSet_Gen.json
 */
async function getAutonomousDbNationalCharacterSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseNationalCharacterSets.get(
    "eastus",
    "Replace this value with a string matching RegExp .*",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a AutonomousDatabaseNationalCharacterSet
 *
 * @summary get a AutonomousDatabaseNationalCharacterSet
 * x-ms-original-file: 2025-09-01/autonomousDatabaseNationalCharacterSet_get.json
 */
async function autonomousDatabaseNationalCharacterSetsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseNationalCharacterSets.get("eastus", "NATIONAL");
  console.log(result);
}

async function main(): Promise<void> {
  await getAutonomousDbNationalCharacterSetGeneratedByMaximumSetRule();
  await getAutonomousDbNationalCharacterSetGeneratedByMinimumSetRule();
  await autonomousDatabaseNationalCharacterSetsGet();
}

main().catch(console.error);
