// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Activation Links
 *
 * @summary list Activation Links
 * x-ms-original-file: 2025-03-01/oracleSubscriptions_listActivationLinks.json
 */
async function oracleSubscriptionsListActivationLinks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listActivationLinks();
  console.log(result);
}

async function main(): Promise<void> {
  await oracleSubscriptionsListActivationLinks();
}

main().catch(console.error);
