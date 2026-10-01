// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Kusto cluster.
 *
 * @summary deletes a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClustersDelete.json
 */
async function kustoClustersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.clusters.delete("kustorptest", "kustoCluster2");
}

async function main(): Promise<void> {
  await kustoClustersDelete();
}

main().catch(console.error);
