// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes or drops an existing server.
 *
 * @summary deletes or drops an existing server.
 * x-ms-original-file: 2026-01-01-preview/ServersDelete.json
 */
async function deleteOrDropAnExistingServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.delete("exampleresourcegroup", "exampleserver");
}

async function main(): Promise<void> {
  await deleteOrDropAnExistingServer();
}

main().catch(console.error);
