// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ExascaleDbStorageVault resources by subscription ID
 *
 * @summary list ExascaleDbStorageVault resources by subscription ID
 * x-ms-original-file: 2025-09-01/ExascaleDbStorageVaults_ListBySubscription_MaximumSet_Gen.json
 */
async function exascaleDbStorageVaultsListBySubscriptionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exascaleDbStorageVaults.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list ExascaleDbStorageVault resources by subscription ID
 *
 * @summary list ExascaleDbStorageVault resources by subscription ID
 * x-ms-original-file: 2025-09-01/ExascaleDbStorageVaults_ListBySubscription_MinimumSet_Gen.json
 */
async function exascaleDbStorageVaultsListBySubscriptionMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.exascaleDbStorageVaults.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await exascaleDbStorageVaultsListBySubscriptionMaximumSet();
  await exascaleDbStorageVaultsListBySubscriptionMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
