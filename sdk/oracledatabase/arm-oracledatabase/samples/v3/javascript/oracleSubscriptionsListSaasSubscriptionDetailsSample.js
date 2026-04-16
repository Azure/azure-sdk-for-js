// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Saas Subscription Details
 *
 * @summary list Saas Subscription Details
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_ListSaasSubscriptionDetails_MaximumSet_Gen.json
 */
async function listSaasSubscriptionDetailsForTheOracleSubscriptionGeneratedByMaximumSetRule() {
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
async function listSaasSubscriptionDetailsForTheOracleSubscriptionGeneratedByMinimumSetRule() {
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
async function oracleSubscriptionsListSaasSubscriptionDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listSaasSubscriptionDetails();
  console.log(result);
}

async function main() {
  await listSaasSubscriptionDetailsForTheOracleSubscriptionGeneratedByMaximumSetRule();
  await listSaasSubscriptionDetailsForTheOracleSubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsListSaasSubscriptionDetails();
}

main().catch(console.error);
