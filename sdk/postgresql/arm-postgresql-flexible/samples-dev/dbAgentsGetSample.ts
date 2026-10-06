// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the database agent configuration for a flexible server.
 *
 * @summary gets the database agent configuration for a flexible server.
 * x-ms-original-file: 2026-07-01-preview/DBAgentGet.json
 */
async function getTheSingletonDefaultDatabaseAgentConfigurationForAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.dbAgents.get("exampleresourcegroup", "exampleserver");
  console.log(result);
}

async function main(): Promise<void> {
  await getTheSingletonDefaultDatabaseAgentConfigurationForAServer();
}

main().catch(console.error);
