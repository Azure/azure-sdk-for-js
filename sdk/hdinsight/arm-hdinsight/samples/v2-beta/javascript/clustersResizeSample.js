// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resizes the specified HDInsight cluster to the specified size.
 *
 * @summary resizes the specified HDInsight cluster to the specified size.
 * x-ms-original-file: 2025-01-15-preview/ResizeLinuxHadoopCluster.json
 */
async function resizeTheWorkerNodesForAHadoopOnLinuxCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.resize("rg1", "cluster1", "workernode", { targetInstanceCount: 10 });
}

async function main() {
  await resizeTheWorkerNodesForAHadoopOnLinuxCluster();
}

main().catch(console.error);
