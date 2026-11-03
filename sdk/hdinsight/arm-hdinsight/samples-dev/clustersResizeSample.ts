// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resizes the specified HDInsight cluster to the specified size.
 *
 * @summary resizes the specified HDInsight cluster to the specified size.
 * x-ms-original-file: 2025-01-15-preview/ResizeLinuxHadoopCluster.json
 */
async function resizeTheWorkerNodesForAHadoopOnLinuxCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.resize("rg1", "cluster1", "workernode", { targetInstanceCount: 10 });
}

async function main(): Promise<void> {
  await resizeTheWorkerNodesForAHadoopOnLinuxCluster();
}

main().catch(console.error);
