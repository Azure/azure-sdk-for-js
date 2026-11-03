// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables the Operations Management Suite (OMS) on the HDInsight cluster.
 *
 * @summary disables the Operations Management Suite (OMS) on the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/DisableLinuxClusterMonitoring.json
 */
async function disableClusterMonitoring() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.extensions.disableMonitoring("rg1", "cluster1");
}

async function main() {
  await disableClusterMonitoring();
}

main().catch(console.error);
