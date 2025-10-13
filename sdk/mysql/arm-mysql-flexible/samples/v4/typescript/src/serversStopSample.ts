// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops a server.
 *
 * @summary stops a server.
 * x-ms-original-file: 2024-12-30/ServerStop.json
 */
async function stopAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.stop("TestGroup", "testserver");
}

async function main(): Promise<void> {
  await stopAServer();
}

main().catch(console.error);
