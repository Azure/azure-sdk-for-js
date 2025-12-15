// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a OracleSubscription
 *
 * @summary delete a OracleSubscription
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_Delete_MaximumSet_Gen.json
 */
async function deleteOracleSubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.oracleSubscriptions.delete();
}

/**
 * This sample demonstrates how to delete a OracleSubscription
 *
 * @summary delete a OracleSubscription
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_Delete_MinimumSet_Gen.json
 */
async function deleteOracleSubscriptionGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.oracleSubscriptions.delete();
}

/**
 * This sample demonstrates how to delete a OracleSubscription
 *
 * @summary delete a OracleSubscription
 * x-ms-original-file: 2025-09-01/oracleSubscriptions_delete.json
 */
async function oracleSubscriptionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.oracleSubscriptions.delete();
}

async function main() {
  await deleteOracleSubscriptionGeneratedByMaximumSetRule();
  await deleteOracleSubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsDelete();
}

main().catch(console.error);
