// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the private endpoint connections for a HDInsight cluster.
 *
 * @summary lists the private endpoint connections for a HDInsight cluster.
 * x-ms-original-file: 2025-01-15-preview/GetAllPrivateEndpointConnectionsInCluster.json
 */
async function getAllPrivateEndpointConnectionsForASpecificHDInsightCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByCluster("rg1", "cluster1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllPrivateEndpointConnectionsForASpecificHDInsightCluster();
}

main().catch(console.error);
