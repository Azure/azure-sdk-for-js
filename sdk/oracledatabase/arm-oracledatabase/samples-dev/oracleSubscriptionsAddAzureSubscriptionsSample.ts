// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to add Azure Subscriptions
 *
 * @summary add Azure Subscriptions
 * x-ms-original-file: 2025-03-01/oracleSubscriptions_addAzureSubscriptions.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function oracleSubscriptionsAddAzureSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.oracleSubscriptions.addAzureSubscriptions({
    azureSubscriptionIds: ["00000000-0000-0000-0000-000000000001"],
  });
}

async function main(): Promise<void> {
  await oracleSubscriptionsAddAzureSubscriptions();
}

main().catch(console.error);
