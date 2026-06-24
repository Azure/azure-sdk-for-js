// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a managed private endpoint.
 *
 * @summary gets a managed private endpoint.
 * x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsGet.json
 */
async function kustoManagedPrivateEndpointsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.get(
    "kustorptest",
    "kustoCluster",
    "managedPrivateEndpointTest",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoManagedPrivateEndpointsGet();
}

main().catch(console.error);
