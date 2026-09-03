// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specific private endpoint connection.
 *
 * @summary deletes the specific private endpoint connection.
 * x-ms-original-file: 2025-01-15-preview/DeletePrivateEndpointConnection.json
 */
async function deleteSpecificPrivateEndpointConnectionForASpecificHDInsightCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "rg1",
    "cluster1",
    "testprivateep.b3bf5fed-9b12-4560-b7d0-2abe1bba07e2",
  );
}

async function main() {
  await deleteSpecificPrivateEndpointConnectionForASpecificHDInsightCluster();
}

main().catch(console.error);
