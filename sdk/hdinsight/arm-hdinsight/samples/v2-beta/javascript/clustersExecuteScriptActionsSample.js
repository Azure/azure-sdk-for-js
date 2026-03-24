// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to executes script actions on the specified HDInsight cluster.
 *
 * @summary executes script actions on the specified HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/PostExecuteScriptAction.json
 */
async function executeScriptActionOnHDInsightCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.clusters.executeScriptActions("rg1", "cluster1", {
    persistOnSuccess: false,
    scriptActions: [
      {
        name: "Test",
        parameters: "",
        roles: ["headnode", "workernode"],
        uri: "http://testurl.com/install.ssh",
      },
    ],
  });
}

async function main() {
  await executeScriptActionOnHDInsightCluster();
}

main().catch(console.error);
