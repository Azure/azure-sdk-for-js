// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified extension for HDInsight cluster.
 *
 * @summary deletes the specified extension for HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DeleteExtension.json
 */
async function deleteAnExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.extensions.delete("rg1", "cluster1", "clustermonitoring");
}

async function main() {
  await deleteAnExtension();
}

main().catch(console.error);
