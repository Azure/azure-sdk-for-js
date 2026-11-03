// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified cluster.
 *
 * @summary gets the specified cluster.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopCluster.json
 */
async function getHadoopOnLinuxCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.get("rg1", "cluster1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified cluster.
 *
 * @summary gets the specified cluster.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxSparkCluster.json
 */
async function getSparkOnLinuxCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.get("rg1", "cluster1");
  console.log(result);
}

async function main(): Promise<void> {
  await getHadoopOnLinuxCluster();
  await getSparkOnLinuxCluster();
}

main().catch(console.error);
