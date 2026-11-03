// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a managed private endpoint.
 *
 * @summary creates or updates a managed private endpoint.
 * x-ms-original-file: 2018-06-01/ManagedPrivateEndpoints_Create.json
 */
async function managedVirtualNetworksCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.managedPrivateEndpoints.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedVirtualNetworkName",
    "exampleManagedPrivateEndpointName",
    {
      properties: {
        fqdns: [],
        groupId: "blob",
        privateLinkResourceId:
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/exampleResourceGroup/providers/Microsoft.Storage/storageAccounts/exampleBlobStorage",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await managedVirtualNetworksCreate();
}

main().catch(console.error);
