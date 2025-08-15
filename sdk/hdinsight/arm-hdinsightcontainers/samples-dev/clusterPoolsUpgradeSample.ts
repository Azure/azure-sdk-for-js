// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClusterPoolUpgrade } from "@azure/arm-hdinsightcontainers";
import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Upgrade a cluster pool.
 *
 * @summary Upgrade a cluster pool.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/UpgradeAKSPatchVersionForClusterPool.json
 */
async function clusterPoolsUpgradeAksPatchVersion(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterPoolUpgradeRequest: ClusterPoolUpgrade = {
    properties: {
      upgradeAllClusterNodes: false,
      upgradeClusterPool: true,
      upgradeType: "AKSPatchUpgrade",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusterPools.beginUpgradeAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterPoolUpgradeRequest,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Upgrade a cluster pool.
 *
 * @summary Upgrade a cluster pool.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/UpgradeNodeOsForClusterPool.json
 */
async function clusterPoolsUpgradeNodeOS(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterPoolUpgradeRequest: ClusterPoolUpgrade = {
    properties: { upgradeType: "NodeOsUpgrade" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusterPools.beginUpgradeAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterPoolUpgradeRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clusterPoolsUpgradeAksPatchVersion();
  await clusterPoolsUpgradeNodeOS();
}

main().catch(console.error);
