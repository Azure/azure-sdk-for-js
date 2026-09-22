// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the data connection with the given name.
 *
 * @summary deletes the data connection with the given name.
 * x-ms-original-file: 2025-02-14/KustoDataConnectionsDelete.json
 */
async function kustoDataConnectionsDelete(): Promise<void> {
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

async function main(): Promise<void> {
  await kustoDataConnectionsDelete();
}

main().catch(console.error);
