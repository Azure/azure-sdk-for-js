// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a list of databases that are owned by this cluster and were followed by another cluster.
 *
 * @summary returns a list of databases that are owned by this cluster and were followed by another cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterListFollowerDatabasesGet.json
 */
async function kustoClusterListFollowerDatabasesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.clusters.listFollowerDatabasesGet(
    "kustorptest",
    "kustoCluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await kustoClusterListFollowerDatabasesGet();
}

main().catch(console.error);
