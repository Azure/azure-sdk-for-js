// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the results of a long retention backup operation for a server.
 *
 * @summary gets the results of a long retention backup operation for a server.
 * x-ms-original-file: 2026-01-01-preview/BackupsLongTermRetentionGet.json
 */
async function getTheResultsOfALongRetentionBackupOperationForAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupsLongTermRetention.get(
    "exampleresourcegroup",
    "exampleserver",
    "exampleltrbackup",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheResultsOfALongRetentionBackupOperationForAServer();
}

main().catch(console.error);
