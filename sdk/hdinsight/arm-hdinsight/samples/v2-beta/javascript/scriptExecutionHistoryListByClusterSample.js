// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all scripts' execution history for the specified cluster.
 *
 * @summary lists all scripts' execution history for the specified cluster.
 * x-ms-original-file: 2025-01-15-preview/GetScriptExecutionHistory.json
 */
async function getScriptExecutionHistoryList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scriptExecutionHistory.listByCluster("rg1", "cluster1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getScriptExecutionHistoryList();
}

main().catch(console.error);
