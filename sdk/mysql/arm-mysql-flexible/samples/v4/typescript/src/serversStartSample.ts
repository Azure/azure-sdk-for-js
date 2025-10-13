// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a server.
 *
 * @summary starts a server.
 * x-ms-original-file: 2024-12-30/ServerStart.json
 */
async function startAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.start("TestGroup", "testserver");
}

async function main(): Promise<void> {
  await startAServer();
}

main().catch(console.error);
