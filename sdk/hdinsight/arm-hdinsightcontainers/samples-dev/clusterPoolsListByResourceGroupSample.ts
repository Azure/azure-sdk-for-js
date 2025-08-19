// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the HDInsight cluster pools under a resource group.
 *
 * @summary Lists the HDInsight cluster pools under a resource group.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/HDInsightOnAks/preview/2024-05-01-preview/examples/ListClusterPools.json
 */

import { HDInsightContainersManagementClient } from "@azure/arm-hdinsightcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function clusterPoolsListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "10e32bab-26da-4cc4-a441-52b318f824e6";
  const resourceGroupName = process.env["HDINSIGHT_RESOURCE_GROUP"] || "hiloResourcegroup";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightContainersManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusterPools.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await clusterPoolsListByResourceGroup();
}

main().catch(console.error);
