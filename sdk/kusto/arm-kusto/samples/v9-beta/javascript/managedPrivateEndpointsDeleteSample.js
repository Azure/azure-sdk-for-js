// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KustoManagementClient } = require("@azure/arm-kusto");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a managed private endpoint.
 *
 * @summary deletes a managed private endpoint.
 * x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsDelete.json
 */
async function managedPrivateEndpointsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.managedPrivateEndpoints.delete(
    "kustorptest",
    "kustoCluster",
    "managedPrivateEndpointTest",
  );
}

async function main() {
  await managedPrivateEndpointsDelete();
}

main().catch(console.error);
