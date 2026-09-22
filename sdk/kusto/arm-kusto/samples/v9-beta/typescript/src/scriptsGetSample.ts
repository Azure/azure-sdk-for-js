// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a Kusto cluster database script.
 *
 * @summary gets a Kusto cluster database script.
 * x-ms-original-file: 2025-02-14/KustoScriptsGet.json
 */
async function kustoScriptsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.scripts.get(
    "kustorptest",
    "kustoCluster",
    "Kustodatabase8",
    "kustoScript",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a Kusto cluster database script.
 *
 * @summary gets a Kusto cluster database script.
 * x-ms-original-file: 2025-02-14/KustoScriptsGetWithManagedIdentity.json
 */
async function kustoScriptsGetWithManagedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.scripts.get(
    "kustorptest",
    "kustoCluster",
    "Kustodatabase8",
    "kustoScript",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoScriptsGet();
  await kustoScriptsGetWithManagedIdentity();
}

main().catch(console.error);
