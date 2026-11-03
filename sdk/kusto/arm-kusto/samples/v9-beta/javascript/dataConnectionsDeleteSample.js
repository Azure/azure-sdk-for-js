// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the data connection with the given name.
 *
 * @summary deletes the data connection with the given name.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsDelete.json
 */
async function kustoDataConnectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.dataConnections.delete(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
  );
}

async function main() {
  await kustoDataConnectionsDelete();
}

main().catch(console.error);
