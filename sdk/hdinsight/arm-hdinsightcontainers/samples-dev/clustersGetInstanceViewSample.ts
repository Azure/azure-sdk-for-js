// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the status of a cluster instance.
 *
 * @summary Gets the status of a cluster instance.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/GetClusterInstanceView.json
 */

import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function hdInsightClusterGetInstanceView(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "rg1";
  const clusterPoolName = "clusterPool1";
  const clusterName = "cluster1";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const result = await client.clusters.getInstanceView(
    resourceGroupName,
    clusterPoolName,
    clusterName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await hdInsightClusterGetInstanceView();
}

main().catch(console.error);
