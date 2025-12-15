// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AutonomousDatabaseNationalCharacterSet
 *
 * @summary get a AutonomousDatabaseNationalCharacterSet
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseNationalCharacterSets_Get_MaximumSet_Gen.json
 */
async function getAutonomousDbNationalCharacterSetGeneratedByMaximumSetRule() {
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
async function getAutonomousDbNationalCharacterSetGeneratedByMinimumSetRule() {
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
async function autonomousDatabaseNationalCharacterSetsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.autonomousDatabaseNationalCharacterSets.get("eastus", "NATIONAL");
  console.log(result);
}

async function main() {
  await getAutonomousDbNationalCharacterSetGeneratedByMaximumSetRule();
  await getAutonomousDbNationalCharacterSetGeneratedByMinimumSetRule();
  await autonomousDatabaseNationalCharacterSetsGet();
}

main().catch(console.error);
