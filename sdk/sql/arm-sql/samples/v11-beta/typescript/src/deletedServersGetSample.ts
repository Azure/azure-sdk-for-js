// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a deleted server.
 *
 * @summary gets a deleted server.
 * x-ms-original-file: 2025-02-01-preview/DeletedServerGet.json
 */
async function getDeletedServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.deletedServers.get("japaneast", "sqlcrudtest-d-1414");
  console.log(result);
}

async function main(): Promise<void> {
  await getDeletedServer();
}

main().catch(console.error);
