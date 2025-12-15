// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list AutonomousDatabase resources by subscription ID
 *
 * @summary list AutonomousDatabase resources by subscription ID
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_ListBySubscription_MaximumSet_Gen.json
 */
async function listAutonomousDatabaseBySubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabases.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDatabase resources by subscription ID
 *
 * @summary list AutonomousDatabase resources by subscription ID
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_ListBySubscription_MinimumSet_Gen.json
 */
async function listAutonomousDatabaseBySubscriptionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabases.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDatabase resources by subscription ID
 *
 * @summary list AutonomousDatabase resources by subscription ID
 * x-ms-original-file: 2025-09-01/autonomousDatabase_listBySubscription.json
 */
async function autonomousDatabasesListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabases.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAutonomousDatabaseBySubscriptionGeneratedByMaximumSetRule();
  await listAutonomousDatabaseBySubscriptionGeneratedByMinimumSetRule();
  await autonomousDatabasesListBySubscription();
}

main().catch(console.error);
