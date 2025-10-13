// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a server.
 *
 * @summary deletes a server.
 * x-ms-original-file: 2024-12-30/ServerDelete.json
 */
async function deleteAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  await client.servers.delete("TestGroup", "testserver");
}

async function main(): Promise<void> {
  await deleteAServer();
}

main().catch(console.error);
