// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified HDInsight cluster.
 *
 * @summary deletes the specified HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DeleteLinuxHadoopCluster.json
 */
async function deleteHadoopOnLinuxCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.delete("rg1", "cluster1");
}

async function main(): Promise<void> {
  await deleteHadoopOnLinuxCluster();
}

main().catch(console.error);
