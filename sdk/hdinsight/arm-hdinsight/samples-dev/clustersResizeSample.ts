// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Resizes the specified HDInsight cluster to the specified size.
 *
 * @summary Resizes the specified HDInsight cluster to the specified size.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/ResizeLinuxHadoopCluster.json
 */

import type { ClusterResizeParameters } from "@azure/arm-hdinsight";
import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resizeTheWorkerNodesForAHadoopOnLinuxCluster(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const roleName = "workernode";
  const parameters: ClusterResizeParameters = { targetInstanceCount: 10 };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginResizeAndWait(
    resourceGroupName,
    clusterName,
    roleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resizeTheWorkerNodesForAHadoopOnLinuxCluster();
}

main().catch(console.error);
