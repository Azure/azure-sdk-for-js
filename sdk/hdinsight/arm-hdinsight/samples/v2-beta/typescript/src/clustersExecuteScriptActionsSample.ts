// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to executes script actions on the specified HDInsight cluster.
 *
 * @summary executes script actions on the specified HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/PostExecuteScriptAction.json
 */
async function executeScriptActionOnHDInsightCluster(): Promise<void> {
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

async function main(): Promise<void> {
  await executeScriptActionOnHDInsightCluster();
}

main().catch(console.error);
