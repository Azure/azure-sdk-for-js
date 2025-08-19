// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a database.
 *
 * @summary Updates a database.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoDatabasesUpdate.json
 */

import type { ReadWriteDatabase } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoDatabasesUpdate(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster";
  const databaseName = "KustoDatabase8";
  const parameters: ReadWriteDatabase = {
    hotCachePeriod: "P1D",
    kind: "ReadWrite",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.databases.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoDatabasesUpdate();
}

main().catch(console.error);
