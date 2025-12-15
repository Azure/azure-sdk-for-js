// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseCharacterSets_ListByLocation_MaximumSet_Gen.json
 */
async function listAutonomousDbCharacterSetsByLocationGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseCharacterSets.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseCharacterSets_ListByLocation_MinimumSet_Gen.json
 */
async function listAutonomousDbCharacterSetsByLocationGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseCharacterSets.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/autonomousDatabaseCharacterSet_listByLocation.json
 */
async function autonomousDatabaseCharacterSetsListByLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseCharacterSets.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAutonomousDbCharacterSetsByLocationGeneratedByMaximumSetRule();
  await listAutonomousDbCharacterSetsByLocationGeneratedByMinimumSetRule();
  await autonomousDatabaseCharacterSetsListByLocation();
}

main().catch(console.error);
