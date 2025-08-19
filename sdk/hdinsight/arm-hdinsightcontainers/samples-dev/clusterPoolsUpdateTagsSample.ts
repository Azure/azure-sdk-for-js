// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates an existing Cluster Pool Tags.
 *
 * @summary Updates an existing Cluster Pool Tags.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/PatchClusterPool.json
 */

import type { TagsObject } from "@azure/arm-hdinsightcontainers";
import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function clusterPoolsPatchTags(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const clusterPoolName = "clusterpool1";
  const clusterPoolTags: TagsObject = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusterPools.beginUpdateTagsAndWait(
    resourceGroupName,
    clusterPoolName,
    clusterPoolTags,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clusterPoolsPatchTags();
}

main().catch(console.error);
