// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to restarts a server.
 *
 * @summary restarts a server.
 * x-ms-original-file: 2024-12-30/ServerRestart.json
 */
async function restartAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.restart("TestGroup", "testserver", {
    maxFailoverSeconds: 60,
    restartWithFailover: "Enabled",
  });
}

async function main(): Promise<void> {
  await restartAServer();
}

main().catch(console.error);
