// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a managed private endpoint.
 *
 * @summary creates a managed private endpoint.
 * x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsCreateOrUpdate.json
 */
async function kustoManagedPrivateEndpointsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.createOrUpdate(
    "kustorptest",
    "kustoCluster",
    "managedPrivateEndpointTest",
    {
      groupId: "blob",
      privateLinkResourceId:
        "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Storage/storageAccounts/storageAccountTest",
      requestMessage: "Please Approve.",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoManagedPrivateEndpointsCreateOrUpdate();
}

main().catch(console.error);
