// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a database.
 *
 * @summary creates or updates a database.
 * x-ms-original-file: 2025-02-14/KustoDatabaseReadonlyUpdate.json
 */
async function kustoReadOnlyDatabaseUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "kustoReadOnlyDatabase",
    { kind: "ReadOnlyFollowing", location: "westus", hotCachePeriod: "P1D" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a database.
 *
 * @summary creates or updates a database.
 * x-ms-original-file: 2025-02-14/KustoDatabasesCreateOrUpdate.json
 */
async function kustoReadWriteDatabaseCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databases.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    { kind: "ReadWrite", location: "westus", softDeletePeriod: "P1D" },
    { callerRole: "Admin" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoReadOnlyDatabaseUpdate();
  await kustoReadWriteDatabaseCreateOrUpdate();
}

main().catch(console.error);
