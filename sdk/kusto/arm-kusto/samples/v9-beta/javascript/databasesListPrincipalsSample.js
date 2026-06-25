// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a list of database principals of the given Kusto cluster and database.
 *
 * @summary returns a list of database principals of the given Kusto cluster and database.
 * x-ms-original-file: 2025-02-14/KustoDatabaseListPrincipals.json
 */
async function kustoDatabaseListPrincipals() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listPrincipals(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await kustoDatabaseListPrincipals();
}

main().catch(console.error);
