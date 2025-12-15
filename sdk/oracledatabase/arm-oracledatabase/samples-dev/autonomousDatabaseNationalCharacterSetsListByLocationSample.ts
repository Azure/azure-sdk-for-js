// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AutonomousDatabaseNationalCharacterSet resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDatabaseNationalCharacterSet resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseNationalCharacterSets_ListByLocation_MaximumSet_Gen.json
 */
async function listAutonomousDbNationalCharacterSetsByLocationGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseNationalCharacterSets.listByLocation(
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDatabaseNationalCharacterSet resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDatabaseNationalCharacterSet resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseNationalCharacterSets_ListByLocation_MinimumSet_Gen.json
 */
async function listAutonomousDbNationalCharacterSetsByLocationGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseNationalCharacterSets.listByLocation(
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDatabaseNationalCharacterSet resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDatabaseNationalCharacterSet resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/autonomousDatabaseNationalCharacterSet_listByLocation.json
 */
async function autonomousDatabaseNationalCharacterSetsListByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseNationalCharacterSets.listByLocation(
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutonomousDbNationalCharacterSetsByLocationGeneratedByMaximumSetRule();
  await listAutonomousDbNationalCharacterSetsByLocationGeneratedByMinimumSetRule();
  await autonomousDatabaseNationalCharacterSetsListByLocation();
}

main().catch(console.error);
