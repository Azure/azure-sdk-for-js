// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reevaluates the inaccessibility state of a managed database.
 *
 * @summary reevaluates the inaccessibility state of a managed database.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseReevaluateInaccessibleDatabaseState.json
 */
async function reevaluateTheInaccessibilityStateOfAManagedDatabase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedDatabases.reevaluateInaccessibleDatabaseState(
    "Test1",
    "managedInstance",
    "managedDatabase",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reevaluateTheInaccessibilityStateOfAManagedDatabase();
}

main().catch(console.error);
