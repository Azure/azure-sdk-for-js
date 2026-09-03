// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the private link resources in a HDInsight cluster.
 *
 * @summary lists the private link resources in a HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/GetAllPrivateLinkResourcesInCluster.json
 */
async function getAllPrivateLinkResourcesInASpecificHDInsightCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByCluster("rg1", "cluster1");
  console.log(result);
}

async function main() {
  await getAllPrivateLinkResourcesInASpecificHDInsightCluster();
}

main().catch(console.error);
