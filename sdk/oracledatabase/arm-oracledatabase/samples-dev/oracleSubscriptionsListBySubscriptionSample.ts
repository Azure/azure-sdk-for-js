// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list OracleSubscription resources by subscription ID
 *
 * @summary list OracleSubscription resources by subscription ID
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_ListBySubscription_MaximumSet_Gen.json
 */
async function listOracleSubscriptionsBySubscriptionGeneratedByMaximumSetRule(): Promise<void> {
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
async function listOracleSubscriptionsBySubscriptionGeneratedByMinimumSetRule(): Promise<void> {
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
async function oracleSubscriptionsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.oracleSubscriptions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listOracleSubscriptionsBySubscriptionGeneratedByMaximumSetRule();
  await listOracleSubscriptionsBySubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsListBySubscription();
}

main().catch(console.error);
