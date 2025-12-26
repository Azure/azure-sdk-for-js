// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OracleSubscription resources by subscription ID
 *
 * @summary list OracleSubscription resources by subscription ID
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_ListBySubscription_MaximumSet_Gen.json
 */
async function listOracleSubscriptionsBySubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.oracleSubscriptions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list OracleSubscription resources by subscription ID
 *
 * @summary list OracleSubscription resources by subscription ID
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_ListBySubscription_MinimumSet_Gen.json
 */
async function listOracleSubscriptionsBySubscriptionGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.oracleSubscriptions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list OracleSubscription resources by subscription ID
 *
 * @summary list OracleSubscription resources by subscription ID
 * x-ms-original-file: 2025-09-01/oracleSubscriptions_listBySubscription.json
 */
async function oracleSubscriptionsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.oracleSubscriptions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOracleSubscriptionsBySubscriptionGeneratedByMaximumSetRule();
  await listOracleSubscriptionsBySubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsListBySubscription();
}

main().catch(console.error);
