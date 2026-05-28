// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch HDInsight cluster with the specified parameters.
 *
 * @summary patch HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/PatchLinuxHadoopCluster.json
 */
async function patchHDInsightLinuxClusters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.update("rg1", "cluster1", {
    tags: { key1: "val1", key2: "val2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to patch HDInsight cluster with the specified parameters.
 *
 * @summary patch HDInsight cluster with the specified parameters.
 * x-ms-original-file: 2025-01-15-preview/PatchLinuxHadoopClusterWithSystemMSI.json
 */
async function patchHDInsightLinuxClustersWithSystemAssignedMSI() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.update("rg1", "cluster1", {
    identity: { type: "SystemAssigned" },
    tags: { key1: "val1", key2: "val2" },
  });
  console.log(result);
}

async function main() {
  await patchHDInsightLinuxClusters();
  await patchHDInsightLinuxClustersWithSystemAssignedMSI();
}

main().catch(console.error);
