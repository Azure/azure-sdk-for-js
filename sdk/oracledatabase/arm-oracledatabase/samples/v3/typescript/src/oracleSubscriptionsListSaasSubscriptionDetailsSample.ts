// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Saas Subscription Details
 *
 * @summary list Saas Subscription Details
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_ListSaasSubscriptionDetails_MaximumSet_Gen.json
 */
async function listSaasSubscriptionDetailsForTheOracleSubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listSaasSubscriptionDetails();
  console.log(result);
}

/**
 * This sample demonstrates how to list Saas Subscription Details
 *
 * @summary list Saas Subscription Details
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_ListSaasSubscriptionDetails_MinimumSet_Gen.json
 */
async function listSaasSubscriptionDetailsForTheOracleSubscriptionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listSaasSubscriptionDetails();
  console.log(result);
}

/**
 * This sample demonstrates how to list Saas Subscription Details
 *
 * @summary list Saas Subscription Details
 * x-ms-original-file: 2025-09-01/oracleSubscriptions_listSaasSubscriptionDetails.json
 */
async function oracleSubscriptionsListSaasSubscriptionDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listSaasSubscriptionDetails();
  console.log(result);
}

async function main(): Promise<void> {
  await listSaasSubscriptionDetailsForTheOracleSubscriptionGeneratedByMaximumSetRule();
  await listSaasSubscriptionDetailsForTheOracleSubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsListSaasSubscriptionDetails();
}

main().catch(console.error);
