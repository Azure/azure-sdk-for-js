// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the HDInsight clusters in a resource group.
 *
 * @summary lists the HDInsight clusters in a resource group.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopAllClustersInResourceGroup.json
 */
async function getAllHadoopOnLinuxClustersInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllHadoopOnLinuxClustersInAResourceGroup();
}

main().catch(console.error);
