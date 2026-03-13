// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a stopped server.
 *
 * @summary starts a stopped server.
 * x-ms-original-file: 2026-01-01-preview/ServersStart.json
 */
async function startAStoppedServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.start("exampleresourcegroup", "exampleserver");
}

async function main(): Promise<void> {
  await startAStoppedServer();
}

main().catch(console.error);
