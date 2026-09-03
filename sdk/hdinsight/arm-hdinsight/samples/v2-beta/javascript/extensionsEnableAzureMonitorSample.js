// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables the Azure Monitor on the HDInsight cluster.
 *
 * @summary enables the Azure Monitor on the HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/EnableLinuxClusterAzureMonitor.json
 */
async function enableAzureMonitor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.extensions.enableAzureMonitor("rg1", "cluster1", {
    primaryKey: "**********",
    workspaceId: "a2090ead-8c9f-4fba-b70e-533e3e003163",
  });
}

async function main() {
  await enableAzureMonitor();
}

main().catch(console.error);
