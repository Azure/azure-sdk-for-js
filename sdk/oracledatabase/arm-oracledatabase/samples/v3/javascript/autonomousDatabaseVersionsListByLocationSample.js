// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AutonomousDbVersion resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDbVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseVersions_ListByLocation_MaximumSet_Gen.json
 */
async function listAnAutonomousVersionsByLocationGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseVersions.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDbVersion resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDbVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/AutonomousDatabaseVersions_ListByLocation_MinimumSet_Gen.json
 */
async function listAnAutonomousVersionsByLocationGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseVersions.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list AutonomousDbVersion resources by SubscriptionLocationResource
 *
 * @summary list AutonomousDbVersion resources by SubscriptionLocationResource
 * x-ms-original-file: 2025-09-01/autonomousDatabaseVersion_listByLocation.json
 */
async function autonomousDatabaseVersionsListByLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autonomousDatabaseVersions.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAnAutonomousVersionsByLocationGeneratedByMaximumSetRule();
  await listAnAutonomousVersionsByLocationGeneratedByMinimumSetRule();
  await autonomousDatabaseVersionsListByLocation();
}

main().catch(console.error);
