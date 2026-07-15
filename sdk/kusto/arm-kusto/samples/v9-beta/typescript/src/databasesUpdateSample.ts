// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a database.
 *
 * @summary updates a database.
 * x-ms-original-file: 2025-02-14/KustoDatabasesUpdate.json
 */
async function kustoDatabasesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databases.update("kustorptest", "kustoCluster", "KustoDatabase8", {
    kind: "ReadWrite",
    hotCachePeriod: "P1D",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDatabasesUpdate();
}

main().catch(console.error);
