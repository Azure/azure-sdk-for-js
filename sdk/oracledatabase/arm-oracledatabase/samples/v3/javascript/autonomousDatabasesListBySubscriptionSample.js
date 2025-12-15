// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AutonomousDatabase resources by subscription ID
 *
 * @summary list AutonomousDatabase resources by subscription ID
 * x-ms-original-file: 2025-09-01/AutonomousDatabases_ListBySubscription_MaximumSet_Gen.json
 */
async function listAutonomousDatabaseBySubscriptionGeneratedByMaximumSetRule() {
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
async function listAutonomousDatabaseBySubscriptionGeneratedByMinimumSetRule() {
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
async function autonomousDatabasesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabases.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAutonomousDatabaseBySubscriptionGeneratedByMaximumSetRule();
  await listAutonomousDatabaseBySubscriptionGeneratedByMinimumSetRule();
  await autonomousDatabasesListBySubscription();
}

main().catch(console.error);
