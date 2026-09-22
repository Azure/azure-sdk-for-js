// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a data connection.
 *
 * @summary returns a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsCosmosDbGet.json
 */
async function kustoDataConnectionsCosmosDbGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.get(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase1",
    "dataConnectionTest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to returns a data connection.
 *
 * @summary returns a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventGridGet.json
 */
async function kustoDataConnectionsEventGridGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.get(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to returns a data connection.
 *
 * @summary returns a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventGridWithManagedIdentityGet.json
 */
async function kustoDataConnectionsEventGridWithManagedIdentityGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.get(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to returns a data connection.
 *
 * @summary returns a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsEventHubWithManagedIdentityGet.json
 */
async function kustoDataConnectionsEventHubWithManagedIdentityGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.get(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to returns a data connection.
 *
 * @summary returns a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsGet.json
 */
async function kustoDataConnectionsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.dataConnections.get(
    "kustorptest",
    "kustoCluster",
    "KustoDatabase8",
    "dataConnectionTest",
  );
  console.log(result);
}

async function main() {
  await kustoDataConnectionsCosmosDbGet();
  await kustoDataConnectionsEventGridGet();
  await kustoDataConnectionsEventGridWithManagedIdentityGet();
  await kustoDataConnectionsEventHubWithManagedIdentityGet();
  await kustoDataConnectionsGet();
}

main().catch(console.error);
