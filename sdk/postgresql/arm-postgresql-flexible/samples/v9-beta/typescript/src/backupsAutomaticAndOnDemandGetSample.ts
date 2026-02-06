// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information of an on demand backup, given its name.
 *
 * @summary gets information of an on demand backup, given its name.
 * x-ms-original-file: 2026-01-01-preview/BackupsAutomaticAndOnDemandGet.json
 */
async function getAnOnDemandBackupGivenItsName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.backupsAutomaticAndOnDemand.get(
    "exampleresourcegroup",
    "exampleserver",
    "backup_638830782181266873",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnOnDemandBackupGivenItsName();
}

main().catch(console.error);
