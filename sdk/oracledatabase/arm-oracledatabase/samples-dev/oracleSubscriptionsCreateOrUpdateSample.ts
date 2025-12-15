// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a OracleSubscription
 *
 * @summary create a OracleSubscription
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createOrUpdateOracleSubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.createOrUpdate({
    properties: {
      cloudAccountId: "ocid1..aaaaaa",
      cloudAccountState: "Pending",
      termUnit: "akzq",
      productCode: "aujimmjxyetnqkmjqrwapn",
      intent: "Retain",
    },
    plan: {
      name: "plan1",
      publisher: "publisher1",
      product: "product1",
      promotionCode: "none",
      version: "alpha",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a OracleSubscription
 *
 * @summary create a OracleSubscription
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_CreateOrUpdate_MinimumSet_Gen.json
 */
async function createOrUpdateOracleSubscriptionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.createOrUpdate({});
  console.log(result);
}

/**
 * This sample demonstrates how to create a OracleSubscription
 *
 * @summary create a OracleSubscription
 * x-ms-original-file: 2025-09-01/oracleSubscriptions_create.json
 */
async function oracleSubscriptionsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.createOrUpdate({
    properties: {},
    plan: {
      name: "plan1",
      publisher: "publisher1",
      product: "product1",
      promotionCode: "none",
      version: "alpha",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateOracleSubscriptionGeneratedByMaximumSetRule();
  await createOrUpdateOracleSubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsCreateOrUpdate();
}

main().catch(console.error);
