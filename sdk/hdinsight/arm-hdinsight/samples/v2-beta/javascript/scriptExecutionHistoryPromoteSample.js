// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to promotes the specified ad-hoc script execution to a persisted script.
 *
 * @summary promotes the specified ad-hoc script execution to a persisted script.
 * x-ms-original-file: 2025-01-15-preview/PromoteLinuxHadoopScriptAction.json
 */
async function promoteAScriptActionOnHDInsightCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.scriptExecutionHistory.promote("rg1", "cluster1", "391145124054712");
}

async function main() {
  await promoteAScriptActionOnHDInsightCluster();
}

main().catch(console.error);
