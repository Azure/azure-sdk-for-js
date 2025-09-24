// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a OracleSubscription
 *
 * @summary update a OracleSubscription
 * x-ms-original-file: 2025-03-01/oracleSubscriptions_patch.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function oracleSubscriptionsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.update({});
  console.log(result);
}

async function main(): Promise<void> {
  await oracleSubscriptionsUpdate();
}

main().catch(console.error);
