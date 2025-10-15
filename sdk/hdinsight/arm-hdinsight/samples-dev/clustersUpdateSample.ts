// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patch HDInsight cluster with the specified parameters.
 *
 * @summary Patch HDInsight cluster with the specified parameters.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/PatchLinuxHadoopCluster.json
 */

import type { ClusterPatchParameters } from "@azure/arm-hdinsight";
import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchHdInsightLinuxClusters(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const parameters: ClusterPatchParameters = {
    tags: { key1: "val1", key2: "val2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.update(resourceGroupName, clusterName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Patch HDInsight cluster with the specified parameters.
 *
 * @summary Patch HDInsight cluster with the specified parameters.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/PatchLinuxHadoopClusterWithSystemMSI.json
 */
async function patchHdInsightLinuxClustersWithSystemAssignedMsi(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterName = "cluster1";
  const parameters: ClusterPatchParameters = {
    identity: { type: "SystemAssigned" },
    tags: { key1: "val1", key2: "val2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.clusters.update(resourceGroupName, clusterName, parameters);
  console.log(result);
}

async function main(): Promise<void> {
  await patchHdInsightLinuxClusters();
  await patchHdInsightLinuxClustersWithSystemAssignedMsi();
}

main().catch(console.error);
