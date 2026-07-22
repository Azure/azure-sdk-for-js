// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops a Kusto cluster.
 *
 * @summary stops a Kusto cluster.
 * x-ms-original-file: 2025-02-14/KustoClustersStop.json
 */
async function kustoClustersStop(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.clusters.stop("kustorptest", "kustoCluster2");
}

async function main(): Promise<void> {
  await kustoClustersStop();
}

main().catch(console.error);
