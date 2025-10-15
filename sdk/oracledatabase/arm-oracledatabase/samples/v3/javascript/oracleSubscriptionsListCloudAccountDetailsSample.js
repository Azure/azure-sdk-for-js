// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Cloud Account Details
 *
 * @summary list Cloud Account Details
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_ListCloudAccountDetails_MaximumSet_Gen.json
 */
async function listCloudAccountDetailsForTheOracleSubscriptionGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listCloudAccountDetails();
  console.log(result);
}

/**
 * This sample demonstrates how to list Cloud Account Details
 *
 * @summary list Cloud Account Details
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_ListCloudAccountDetails_MinimumSet_Gen.json
 */
async function listCloudAccountDetailsForTheOracleSubscriptionGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listCloudAccountDetails();
  console.log(result);
}

/**
 * This sample demonstrates how to list Cloud Account Details
 *
 * @summary list Cloud Account Details
 * x-ms-original-file: 2025-09-01/oracleSubscriptions_listCloudAccountDetails.json
 */
async function oracleSubscriptionsListCloudAccountDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listCloudAccountDetails();
  console.log(result);
}

async function main() {
  await listCloudAccountDetailsForTheOracleSubscriptionGeneratedByMaximumSetRule();
  await listCloudAccountDetailsForTheOracleSubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsListCloudAccountDetails();
}

main().catch(console.error);
