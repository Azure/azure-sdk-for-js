// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified HDInsight cluster.
 *
 * @summary deletes the specified HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DeleteLinuxHadoopCluster.json
 */
async function deleteHadoopOnLinuxCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.delete("rg1", "cluster1");
}

async function main() {
  await deleteHadoopOnLinuxCluster();
}

main().catch(console.error);
