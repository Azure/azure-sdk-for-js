// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a server.
 *
 * @summary gets information about a server.
 * x-ms-original-file: 2024-12-30/ServerGet.json
 */
async function getAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get("testrg", "mysqltestserver");
  console.log(result);
}

/**
 * This sample demonstrates how to gets information about a server.
 *
 * @summary gets information about a server.
 * x-ms-original-file: 2024-12-30/ServerGetWithVnet.json
 */
async function getAServerWithVnet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.get("testrg", "mysqltestserver");
  console.log(result);
}

async function main(): Promise<void> {
  await getAServer();
  await getAServerWithVnet();
}

main().catch(console.error);
