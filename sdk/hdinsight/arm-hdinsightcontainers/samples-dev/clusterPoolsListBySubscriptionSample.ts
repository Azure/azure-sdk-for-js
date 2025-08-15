// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the list of Cluster Pools within a Subscription.
 *
 * @summary Gets the list of Cluster Pools within a Subscription.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/ListClusterPoolsSubscription.json
 */
async function clusterPoolsListBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusterPools.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await clusterPoolsListBySubscription();
}

main().catch(console.error);
