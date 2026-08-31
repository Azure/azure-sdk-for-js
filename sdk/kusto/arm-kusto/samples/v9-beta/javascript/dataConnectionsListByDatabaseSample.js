// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of data connections of the given Kusto database.
 *
 * @summary returns the list of data connections of the given Kusto database.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsListByDatabase.json
 */
async function kustoDatabasesListByCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataConnections.listByDatabase(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await kustoDatabasesListByCluster();
}

main().catch(console.error);
