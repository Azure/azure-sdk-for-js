// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a database's short term retention policy.
 *
 * @summary gets a database's short term retention policy.
 * x-ms-original-file: 2025-02-01-preview/ListShortTermRetentionPoliciesByDatabase.json
 */
async function getTheShortTermRetentionPolicyForTheDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.backupShortTermRetentionPolicies.listByDatabase(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTheShortTermRetentionPolicyForTheDatabase();
}

main().catch(console.error);
