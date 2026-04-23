// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an on demand backup of a server.
 *
 * @summary creates an on demand backup of a server.
 * x-ms-original-file: 2026-01-01-preview/BackupsAutomaticAndOnDemandCreate.json
 */
async function createAnOnDemandBackupOfAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupsAutomaticAndOnDemand.create(
    "exampleresourcegroup",
    "exampleserver",
    "ondemandbackup-20250601T183022",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnOnDemandBackupOfAServer();
}

main().catch(console.error);
