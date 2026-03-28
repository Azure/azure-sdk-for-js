// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of Azure Monitor on the HDInsight cluster.
 *
 * @summary gets the status of Azure Monitor on the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxClusterAzureMonitorStatus.json
 */
async function getAzureMonitorStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.extensions.getAzureMonitorStatus("rg1", "cluster1");
  console.log(result);
}

async function main() {
  await getAzureMonitorStatus();
}

main().catch(console.error);
