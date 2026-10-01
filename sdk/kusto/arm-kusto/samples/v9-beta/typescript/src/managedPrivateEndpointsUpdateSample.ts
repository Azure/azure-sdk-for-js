// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a managed private endpoint.
 *
 * @summary updates a managed private endpoint.
 * x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsUpdate.json
 */
async function kustoManagedPrivateEndpointsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.update(
    "kustorptest",
    "kustoCluster",
    "managedPrivateEndpointTest",
    {
      groupId: "blob",
      privateLinkResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/storageAccountTest",
      requestMessage: "Please Approve Managed Private Endpoint Request.",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoManagedPrivateEndpointsUpdate();
}

main().catch(console.error);
