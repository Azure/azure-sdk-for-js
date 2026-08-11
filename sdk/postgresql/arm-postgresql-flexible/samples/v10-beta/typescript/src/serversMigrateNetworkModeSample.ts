// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrates an Azure Database for PostgreSQL server from VNet integration to a Private Link network model.
 *
 * @summary migrates an Azure Database for PostgreSQL server from VNet integration to a Private Link network model.
 * x-ms-original-file: 2026-04-01-preview/ServersMigrateNetworkMode.json
 */
async function migrateServerNetworkConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.migrateNetworkMode("exampleresourcegroup", "exampleserver");
  console.log(result);
}

async function main(): Promise<void> {
  await migrateServerNetworkConfiguration();
}

main().catch(console.error);
