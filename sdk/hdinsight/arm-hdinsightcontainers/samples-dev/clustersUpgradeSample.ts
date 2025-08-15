// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClusterUpgrade } from "@azure/arm-hdinsightcontainers";
import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Upgrade a cluster.
 *
 * @summary Upgrade a cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/UpgradeAKSPatchVersionForCluster.json
 */
async function clustersUpgradeAksPatchVersion(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterName = "cluster1";
  const clusterUpgradeRequest: ClusterUpgrade = {
    properties: { upgradeType: "AKSPatchUpgrade" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginUpgradeAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterName,
    clusterUpgradeRequest,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Upgrade a cluster.
 *
 * @summary Upgrade a cluster.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/UpgradeHotfixForCluster.json
 */
async function clustersUpgradeHotfix(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterName = "cluster1";
  const clusterUpgradeRequest: ClusterUpgrade = {
    properties: {
      componentName: "historyserver",
      targetBuildNumber: "3",
      targetClusterVersion: "1.0.6",
      targetOssVersion: "1.16.0",
      upgradeType: "HotfixUpgrade",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginUpgradeAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterName,
    clusterUpgradeRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clustersUpgradeAksPatchVersion();
  await clustersUpgradeHotfix();
}

main().catch(console.error);
