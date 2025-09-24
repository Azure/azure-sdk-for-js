// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list Cloud Account Details
 *
 * @summary list Cloud Account Details
 * x-ms-original-file: 2025-03-01/oracleSubscriptions_listCloudAccountDetails.json
 */

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

async function oracleSubscriptionsListCloudAccountDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.oracleSubscriptions.listCloudAccountDetails();
  console.log(result);
}

async function main(): Promise<void> {
  await oracleSubscriptionsListCloudAccountDetails();
}

main().catch(console.error);
