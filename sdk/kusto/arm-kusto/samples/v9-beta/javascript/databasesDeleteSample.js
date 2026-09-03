// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the database with the given name.
 *
 * @summary deletes the database with the given name.
 * x-ms-original-file: 2025-02-14/KustoDatabasesDelete.json
 */
async function kustoDatabasesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.databases.delete("kustorptest", "kustoCluster", "KustoDatabase8");
}

async function main() {
  await kustoDatabasesDelete();
}

main().catch(console.error);
