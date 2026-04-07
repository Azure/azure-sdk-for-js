// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a server.
 *
 * @summary deletes a server.
 * x-ms-original-file: 2025-02-01-preview/ServerDelete.json
 */
async function deleteServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.servers.delete("sqlcrudtest-7398", "sqlcrudtest-6661");
}

async function main(): Promise<void> {
  await deleteServer();
}

main().catch(console.error);
