// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the HDInsight clusters under the subscription.
 *
 * @summary lists all the HDInsight clusters under the subscription.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopAllClusters.json
 */
async function getAllHadoopOnLinuxClusters(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
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
