// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the HDInsight clusters in a resource group.
 *
 * @summary lists the HDInsight clusters in a resource group.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopAllClustersInResourceGroup.json
 */
async function getAllHadoopOnLinuxClustersInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllHadoopOnLinuxClustersInAResourceGroup();
}

main().catch(console.error);
