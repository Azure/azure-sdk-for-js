// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Kusto cluster.
 *
 * @summary gets a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClustersGet.json
 */
async function kustoClustersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.get("kustorptest", "kustoCluster");
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClustersGet();
}

main().catch(console.error);
