// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the persisted script actions for the specified cluster.
 *
 * @summary lists all the persisted script actions for the specified cluster.
 * x-ms-original-file: 2025-01-15-preview/GetLinuxHadoopScriptAction.json
 */
async function listAllPersistedScriptActionsForTheGivenCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.scriptActions.listByCluster("rg1", "cluster1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllPersistedScriptActionsForTheGivenCluster();
}

main().catch(console.error);
