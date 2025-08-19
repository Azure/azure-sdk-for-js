// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the HDInsight clusters under the subscription.
 *
 * @summary Lists all the HDInsight clusters under the subscription.
 * x-ms-original-file: specification/hdinsight/resource-manager/Microsoft.HDInsight/preview/2024-08-01-preview/examples/GetLinuxHadoopAllClusters.json
 */

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAllHadoopOnLinuxClusters(): Promise<void> {
  const subscriptionId = process.env["HDINSIGHT_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllHadoopOnLinuxClusters();
}

main().catch(console.error);
