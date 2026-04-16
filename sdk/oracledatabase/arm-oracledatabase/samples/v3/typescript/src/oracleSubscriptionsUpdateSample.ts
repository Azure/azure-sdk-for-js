// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a OracleSubscription
 *
 * @summary update a OracleSubscription
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_Update_MaximumSet_Gen.json
 */
async function patchOracleSubscriptionGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.update({
    plan: {
      name: "klnnbggrxhvvaiajvjx",
      publisher: "xvsarzadrjqergudsohjk",
      product: "hivkczjyrimjilbmqj",
      promotionCode: "zhotaxrodldvmwpksvsrwbnc",
      version: "ueudckjmuqpjvsmmenzyflgpa",
    },
    properties: { productCode: "kbqzsukkjceoplyalyrdayfj", intent: "Retain" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a OracleSubscription
 *
 * @summary update a OracleSubscription
 * x-ms-original-file: 2025-09-01/OracleSubscriptions_Update_MinimumSet_Gen.json
 */
async function patchOracleSubscriptionGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.update({});
  console.log(result);
}

/**
 * This sample demonstrates how to update a OracleSubscription
 *
 * @summary update a OracleSubscription
 * x-ms-original-file: 2025-09-01/oracleSubscriptions_patch.json
 */
async function oracleSubscriptionsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.update({});
  console.log(result);
}

async function main(): Promise<void> {
  await patchOracleSubscriptionGeneratedByMaximumSetRule();
  await patchOracleSubscriptionGeneratedByMinimumSetRule();
  await oracleSubscriptionsUpdate();
}

main().catch(console.error);
