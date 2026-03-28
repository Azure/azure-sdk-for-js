// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the script execution detail for the given script execution ID.
 *
 * @summary gets the script execution detail for the given script execution ID.
 * x-ms-original-file: 2025-01-15-preview/GetScriptActionById.json
 */
async function getScriptExecutionHistoryByScriptId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.scriptActions.getExecutionDetail(
    "rg1",
    "cluster1",
    "391145124054712",
  );
  console.log(result);
}

async function main() {
  await getScriptExecutionHistoryByScriptId();
}

main().catch(console.error);
