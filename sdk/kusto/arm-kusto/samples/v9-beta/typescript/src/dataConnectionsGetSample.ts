// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a data connection.
 *
 * @summary returns a data connection.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsCosmosDbGet.json
 */
async function kustoDataConnectionsCosmosDbGet(): Promise<void> {
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
async function kustoDataConnectionsEventGridGet(): Promise<void> {
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
async function kustoDataConnectionsEventGridWithManagedIdentityGet(): Promise<void> {
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
async function kustoDataConnectionsEventHubWithManagedIdentityGet(): Promise<void> {
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
async function kustoDataConnectionsGet(): Promise<void> {
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

async function main(): Promise<void> {
  await kustoDataConnectionsCosmosDbGet();
  await kustoDataConnectionsEventGridGet();
  await kustoDataConnectionsEventGridWithManagedIdentityGet();
  await kustoDataConnectionsEventHubWithManagedIdentityGet();
  await kustoDataConnectionsGet();
}

main().catch(console.error);
