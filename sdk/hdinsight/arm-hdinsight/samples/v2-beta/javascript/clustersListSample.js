// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the HDInsight clusters under the subscription.
 *
 * @summary lists all the HDInsight clusters under the subscription.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopAllClusters.json
 */
async function getAllHadoopOnLinuxClusters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllHadoopOnLinuxClusters();
}

main().catch(console.error);
