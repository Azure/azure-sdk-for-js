// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add Azure Subscriptions
 *
 * @summary add Azure Subscriptions
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_AddAzureSubscriptions_MaximumSet_Gen.json
 */
async function addAzureSubscriptionsToTheOracleSubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.oracleSubscriptions.addAzureSubscriptions({
    azureSubscriptionIds: ["00000000-0000-0000-0000-000000000001"],
  });
}

/**
 * This sample demonstrates how to add Azure Subscriptions
 *
 * @summary add Azure Subscriptions
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_AddAzureSubscriptions_MinimumSet_Gen.json
 */
async function addAzureSubscriptionsToTheOracleSubscriptionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.oracleSubscriptions.addAzureSubscriptions({
    azureSubscriptionIds: ["00000000-0000-0000-0000-000000000001"],
  });
}

/**
 * This sample demonstrates how to add Azure Subscriptions
 *
 * @summary add Azure Subscriptions
 * x-ms-original-file: 2025-09-01/oracleSubscriptions_addAzureSubscriptions.json
 */
async function oracleSubscriptionsAddAzureSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.oracleSubscriptions.addAzureSubscriptions({
    azureSubscriptionIds: ["00000000-0000-0000-0000-000000000001"],
  });
}

async function main(): Promise<void> {
  await addAzureSubscriptionsToTheOracleSubscriptionGeneratedByMaximumSetRule();
  await addAzureSubscriptionsToTheOracleSubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsAddAzureSubscriptions();
}

main().catch(console.error);
