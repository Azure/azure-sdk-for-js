// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDatabaseCharacterSet resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseCharacterSets_ListByLocation_MaximumSet_Gen.json
 */
async function listAutonomousDbCharacterSetsByLocationGeneratedByMaximumSetRule(): Promise<void> {
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
async function listAutonomousDbCharacterSetsByLocationGeneratedByMinimumSetRule(): Promise<void> {
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
async function autonomousDatabaseCharacterSetsListByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseCharacterSets.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutonomousDbCharacterSetsByLocationGeneratedByMaximumSetRule();
  await listAutonomousDbCharacterSetsByLocationGeneratedByMinimumSetRule();
  await autonomousDatabaseCharacterSetsListByLocation();
}

main().catch(console.error);
