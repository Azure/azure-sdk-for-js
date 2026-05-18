// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a managed database's short term retention policy list.
 *
 * @summary gets a managed database's short term retention policy list.
 * x-ms-original-file: 2025-02-01-preview/GetListManagedShortTermRetentionPolicy.json
 */
async function getTheShortTermRetentionPolicyListForTheDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedBackupShortTermRetentionPolicies.listByDatabase(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTheShortTermRetentionPolicyListForTheDatabase();
}

main().catch(console.error);
