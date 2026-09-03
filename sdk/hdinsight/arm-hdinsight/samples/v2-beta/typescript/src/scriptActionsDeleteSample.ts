// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HDInsightManagementClient } from "@azure/arm-hdinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a specified persisted script action of the cluster.
 *
 * @summary deletes a specified persisted script action of the cluster.
 * x-ms-original-file: 2025-01-15-preview/DeleteScriptAction.json
 */
async function deleteAScriptActionOnHDInsightCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.scriptActions.delete("rg1", "cluster1", "scriptName");
}

async function main(): Promise<void> {
  await deleteAScriptActionOnHDInsightCluster();
}

main().catch(console.error);
