// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a OracleSubscription
 *
 * @summary get a OracleSubscription
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_Get_MaximumSet_Gen.json
 */
async function getOracleSubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.get();
  console.log(result);
}

/**
 * This sample demonstrates how to get a OracleSubscription
 *
 * @summary get a OracleSubscription
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_Get_MinimumSet_Gen.json
 */
async function getOracleSubscriptionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.get();
  console.log(result);
}

/**
 * This sample demonstrates how to get a OracleSubscription
 *
 * @summary get a OracleSubscription
 * x-ms-original-file: 2025-09-01/oracleSubscriptions_get.json
 */
async function oracleSubscriptionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.get();
  console.log(result);
}

async function main(): Promise<void> {
  await getOracleSubscriptionGeneratedByMaximumSetRule();
  await getOracleSubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsGet();
}

main().catch(console.error);
