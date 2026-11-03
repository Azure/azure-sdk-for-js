// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a database.
 *
 * @summary returns a database.
 * x-ms-original-file: 2025-02-14/KustoDatabasesGet.json
 */
async function kustoDatabasesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databases.get("kustorptest", "kustoCluster", "KustoDatabase8");
  console.log(result);
}

/**
 * This sample demonstrates how to returns a database.
 *
 * @summary returns a database.
 * x-ms-original-file: 2025-02-14/KustoSuspendedDatabasesGet.json
 */
async function kustoSuspendedDatabasesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databases.get("kustorptest", "kustoCluster", "KustoDatabase9");
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDatabasesGet();
  await kustoSuspendedDatabasesGet();
}

main().catch(console.error);
